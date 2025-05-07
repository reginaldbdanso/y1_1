import React from 'react';
import styles from '../styles/components/Legal.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Legal: React.FC = () => {
  return (
    <div className={styles.legalPage}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.legalTitle}>Legal Overview</h1>
        <p className={styles.legalIntro}>
          Legal information serves as the foundation for the relationship between
          Yannstech Hub and its users. These policies are essential to outline the
          rights, obligations, and protections for both the platform and its
          customers.
        </p>

        <div className={styles.legalHighlights}>
          <div className={styles.highlightCard}>
            <h3>Privacy Policy</h3>
            <p>Learn how we collect, use, and protect your personal information when
              you use Yannstech Hub.</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Cookie Policy</h3>
            <p>Understand how we use cookies to enhance your shopping experience and
              manage your preferences.</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Compliance & Security</h3>
            <p>Discover the steps we take to ensure your data and transactions are
              secure.</p>
          </div>
        </div>

        <section className={styles.policySection}>
          <h2 className={styles.sectionTitle}>1. Privacy Policy</h2>
          <p>The Privacy Policy outlines how Yannstech Hub collects, uses, stores, and protects customer data.</p>
          <ul className={styles.policyList}>
            <li>Data Collection: We collect personal information such as your name, email address, shipping details, and payment methods.</li>
            <li>Usage of Data: Your data may be used for order processing, customer support, and improving our website&apos;s functionality.</li>
            <li>Third-Party Sharing: We may share data with payment processors or delivery services to fulfill your order.</li>
            <li>Customer Rights: You have the right to access, correct, or delete your data.</li>
            <li>Compliance: We comply with data protection laws, such as GDPR and CCPA.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2 className={styles.sectionTitle}>2. Terms of Service</h2>
          <p>The Terms of Service govern your use of Yannstech Hub&apos;s platform.</p>
          <ul className={styles.policyList}>
            <li>User Responsibilities: You must provide accurate information when creating an account.</li>
            <li>Product Descriptions: Product images and descriptions are for illustrative purposes only.</li>
            <li>Account Suspension: We reserve the right to suspend accounts violating these terms.</li>
            <li>Prohibited Actions: Activities like hacking, data scraping, or unauthorized resale are forbidden.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2 className={styles.sectionTitle}>3. Refund and Returns Policy</h2>
          <p>The Refund and Returns Policy defines the process for handling returns, exchanges, and refunds.</p>
          <ul className={styles.policyList}>
            <li>Return Window: Customers have 30 days from the date of delivery to request a return.</li>
            <li>Eligibility: Products must be unused, undamaged, and in their original packaging.</li>
            <li>Refund Processing: Refunds are issued to the original payment method within 7 business days.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;