import React, { useState } from 'react';
import styles from '../styles/components/Contact.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contactPage}>
      <Header />
      
      <main className={styles.mainSection}>
        <h1 className={styles.pageTitle}>Contact</h1>

        <div className={styles.contactContent}>
          <section className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/be23c695d749789f60e0f9917d7896d05deff64dad39430a36bf44807b81be6c"
                alt="Location"
                className={styles.infoIcon}
              />
              <p>
                Number 1 Lindsay Park,<br />
                Achimota. Accra, Ghana
              </p>
            </div>

            <div className={styles.infoBlockMargin}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9140f9e8d47dae9050877a0d25650864eaeeda7042f8f1fb0c9a3ad72e310764"
                alt="Phone"
                className={styles.infoIcon}
              />
              <p>+233 (0)302 449 037</p>
            </div>

            <div className={styles.infoBlockLargeMargin}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c85614f5e0fc30d41723ea2a8c20c8daefbaeafee3727e6634732c92a9d0a3b"
                alt="Email"
                className={styles.infoIcon}
              />
              <p>info@yannstechhub.com</p>
            </div>
          </section>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Clopy Kwesi"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f68e8f7217c63ca8685b7764ee17960359904c2982129583ab5e50cbe307cabd"
                alt=""
                className={styles.inputUnderline}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+233 50 453 7000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc1040dd8ef6693677da77be31e1f3af923351ffbfc8d9e4d7ff957213107a3f"
                  alt=""
                  className={styles.inputUnderline}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Clopy@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc1040dd8ef6693677da77be31e1f3af923351ffbfc8d9e4d7ff957213107a3f"
                  alt=""
                  className={styles.inputUnderline}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu orci, molestie nec eget felis justo, sed."
                value={formData.message}
                onChange={handleChange}
                className={styles.messageText}
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f68e8f7217c63ca8685b7764ee17960359904c2982129583ab5e50cbe307cabd"
                alt=""
                className={styles.formUnderline}
              />
            </div>

            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;