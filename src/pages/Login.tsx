import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/components/Login.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, state: authState } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectTo = location.state?.redirectTo || '/dashboard';
  const message = location.state?.message;

  useEffect(() => {
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState.error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate(redirectTo);
      }
    } catch (err) {
      setError('Unable to connect to the server. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            <section className={styles.imageSection}>
              <img src="/imgs/sign-up.png" alt="Login hero" className={styles.heroImage} loading="lazy" />
            </section>

            <section className={styles.formSection}>
              <h1 className={styles.formTitle}>Log In</h1>
              
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    value={username}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/User.png" alt="" className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                  <img src="/imgs/Lock.png" alt="" className={styles.inputIcon} />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>

                {(error || message) && (
                  <div className={`${styles.formMessage} ${error ? styles.errorMessage : styles.infoMessage}`}>
                    {error || message}
                  </div>
                )}
              </form>

              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>Or</span>
                <span className={styles.dividerLine} />
              </div>

              <div className={styles.socialLogin}>
                <p className={styles.socialText}>Log in with</p>
                <div className={styles.socialLoginIcons}>
                  <img src="/imgs/Google.png" alt="Google login" className={styles.socialIcon} loading="lazy" />
                  <img src="/imgs/Apple.png" alt="Apple login" className={styles.socialIcon} loading="lazy" />
                </div>
              </div>

              <p className={styles.loginLink}>
                Don&apos;t have an account? <Link to="/signup" className={styles.linkBlue}>Sign up</Link>
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Login;