import React from 'react';
import styles from '../styles/components/Careers.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface JobData {
  id: number;
  title: string;
  type: string;
  status: string;
  image: string;
}

const jobData: JobData[] = [
  {
    id: 1,
    title: "Sales Executive",
    type: "Regular",
    status: "Open",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce79820243537fb1d8ef4c32e91a585c07b6f81b6a44cf178ace962523852e93"
  },
  {
    id: 2,
    title: "Security Officer",
    type: "Regular",
    status: "Open",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b99136c20bdf94a80ed4e8786239d999cba60f97b07bbd485e922bd364fb4aa5"
  },
  {
    id: 3,
    title: "HR Officer",
    type: "Regular",
    status: "Open",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9849731508e899b16aaeb83952265aa09a09ad04bbd52f3438bf5cc04e309c7e"
  },
  {
    id: 4,
    title: "Delivery Rider",
    type: "Regular",
    status: "Closed",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/802588a2e33d31387422e089139df3866d662e57e85e376a368caeec0a362c5b"
  }
];

const Careers: React.FC = () => {
  return (
    <div className={styles.careersContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Career opportunities</h1>
        <p className={styles.pageDescription}>
          Explore our open roles for working with the team, either full-time
          employment or internship.
        </p>

        <div className={styles.jobStats}>
          <h2 className={styles.totalJobs}>4 open roles</h2>
          <div className={styles.jobTypes}>
            <span>Regular - 4</span>
            <span>Internship - 0</span>
          </div>
        </div>

        <div className={styles.jobListings}>
          {jobData.map((job) => (
            <article key={job.id} className={styles.jobCard}>
              <div className={styles.jobImageContainer}>
                <img
                  src={job.image}
                  alt={`${job.title} position`}
                  className={styles.jobImage}
                />
                <span className={job.status === 'Closed' ? styles.statusBadgeClosed : styles.statusBadgeOpen}>
                  {job.status}
                </span>
              </div>
              <div className={styles.jobDetails}>
                <div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.jobType}>{job.type}</p>
                </div>
                <button 
                  className={styles.applyButton}
                  disabled={job.status === 'Closed'}
                >
                  Apply now
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;