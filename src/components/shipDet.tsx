import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/components/ShippingDetails.css';

const ShippingDetails: React.FC = () => {
  const { cart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment-mobile');
  }

  return (
    <div className="checkout-container">
      <div className="main-content">
        <header className="header-section">
          <Link to="/">
            <img className="logo" src="/imgs/Logo.png" alt="YannsTechHub Logo" />
          </Link>
          <nav className="nav-buttons">
            <Link className="nav-link" to="/daily-deals">Daily deals</Link>
            <Link className="nav-link" to="/shop">Shop</Link>
            <Link className="nav-link" to="/bundle-deals">Bundle Deals</Link>
            <Link className="nav-link" to="/support">Support</Link>
          </nav>
          <div className="user-actions">
            <img className="action-icon" src="/imgs/Search.png" alt="Search" />
            <Link to="/login">
              <img className="action-icon" src="/imgs/Profile.png" alt="User Account" />
            </Link>
            <Link to="/cart">
              <img className="action-icon" src="/imgs/Cart.png" alt="Shopping Cart" />
            </Link>
          </div>
        </header>

        <div className="divider-top" />
        <div className="divider" />

        <main className="checkout-content">
          <div className="content-grid">
            <div className="shipping-column">
              <section className="shipping-details-section">
                <h2 className="section-title">Shipping Details</h2>
                <div className="address-card">
                  <div className="address-info">
                    <p className="info-item">John Doe</p>
                    <p className="info-item">123 Main Street</p>
                    <p className="info-item">Apt 4B</p>
                    <p className="info-item">New York, NY 10001</p>
                    <p className="info-item">+1 (555) 123-4567</p>
                  </div>
                  <button className="edit-button">
                    <img className="edit-icon" src="/imgs/edit.png" alt="Edit" />
                    Edit
                  </button>
                </div>
              </section>

              <div className="method-card">
                <h2 className="section-title">Shipping Method</h2>
                <p className="method-description">Standard Shipping (5-7 business days)</p>
              </div>

              <div className="payment-column">
                <h2 className="section-title">Payment Method</h2>
                <div className="payment-option">
                  <input className="radio-button" type="radio" name="payment" value="card" />
                  <p className="option-label">Credit/Debit Card</p>
                </div>

                <h3 className="mobile-money-section">Mobile Money</h3>
                <div className="mobile-option">
                  <input className="radio-button" type="radio" name="payment" value="momo" />
                  <p className="option-label">Mobile Money</p>
                </div>
                
                <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Payment
                </button>
              </div>
            </div>

            <section className="order-summary">
              <div className="summary-container">
                <header className="summary-header">
                  <h2>Order Summary</h2>
                  <span>{cart.length} items</span>
                </header>

                <div className="order-items">
                  {cart.map((item) => (
                    <React.Fragment key={item.id}>
                      <article className="order-item">
                        <img
                          className="remove-icon"
                          src="/imgs/close.png"
                          alt="Remove"
                          onClick={() => updateQuantity(item.id, 0)}
                        />
                        <img
                          className="item-image"
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="item-details">
                          <h3 className="item-title">{item.title}</h3>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                          <div className="quantity-control">
                            <button 
                              className="quantity-button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              className="quantity-button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <p className="item-total-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </article>
                      <hr className="item-divider" />
                    </React.Fragment>
                  ))}
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="total-row">
                    <span>Total</span>
                    <span>${(subtotal + 5).toFixed(2)}</span>
                  </div>
                  <p className="shipping-info">
                    Shipping costs are calculated based on your location
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-sections">
            <div className="footer-logo-social">
              <img className="logo" src="/imgs/Logo.png" alt="YannsTechHub Footer Logo" />
              <div className="social-icons">
                <img className="social-icon" src="/imgs/facebook.png" alt="Facebook" />
                <img className="social-icon" src="/imgs/twitter.png" alt="Twitter" />
                <img className="social-icon" src="/imgs/instagram.png" alt="Instagram" />
              </div>
            </div>

            <div className="footer-links">
              <h3 className="footer-heading">Quick Links</h3>
              <Link className="footer-link" to="/about">About Us</Link>
              <Link className="footer-link" to="/contact">Contact</Link>
              <Link className="footer-link" to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          © 2024 YannsTechHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ShippingDetails;