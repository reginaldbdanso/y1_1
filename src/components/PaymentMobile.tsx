import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/components/PaymentMobile.css';

const PaymentMobile: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, subtotal } = useCart();
  const [activeTab, setActiveTab] = useState('momo');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState({
    name: 'MTN Mobile Money',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37ad312c54ce04ce416e50c9a8a861c7826ea9e033bf4fb177e779b433ed1964'
  });

  const providers = [
    { name: 'MTN Mobile Money', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37ad312c54ce04ce416e50c9a8a861c7826ea9e033bf4fb177e779b433ed1964' },
    { name: 'Telecel Cash', icon: '/imgs/T-Cash Red.png' },
    { name: 'AirtelTigo Money', icon: '/imgs/airtel-tigo.png' }
  ];

  const calculateTotal = () => {
    const cartSubtotal = subtotal;
    const shipping = 5.00;
    return {
      subtotal: cartSubtotal,
      shipping,
      total: cartSubtotal + shipping
    };
  };

  const totals = calculateTotal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.pm-custom-select')) {
        setShowOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="pm-payment-mobile-container">
      <div className="pm-main-container">
        <header className="pm-header-section">
          <Link to="/">
            <img className="pm-logo" src="/imgs/Logo.png" alt="YannsTechHub Logo" />
          </Link>
          <nav className="pm-nav-buttons">
            <Link to="/daily-deals" className="pm-nav-link">Daily deals</Link>
            <Link to="/shop" className="pm-nav-link">Shop</Link>
            <Link to="/bundle-deals" className="pm-nav-link">Bundle Deals</Link>
            <Link to="/support" className="pm-nav-link">Support</Link>
          </nav>
          <div className="pm-user-actions">
            <img className="pm-action-icon" src="/imgs/Search - 7.png" alt="Search" />
            <Link to="/login">
              <img className="pm-action-icon" src="/imgs/Profile - 3.png" alt="User Account" />
            </Link>
            <Link to="/cart">
              <img className="pm-action-icon" src="/imgs/Buy - 6 (1).png" alt="Shopping Cart" />
            </Link>
          </div>
        </header>

        <div className="pm-divider-top" />
        <div className="pm-divider" />

        <div className="pm-breadcrumb-sort">
          <div className="pm-breadcrumb">
            <Link to="/" className="pm-breadcrumb-item">yannstechub</Link>
            <Link to="/daily-deals" className="pm-breadcrumb-item">/ Daily deals</Link>
            <Link to="/cart" className="pm-breadcrumb-item">/ Cart</Link>
            <Link to="/payment" className="pm-breadcrumb-item active">/ Secure Checkout</Link>
          </div>
        </div>

        <main className="pm-main-content">
          <section className="pm-payment-section">
            <h1 className="pm-payment-title">Payment Method</h1>
            <div className="pm-payment-form">
              <div className="pm-payment-tabs">
                <div className="pm-tab-group">
                  <button
                    className={`pm-tab-button ${activeTab === 'momo' ? 'active' : ''}`}
                    onClick={() => setActiveTab('momo')}
                  >
                    Mobile Money
                  </button>
                  <div className={`pm-tab-indicator ${activeTab === 'momo' ? 'active' : ''}`} />
                </div>
                <div className="pm-tab-group">
                  <button
                    className={`pm-tab-button ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => setActiveTab('card')}
                  >
                    Card
                  </button>
                  <div className={`pm-tab-indicator ${activeTab === 'card' ? 'active' : ''}`} />
                </div>
              </div>

              <div className={`pm-payment-details ${activeTab === 'momo' ? 'active' : ''}`}>
                <div className="pm-payment-provider">
                  <div className="pm-custom-select">
                    <div className="pm-selected-option" onClick={() => setShowOptions(!showOptions)}>
                      <img className="pm-provider-icon" src={selectedProvider.icon} alt={selectedProvider.name} />
                      <span>{selectedProvider.name}</span>
                    </div>
                    <ul className={`pm-options-list ${showOptions ? 'show' : ''}`}>
                      {providers.map((provider) => (
                        <li
                          key={provider.name}
                          className="pm-option-item"
                          onClick={() => {
                            setSelectedProvider(provider);
                            setShowOptions(false);
                          }}
                        >
                          <img className="pm-provider-icon" src={provider.icon} alt={provider.name} />
                          <span>{provider.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="pm-change-button" onClick={() => setShowOptions(!showOptions)}>
                    <span>Change</span>
                    <img className="pm-change-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d416a212f7eda943315abbc16f9eb418e0c44b37aef97f5f6f38538b2d414b1" alt="Change icon" />
                  </button>
                </div>

                <div className="pm-payment-phone">
                  <div className="pm-phone-info">
                    <img className="pm-phone-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/afeaea94ec4bf72161507bc26b978113574005a314df0f8df4da204bb977c662" alt="Phone icon" />
                    <input className="pm-phone-number" type="tel" placeholder="+233 54*******42" />
                  </div>
                </div>

                <div className="pm-payment-amount">
                  <div className="pm-amount-info">
                    <img className="pm-amount-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea28c42ad763c50754410221e02154f79df70f07903bbfecf526f46e807a0a89" alt="Amount icon" />
                    <input className="pm-amount-value" type="number" placeholder="Enter Amount (GHS)" min="0" />
                  </div>
                </div>

                <div className="pm-payment-security">
                  <img className="pm-security-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/019049c0e90a7169b8dcb06d9ac93eed81b07dadad55bf7a87f9f7e36e71f98c" alt="Security icon" />
                  <div className="pm-security-badges">
                    <img className="pm-badge" src="https://cdn.builder.io/api/v1/image/assets/TEMP/21100b53cb7d691fdf947ded4d15b8bd99f12be24160215a2ff8d814aec85822" alt="Security badge 1" />
                    <img className="pm-badge" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3f218578efe236f050f49e2d1766b7b00d0cd1d999bd715eb493a4f590e1ce1" alt="Security badge 2" />
                    <img className="pm-badge" src="https://cdn.builder.io/api/v1/image/assets/TEMP/352fbdd8cd8d9c091ede6fcca7cdf422c41250a54cab4d3bc1a61fd84010929c" alt="Security badge 3" />
                  </div>
                </div>
              </div>

              <div className={`pm-payment-details ${activeTab === 'card' ? 'active' : ''}`}>
                <label className="pm-form-field">
                  <img className="pm-field-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce69dcc2453cb67f5a44979cb2576d08d6bad7912bcb64980c7929c66595eee0" alt="Card icon" />
                  <input className="pm-field-input" type="text" placeholder="Card Number" maxLength={19} />
                </label>

                <div className="pm-form-row">
                  <label className="pm-form-field">
                    <input className="pm-field-input" type="date" />
                  </label>

                  <label className="pm-form-field">
                    <img className="pm-field-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/812e4b7a0e48a79b9e457eca400e3eb6db0de475fa28c76b687cba9e33326401" alt="CVV icon" />
                    <input className="pm-field-input" type="password" maxLength={4} placeholder="CVV" />
                  </label>
                </div>

                <div className="pm-payment-amount">
                  <div className="pm-amount-info">
                    <img className="pm-amount-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea28c42ad763c50754410221e02154f79df70f07903bbfecf526f46e807a0a89" alt="Amount icon" />
                    <input className="pm-amount-value" type="number" placeholder="Enter Amount (GHS)" min="0" />
                  </div>
                </div>
              </div>

              <button className="pm-payment-button" onClick={() => navigate('/payment-approval')}>Pay Now</button>
            </div>
          </section>

          <section className="pm-order-section">
            <div className="pm-order-summary">
              <div className="pm-summary-header">
                <h2 className="pm-summary-title">My Order Summary</h2>
                <span>Edit</span>
              </div>

              <div className="pm-order-items">
                {cart.map((item) => (
                  <article key={item.id} className="pm-order-item">
                    <img
                      className="pm-item-image"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="pm-item-details">
                      <h3 className="pm-item-title">{item.title}</h3>
                      <p className="pm-item-price">${item.price.toFixed(2)}</p>
                      <div className="pm-quantity-control">
                        <button
                          className="pm-quantity-button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="pm-quantity-button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="pm-cart-summary">
              <div className="pm-summary-grid">
                <div className="pm-summary-labels">
                  <p className="pm-summary-label">Cart Summary</p>
                  <p className="pm-summary-label">Shipping</p>
                  <p className="pm-summary-label total">Total</p>
                </div>
                <div className="pm-summary-values">
                  <p className="pm-summary-value">${totals.subtotal.toFixed(2)}</p>
                  <p className="pm-summary-value">${totals.shipping.toFixed(2)}</p>
                  <p className="pm-summary-value total">${totals.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="pm-footer">
        <div className="pm-footer-content">
          <div className="pm-footer-sections">
            <div className="pm-footer-logo-social">
              <img src="/imgs/Logo.png" alt="YannsTechHub Logo" className="pm-logo" />
              <div className="pm-social-icons">
                <img className="pm-social-icon" src="/imgs/facebook.png" alt="Facebook" />
                <img className="pm-social-icon" src="/imgs/twitter.png" alt="Twitter" />
                <img className="pm-social-icon" src="/imgs/instagram.png" alt="Instagram" />
              </div>
            </div>
            <div className="pm-footer-links">
              <h3 className="pm-footer-heading">Quick Links</h3>
              <Link to="/about" className="pm-footer-link">About Us</Link>
              <Link to="/contact" className="pm-footer-link">Contact</Link>
              <Link to="/shipping" className="pm-footer-link">Shipping Policy</Link>
            </div>
          </div>
        </div>
        <div className="pm-copyright">
          © 2024 YannsTechHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PaymentMobile;