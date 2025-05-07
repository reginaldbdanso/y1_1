import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/PaymentApproval.module.css';
import Header from './Header';
import Footer from './Footer';

interface ReviewCardProps {
  title: string;
  rating: number;
  reviewText: string;
  author: string;
}

const PaymentApproval: React.FC = () => {
  const reviews: ReviewCardProps[] = [
    {
      title: "Super impressive",
      rating: 4,
      reviewText: "The sound quality from this device is great and my favourite feature is how I'm able to connect to both my phone and laptop, with the headset auto switching when a sound is being played from either of them.",
      author: "Sweetie Baiden"
    },
    {
      title: "Super impressive",
      rating: 4,
      reviewText: "The sound quality from this device is great and my favourite feature is how I'm able to connect to both my phone and laptop, with the headset auto switching when a sound is being played from either of them.",
      author: "Sweetie Baiden"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dividerTop} />
        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <div className={styles.breadcrumbItem}>Cart</div>
            <div className={styles.breadcrumbItem}>Shipping</div>
            <div className={styles.breadcrumbItem}>Payment</div>
            <div className={styles.breadcrumbItemActive}>Approval</div>
          </div>
        </div>

        <div className={styles.dividerNormal} />

        <div className={styles.paymentSection}>
          <h2 className={styles.paymentTitle}>Payment Approval</h2>
          <div className={styles.paymentCard}>
            <div className={styles.paymentContent}>
            <img
                src="/imgs/payment 1.png"
                alt="Payment Success"
                className="payment-icon"
                width={159}
                height={159}
              />
              <div className={styles.paymentText}>
                <p>Approve payment on</p>
                <p>+233 54******42</p>
              </div>
              <p className={styles.paymentMessage}>
                Thank you for using yannstechub. We are truly grateful for your support and the opportunity to serve
                you. Your satisfaction is our top priority, and we are committed to ensuring you have an exceptional
                experience every time.
              </p>
              <Link to="/shop" className={styles.continueButton}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentApproval;