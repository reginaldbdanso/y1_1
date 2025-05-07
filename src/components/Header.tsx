import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/components/Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayName, setdisplayName] = useState('');
  const { cartCount } = useCart();
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate('/dashboard');
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Load data from local storage first
    const savedData = localStorage.getItem('user');
    if (savedData) {
      const userData = JSON.parse(savedData);
      if (userData.firstName) setdisplayName(userData.firstName);
      
    } 
    // else if (authState) {
    //   const displayfirstName = {
    //     firstName: authState.user.firstName || '',
    //   };
    //   setFormData(newData);
    //   localStorage.setItem('user', JSON.stringify(newData));
    // }
  }, [authState]);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/imgs/Logo.png" alt="YannsTechHub Logo" className={styles.logo} />
      </Link>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link to="/daily-deals" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
          Daily deals
        </Link>
        <Link to="/shop" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
          Shop
        </Link>
        <Link to="/bundle-deals" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
          Bundle Deals
        </Link>
        <Link to="/support" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
          Support
        </Link>
      </nav>

      <div className={styles.userActions}>
        <img src="/imgs/Search - 7.png" alt="Search" className={styles.actionIcon} />
        {authState.user.isLoggedIn ? (
          <div className={styles.userProfileContainer} ref={dropdownRef}>
            <button 
              className={styles.userProfileButton}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {displayName}
            </button>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button onClick={handleProfileClick} className={styles.dropdownItem}>
                  My Profile
                </button>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <img 
              src="/imgs/Profile - 3.png" 
              alt="Login" 
              className={styles.actionIcon} 
            />
          </Link>
        )}
        <Link to="/cart" className={styles.cartWrapper}>
          <img src="/imgs/cart.png" alt="Shopping Cart" className={styles.actionIcon} />
          {cartCount > 0 && (
            <span className={styles.cartNotification}>{cartCount}</span>
          )}
        </Link>
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
        </button>
      </div>
    </header>
  );
};

export default Header;