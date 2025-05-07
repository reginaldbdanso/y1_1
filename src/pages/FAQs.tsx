import React from 'react';
import styles from '../styles/components/FAQs.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQs: React.FC = () => {
  return (
    <div className={styles.faqsPage}>
      <div className={styles.faqsContainer}>
        <Header />
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.faqTitle}>Purpose of FAQs</h1>
        <p className={styles.faqDescription}>
          The FAQs section serves as a comprehensive resource to address common
          queries customers might have about your platform, products, policies, and
          processes. It&apos;s designed to provide quick answers, reduce customer service
          workload, and improve the overall shopping experience.
        </p>

        <div className={styles.faqContent}>
          <h2 className={styles.sectionTitle}>Key Topics to Include in FAQs</h2>
          <p>
            Below are the main categories and examples of questions that could appear
            in the FAQ section, along with elaboration:
          </p>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>3. Product Information</h3>
            <ul className={styles.faqList}>
              <li>Are all products genuine and original?</li>
              <p>Yes, Yannstech Hub only offers 100% authentic products from trusted manufacturers and distributors.</p>
              <li>Do the gadgets come with warranties?</li>
              <p>Most of our gadgets come with a manufacturer&apos;s warranty. Warranty details can be found on the product page or in the packaging.</p>
              <li>How can I find detailed specifications for a product?</li>
              <p>Each product page includes detailed specifications, features, and images to help you make an informed decision.</p>
            </ul>
          </div>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>4. Ordering Process</h3>
            <ul className={styles.faqList}>
              <li>How do I place an order?</li>
              <p>Browse our catalog, add your desired products to the cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.</p>
              <li>Can I modify or cancel my order after placing it?</li>
              <p>Orders can be modified or canceled within [X] hours of placement. Contact our customer support team for assistance.</p>
              <li>What payment methods are accepted?</li>
              <p>Yannstech Hub accepts credit/debit cards, PayPal, bank transfers, and other local payment methods, depending on your location.</p>
              <li>Will I receive an order confirmation?</li>
              <p>Yes, you will receive a confirmation email and/or SMS with your order details once your payment is successful.</p>
            </ul>
          </div>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>5. Shipping and Delivery</h3>
            <ul className={styles.faqList}>
              <li>How long will it take to receive my order?</li>
              <p>Delivery times vary based on your location and the chosen shipping method. Estimated delivery timelines are provided at checkout.</p>
              <li>Do you ship internationally?</li>
              <p>Yes, Yannstech Hub ships to most countries worldwide. Shipping fees and delivery times will vary depending on your location.</p>
              <li>How can I track my order?</li>
              <p>Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the courier&apos;s site.</p>
              <li>What happens if my order is delayed?</li>
              <p>If your order is delayed, contact our support team, and we will investigate the issue with the courier service.</p>
            </ul>
          </div>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>6. Returns and Refunds</h3>
            <ul className={styles.faqList}>
              <li>What is your return policy?</li>
              <p>We accept returns for eligible products within [X] days of delivery. Items must be unused, in their original packaging, and accompanied by a receipt.</p>
              <li>How do I request a return?</li>
              <p>To request a return, log in to your account, go to &quot;My Orders,&quot; select the order you want to return, and follow the return process.</p>
              <li>When will I receive my refund?</li>
              <p>Refunds are processed within [X] business days of receiving and inspecting the returned item. The refund will be issued to the original payment method.</p>
              <li>What should I do if I receive a defective product?</li>
              <p>Contact our customer support team immediately with your order details and photos of the defective product. We will arrange for a replacement or refund.</p>
            </ul>
          </div>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>7. Payment and Security</h3>
            <ul className={styles.faqList}>
              <li>Is it safe to shop on Yannstech Hub?</li>
              <p>Yes, our platform uses SSL encryption to protect your personal and payment information.</p>
              <li>What currencies can I pay in?</li>
              <p>Yannstech Hub accepts multiple currencies. Your currency options will depend on your location and payment method.</p>
              <li>Why was my payment declined?</li>
              <p>Payments may be declined due to incorrect details, insufficient funds, or technical issues. Double-check your information or contact your bank for assistance.</p>
              <li>Are there additional charges for international orders?</li>
              <p>International orders may be subject to customs duties or taxes, which are the responsibility of the customer.</p>
            </ul>
          </div>

          <div className={styles.faqSection}>
            <h3 className={styles.topicTitle}>8. Customer Support</h3>
            <ul className={styles.faqList}>
              <li>How can I contact customer support?</li>
              <p>You can reach us via email, live chat, or by calling our customer support hotline. Contact details are available on our &quot;Contact Us&quot; page.</p>
              <li>What are your customer support hours?</li>
              <p>Our support team is available [X] days a week, from [X AM] to [X PM].</p>
              <li>Do you offer technical support for gadgets?</li>
              <p>Yes, we provide basic technical support. For advanced issues, please refer to the manufacturer&apos;s support service.</p>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;