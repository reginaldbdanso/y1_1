import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from '../styles/components/SignUp.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, state: authState } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState.error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const success = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Unable to create account. Please try again later.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            <section className={styles.imageSection}>
              <img src="/imgs/sign-up.png" alt="Sign up hero" className={styles.heroImage} loading="lazy" />
            </section>

            <section className={styles.formSection}>
              <h1 className={styles.formTitle}>Sign Up</h1>
              
              <form className={styles.signupForm} onSubmit={handleSubmit}>
                {/* Form inputs */}
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/User.png" alt="" className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/Mail.png" alt="" className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/Lock.png" alt="" className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/Lock.png" alt="" className={styles.inputIcon} />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Create Account
                </button>

                {error && (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                )}
              </form>

              <p className={styles.loginLink}>
                Already have an account? <Link to="/login" className={styles.linkBlue}>Log in</Link>
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;