import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/components/ProductSlider.module.css';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
}

const ProductSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 2,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 3,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 4,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    }
  ];

  const updateSliderDimensions = React.useCallback(() => {
    if (containerRef.current && productsRef.current?.children[0]) {
      const containerWidth = containerRef.current.offsetWidth;
      const firstCard = productsRef.current.children[0] as HTMLElement;
      const newCardWidth = firstCard.offsetWidth + 20; // Including gap
      const newVisibleCount = Math.floor(containerWidth / newCardWidth);
      
      setCardWidth(newCardWidth);
      setVisibleCount(newVisibleCount);
    }
  }, []);

  useEffect(() => {
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);
    
    const autoRotateInterval = setInterval(() => {
      setCurrentIndex(current => {
        const maxIndex = Math.max(0, products.length - visibleCount);
        return current < maxIndex ? current + 1 : 0;
      });
    }, 3000);

    return () => {
      window.removeEventListener('resize', updateSliderDimensions);
      clearInterval(autoRotateInterval);
    };
  }, [updateSliderDimensions, products.length, visibleCount]);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const handlePrevClick = () => {
    setCurrentIndex(current => current > 0 ? current - 1 : maxIndex);
  };

  const handleNextClick = () => {
    setCurrentIndex(current => current < maxIndex ? current + 1 : 0);
  };

  return (
    <section className={styles.sliderSection}>
      <h2 className={styles.sectionTitle}>You May Also Like</h2>
      <div className={styles.sliderContainer} ref={containerRef}>
        {currentIndex > 0 && (
          <button 
            className={styles.arrowLeft}
            onClick={handlePrevClick}
            aria-label="Previous slide"
          >
            &#10094;
          </button>
        )}
        <div 
          ref={productsRef}
          className={styles.productsContainer}
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.productSlide}>
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                rating={product.rating}
                reviews={product.reviews}
                price={product.price}
              />
            </div>
          ))}
        </div>
        {currentIndex < maxIndex && (
          <button 
            className={styles.arrowRight}
            onClick={handleNextClick}
            aria-label="Next slide"
          >
            &#10095;
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;