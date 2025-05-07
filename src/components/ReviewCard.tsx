import React from 'react';
import  '../styles/components/ReviewCard.module.css';

interface ReviewCardProps {
  title: string;
  rating: number;
  reviewText: string;
  author: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ title, rating, reviewText, author }) => {
  return (
    <div className="card">
      <div className="rating">
        <h3 className="title">{title}</h3>
        <div className="stars">
          {[...Array(rating)].map((_, index) => (
            <img
              key={index}
              src="/imgs/star.png"
              alt="Rating star"
            />
          ))}
        </div>
      </div>
      <p className="review-text">{reviewText}</p>
      <p className="author">Reviewed by {author}</p>
    </div>
  );
};

export default ReviewCard;