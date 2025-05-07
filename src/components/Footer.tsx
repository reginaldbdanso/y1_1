import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSections}>
          <div className={styles.footerLogoSocial}>
            <img src="/imgs/Logo (1).png" alt="YannsTechHub Footer Logo" className={styles.logo} />
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <img src="/imgs/Facebook.png" alt="" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <img src="/imgs/Twitter.png" alt="" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <img src="/imgs/Instagram.png" alt="" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <img src="/imgs/LinkedIn.png" alt="" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <img src="/imgs/YouTube.png" alt="" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="TikTok">
                <img src="/imgs/TikTok.png" alt="" className={styles.socialIcon} />
              </a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h3 className={styles.footerHeading}>Company</h3>
            <Link to="/about" className={styles.footerLink}>About Us</Link>
            <Link to="/careers" className={styles.footerLink}>Careers</Link>
          </div>
          <div className={styles.footerLinks}>
            <h3 className={styles.footerHeading}>Help</h3>
            <Link to="/legal" className={styles.footerLink}>Legal</Link>
            <Link to="/faqs" className={styles.footerLink}>FAQs</Link>
            <Link to="/contact" className={styles.footerLink}>Contact</Link>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>@yannstechhub2025</div>
    </footer>
  );
};

export default Footer;