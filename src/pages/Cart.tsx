import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/components/Cart.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
// import Toast from '../components/ToastComponent';
import { useAuth } from '@/context/AuthContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, 
    // showToast, toastMessage, setShowToast 
  } = useCart();
  const navigate = useNavigate();
  const { state: authState } = useAuth(); // Add this line to get auth state

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <Header />
          <div className={styles.dividerTop} />
          <div className={styles.breadcrumbSort}>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbItemBold}>yannstechub</span>
              <span className={styles.breadcrumbItem}>/ Cart</span>
            </div>
          </div>
          <div className={styles.dividerNormal} />
          <div className={styles.emptyCartContainer}>
            <img 
              src="/imgs/cart.png" 
              alt="Empty cart" 
              className={styles.emptyCartImage}
            />
            <h2 className={styles.emptyCartTitle}>
              Your cart is empty
            </h2>
            <p className={styles.emptyCartMessage}>
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Link to="/" className={styles.continueShoppingButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCheckout = () => {
    if (!authState.user.isLoggedIn) {
      // Redirect to login if user is not authenticated
      navigate('/login', { 
        state: { 
          redirectTo: '/shipping-address',
          message: 'Please login to proceed with checkout' 
        } 
      });
      return;
    }
    // Proceed to shipping if user is authenticated
    navigate('/shipping-address');
  };

  return (
    <div className={styles.container}>
      {/* <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      /> */}
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dividerTop} />
        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItemBold}>yannstechub</span>
            <span className={styles.breadcrumbItem}>/ Cart</span>
          </div>
        </div>
        <div className={styles.dividerNormal} />
        <div className={styles.cartContainer}>
          <h1 className={styles.cartHeader}>Your Cart</h1>
          <Link to="/" className={styles.continueShopping}>Continue Shopping</Link>
          <div className={styles.cartSummary}>
            <div>Product</div>
            <div className={styles.cartSummaryColumn}>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
          </div>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItemWrapper}>
              <div className={styles.cartItemContent}>
                <img src={item.image} alt={item.title} className={styles.productImage} />
                <div className={styles.productDescription}>{item.title}</div>
              </div>
              <div className={styles.productDetails}>
                <div className={styles.productPrice}>${item.price.toFixed(2)}</div>
                <div className={styles.quantitySelector}>
                  <button className={styles.quantityButton} onClick={() => updateQuantity(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className={styles.quantityButton} onClick={() => updateQuantity(item, 1)}>+</button>
                </div>
                <div className={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <img
                src="/imgs/close.png"
                alt="Remove item"
                onClick={() => removeFromCart(item)}
                className={styles.removeIcon}
                loading="lazy"
              />
            </div>
          ))}
          <div className={styles.subTotal}>
            <div className={styles.subtotalSection} />
            <div className={styles.subtotalContainer}>
              <div className={styles.subtotalLabel}>Subtotal</div>
              <div className={styles.subtotalAmount}>${subtotal.toFixed(2)}</div>
            </div>
            <div className={styles.checkoutDivider} />
            <div className={styles.taxShippingInfo}>
              Tax included and shipping calculated at checkout
            </div>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;