import React, { useEffect } from 'react';
import styles from '../styles/components/MySaved.module.css';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const MySaved: React.FC = () => {
  const { wishlist, loading, error, fetchWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find(item => item._id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  if (loading && wishlist.length === 0) {
    return <div className={styles.loading}>Loading saved items...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading saved items: {error}</div>;
  }

  return (
    <div className={styles.savedContainer}>
      <h1 className={styles.title}>My Saved Items</h1>
      
      {wishlist.length > 0 ? (
        <div className={styles.savedItems}>
          {wishlist.map(product => (
            <div key={product._id} className={styles.savedItem}>
              <div className={styles.productImage}>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
              </div>
              
              <div className={styles.productInfo}>
                <Link to={`/product/${product._id}`} className={styles.productTitle}>
                  {product.title}
                </Link>
                <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
                <div className={styles.productRating}>
                  Rating: {product.rating} ({product.reviews} reviews)
                </div>
                
                <div className={styles.productActions}>
                  <button 
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>You don't have any saved items yet.</p>
          <Link to="/shop" className={styles.shopNowButton}>
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default MySaved;