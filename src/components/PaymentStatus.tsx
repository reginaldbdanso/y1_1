import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PaymentStatus.css';

const PaymentStatus: React.FC = () => {
  return (
    <div className="ps-payment-status-container">
      <div className="ps-main-container">
        <header className="ps-header-section">
          <Link to="/">
            <img className="ps-logo" src="/imgs/Logo.png" alt="YannsTechHub Logo" />
          </Link>
          <nav className="ps-nav-buttons">
            <Link to="/daily-deals" className="ps-nav-link">Daily deals</Link>
            <Link to="/shop" className="ps-nav-link">Shop</Link>
            <Link to="/bundle-deals" className="ps-nav-link">Bundle Deals</Link>
            <Link to="/support" className="ps-nav-link">Support</Link>
          </nav>
          <div className="ps-user-actions">
            <img className="ps-action-icon" src="/imgs/Search - 7.png" alt="Search" />
            <Link to="/login">
              <img className="ps-action-icon" src="/imgs/Profile - 3.png" alt="User Account" />
            </Link>
            <Link to="/cart">
              <img className="ps-action-icon" src="/imgs/Buy - 6 (1).png" alt="Shopping Cart" />
            </Link>
          </div>
        </header>

        <div className="ps-divider-top" />
        <div className="ps-divider" />

        <div className="ps-breadcrumb-sort">
          <div className="ps-breadcrumb">
            <Link to="/" className="ps-breadcrumb-item">yannstechub</Link>
            <Link to="/daily-deals" className="ps-breadcrumb-item">/ Daily deals</Link>
            <Link to="/cart" className="ps-breadcrumb-item">/ Cart</Link>
            <Link to="/payment" className="ps-breadcrumb-item">/ Secure Checkout</Link>
          </div>
        </div>

        <main className="ps-main-content">
          <section className="ps-payment-section">
            <h1 className="ps-payment-title">Payment Method</h1>
            <div className="ps-payment-status-box">
              <div className="ps-status-icon">
                <img src="/imgs/payment-success.png" alt="Payment Success" />
              </div>
              <div className="ps-status-content">
                <h2 className="ps-status-title">Approve payment on +233 54******42</h2>
                <p className="ps-status-message">
                  Thank you for using yannstechhub. We are truly grateful for your support 
                  and the opportunity to serve you. Your satisfaction is our top priority, 
                  and we are committed to ensuring you have an exceptional experience every time.
                </p>
              </div>
              <Link to="/shop" className="ps-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </section>
        </main>
      </div>

      <footer className="ps-footer">
        <div className="ps-footer-content">
          <div className="ps-footer-sections">
            <div className="ps-footer-logo-social">
              <img src="/imgs/Logo.png" alt="YannsTechHub Logo" className="ps-logo" />
              <div className="ps-social-icons">
                <img className="ps-social-icon" src="/imgs/facebook.png" alt="Facebook" />
                <img className="ps-social-icon" src="/imgs/twitter.png" alt="Twitter" />
                <img className="ps-social-icon" src="/imgs/instagram.png" alt="Instagram" />
              </div>
            </div>
            <div className="ps-footer-links">
              <h3 className="ps-footer-heading">Quick Links</h3>
              <Link to="/about" className="ps-footer-link">About Us</Link>
              <Link to="/contact" className="ps-footer-link">Contact</Link>
              <Link to="/shipping" className="ps-footer-link">Shipping Policy</Link>
            </div>
          </div>
        </div>
        <div className="ps-copyright">
          © 2024 YannsTechHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PaymentStatus;