import React, { useState } from 'react';
import styles from '../styles/components/ReviewCards.module.css';
import { Review } from '@/context/ReviewContext';
import { useAuth } from '@/context/AuthContext';

interface ReviewCardsProps {
  reviews: Review[];
}

const ReviewCards: React.FC<ReviewCardsProps> = ({ reviews }) => {
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className={styles.reviewCardsContainer}>
      <div className={styles.reviewControls}>
        <div className={styles.reviewCount}>{reviews.length} Reviews</div>
        <div className={styles.sortOptions}>
          <label htmlFor="sortReviews">Sort by:</label>
          <select
            id="sortReviews"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'newest' | 'highest' | 'lowest')}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>
      
      <div className={styles.reviewList}>
        {sortedReviews.map((review) => (
          <div key={review._id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerInfo}>
                <div className={styles.reviewerName}>
                  {review.userName}
                  {user && review.userId === user.id && (
                    <span className={styles.yourReviewBadge}>Your Review</span>
                  )}
                </div>
                <div className={styles.reviewDate}>{formatDate(review.date)}</div>
              </div>
              <div className={styles.reviewRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= review.rating ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className={styles.reviewContent}>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
            
            {review.response && (
              <div className={styles.sellerResponse}>
                <h4 className={styles.sellerResponseTitle}>Seller Response:</h4>
                <p className={styles.sellerResponseText}>{review.response}</p>
              </div>
            )}
            
            <div className={styles.reviewActions}>
              <button className={styles.helpfulButton}>
                <span className={styles.helpfulIcon}>👍</span> Helpful ({review.helpfulCount || 0})
              </button>
              {user && review.userId === user.id && (
                <button className={styles.editButton}>Edit Review</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCards;