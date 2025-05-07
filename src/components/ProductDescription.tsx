import React from 'react';
import styles from '../styles/components/ProductDescription.module.css';

const ProductDescription: React.FC = () => {
  return (
    <section className={styles.contentSection}>
      <h2 className={styles.sectionTitle}>Description</h2>
      <div className={styles.specsList}>
        BT Version: 5.2<br/>
        BT Range: ≥10m<br/>
        Speaker Diameter: 40mm<br/>
        Playtime: Up to 60 hours<br/>
        Charging Time: 1.5 hours<br/>
        Supported Format: Mic support / Aux in Mode / Type-C<br/>
        Model: OHP-610
      </div>

      <div className={styles.featureDescription}>
        <strong>
          Powerful Deep Bass<br/>
          Hits You in Waves
        </strong>
        Powered by advanced 40mm drivers and exclusive HavyBassTM technology, BoomPop2 is meticulously designed to offer music enthusiasts an unparalleled sound experience, characterized by incredibly deep and dynamic bass.
      </div>

      <h2 className={styles.sectionTitle}>Ratings and Reviews</h2>
      <div className={styles.reviewsContainer}>
        <div className={styles.ratingSummary}>
          <div className={styles.ratingScore}>
            <span>5.0</span>
            <img src="/imgs/star.png" alt="Rating stars" />
          </div>
          <div>5489 ratings</div>

          <div className={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className={styles.ratingBar}>
                <span>{rating}</span>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.barFill} 
                    style={{ 
                      width: rating === 5 ? '100%' : 
                             rating === 4 ? '80%' : 
                             rating === 3 ? '60%' : 
                             rating === 2 ? '40%' : '20%' 
                    }}
                  />
                </div>
                <span>3321</span>
              </div>
            ))}
          </div>
        </div>

        {[1, 2, 3].map(index => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewRating}>
              <h3 className={styles.reviewTitle}>Super impressive</h3>
              <div className={styles.reviewStars}>
                {[1, 2, 3, 4].map(star => (
                  <img
                    key={star}
                    src="/imgs/star.png"
                    alt="Rating star"
                  />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>
              The sound quality from this device is great and my favourite feature is how I&apos;m able to connect to both my phone and laptop, with the headset auto switching when a sound is being played from either of them.
            </p>
            <p className={styles.reviewAuthor}>Reviewed by Sweetie Baiden</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDescription;