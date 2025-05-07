import React, { useState } from 'react';
import styles from '../styles/components/Dashboard.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyAccount from '../components/dashboard/MyAccount';
import MyChart from '../components/dashboard/MyChart';
import MySaved from '../components/dashboard/MySaved';
import AddressManagement from '../components/dashboard/AddressManagement';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-account');

  const renderContent = () => {
    switch (activeTab) {
      case 'my-account':
        return <MyAccount />;
      case 'my-charts':
        return <MyChart />;
      case 'my-saved':
        return <MySaved />;
      case 'address-management':
        return <AddressManagement />;
      default:
        return <MyAccount />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContents}>
        <Header />
        <div className={styles.dividerTop} />
        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItemActive}>yannstechub</span>
            <span className={styles.breadcrumbItem}>/ Daily deals</span>
          </div>
        </div>
        <div className={styles.dividerNormal} />

        <div className={styles.contentGrid}>
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <ul className={styles.sidebarMenu}>
                <li>
                  <button
                    className={activeTab === 'my-account' ? styles.menuItemActive : styles.menuItem}
                    onClick={() => setActiveTab('my-account')}
                  >
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'my-charts' ? styles.menuItemActive : styles.menuItem}
                    onClick={() => setActiveTab('my-charts')}
                  >
                    My Chart
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'my-saved' ? styles.menuItemActive : styles.menuItem}
                    onClick={() => setActiveTab('my-saved')}
                  >
                    My Saved
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'address-management' ? styles.menuItemActive : styles.menuItem}
                    onClick={() => setActiveTab('address-management')}
                  >
                    Address Management
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <section className={styles.mainContent}>
            {renderContent()}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;