import React, { useState, useEffect } from 'react';
import styles from '../styles/components/RatingAndReviews.module.css';
import { useReviews } from '@/context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import ReviewCards from './ReviewCards';

interface RatingAndReviewsProps {
  productId: string;
}

const RatingAndReviews: React.FC<RatingAndReviewsProps> = ({ productId }) => {
  const { reviews, addReview, loading, error } = useReviews();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const productReviews = reviews.filter(review => review.productId === productId);
  
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: productReviews.filter(review => review.rating === star).length,
    percentage: productReviews.length > 0
      ? (productReviews.filter(review => review.rating === star).length / productReviews.length) * 100
      : 0
  }));

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!title.trim()) {
      alert('Please enter a review title');
      return;
    }
    
    if (!reviewText.trim()) {
      alert('Please enter review text');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addReview({
        productId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        rating,
        title,
        text: reviewText,
        date: new Date().toISOString(),
      });
      
      setRating(0);
      setReviewText('');
      setTitle('');
      setShowForm(false);
      setSuccessMessage('Your review has been submitted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userHasReviewed = user && productReviews.some(review => review.userId === user.id);

  return (
    <div className={styles.ratingReviewsContainer}>
      <h2 className={styles.sectionTitle}>Ratings & Reviews</h2>
      
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      
      <div className={styles.ratingOverview}>
        <div className={styles.averageRating}>
          <div className={styles.ratingNumber}>{averageRating.toFixed(1)}</div>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= Math.round(averageRating) ? styles.starFilled : styles.starEmpty}
              >
                ★
              </span>
            ))}
          </div>
          <div className={styles.reviewCount}>{productReviews.length} reviews</div>
        </div>
        
        <div className={styles.ratingDistribution}>
          {ratingCounts.map(({ star, count, percentage }) => (
            <div key={star} className={styles.ratingBar}>
              <div className={styles.ratingLabel}>{star} stars</div>
              <div className={styles.ratingBarContainer}>
                <div
                  className={styles.ratingBarFill}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className={styles.ratingCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>
      
      {!userHasReviewed && user && (
        <div className={styles.reviewFormContainer}>
          {!showForm ? (
            <button
              className={styles.writeReviewButton}
              onClick={() => setShowForm(true)}
            >
              Write a Review
            </button>
          ) : (
            <form className={styles.reviewForm} onSubmit={handleSubmit}>
              <h3>Write Your Review</h3>
              
              <div className={styles.formGroup}>
                <label>Your Rating *</label>
                <div className={styles.ratingSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= (hoverRating || rating)
                          ? styles.ratingSelectorStarFilled
                          : styles.ratingSelectorStarEmpty
                      }
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleRatingHover(star)}
                      onMouseLeave={handleRatingLeave}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="reviewTitle">Review Title *</label>
                <input
                  type="text"
                  id="reviewTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="reviewText">Review *</label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  rows={5}
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      
      {productReviews.length > 0 ? (
        <ReviewCards reviews={productReviews} />
      ) : (
        <div className={styles.noReviews}>
          <p>This product has no reviews yet. Be the first to leave a review!</p>
        </div>
      )}
    </div>
  );
};

export default RatingAndReviews;