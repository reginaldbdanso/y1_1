import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Review {
  _id: string;
  productId: string;
  rating: number;
  comment: string;
  userId: string;
  date: string;
  author: string;
  content: string;
  title: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, '_id' | 'date'>) => Promise<void>;
  getProductReviews: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
  isLoading: boolean;
  error: string | null;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        // console.log(data.reviews);
        setReviews(data.reviews);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const addReview = async (review: Omit<Review, '_id' | 'date'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const newReview = await response.json();
      setReviews(prevReviews => [...prevReviews, newReview]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(review => review.productId === productId);
  };

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

  const getReviewCount = (productId: string) => {
    return getProductReviews(productId).length;
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        getReviewCount,
        isLoading,
        error
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// Export the hook after the Provider
export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};