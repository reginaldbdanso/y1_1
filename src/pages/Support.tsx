import React from 'react';
import styles from '../styles/components/Support.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Support: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add tracking functionality here
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dividerTop} />
        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItemBold}>yannstechub</span>
            <span className={styles.breadcrumbItem}>/ Track Order</span>
          </div>
        </div>
        <div className={styles.dividerNormal} />
        <div className={styles.orderSection}>
          <h1 className={styles.sectionTitle}>Your Order</h1>
          <img
            loading="lazy"
            src="/imgs/order-track.png"
            alt="Order tracking information"
            className={styles.orderImage}
          />
          <form className={styles.orderForm} onSubmit={handleSubmit}>
            <input
              type="text"
              id="order-number"
              name="order-number"
              placeholder="Enter your number"
              required
              className={styles.orderInput}
            />
            <button type="submit" className={styles.orderButton}>Track</button>
          </form>
          <p className={styles.orderInfo}>
            Normally your package will arrive within 2-5 working days after placing
            your order. In case of weather disasters, and holidays there may be
            delays. For any questions please contact Care.gh@oraimo.com. Thank you
            for your support and patience.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;