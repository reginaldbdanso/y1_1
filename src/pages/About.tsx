import React from 'react';
import styles from '../styles/components/About.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.mainContent}>
        <Header />
        <h1 className={styles.pageTitle}>About Us.</h1>
        
        <div className={styles.contentSection}>
          <div className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <p>About Us<br />Our Team.<br />Press.</p>
            </nav>
          </div>
          
          <article className={styles.article}>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur. Vulputate magna mi lectus auctor
              nisi varius enim. Feugiat sed ut amet lacus enim nibh. Adipiscing lacus
              eu libero felis elit eros mauris. Proin quam nunc varius nulla
              convallis. Volutpat nisi ac urna diam mattis amet. Porta gravida pretium
              pulvinar suspendisse venenatis augue purus tellus donec. Turpis amet
              lacus tristique ornare sit aliquet massa nulla scelerisque. Placerat nec
              sagittis diam rhoncus in lacus elementum at. Ac nam nullam vel eleifend
              egestas pellentesque et leo venenatis. Tincidunt magnis diam amet
              interdum tellus a. Dignissim nunc tincidunt tincidunt purus massa
              volutpat elementum integer. Vel gravida rutrum ut at tortor erat sed
              duis. Volutpat blandit magna nisi consequat diam ac.
            </p>
            <p className={styles.description}>
              Tincidunt at quis fames semper morbi aliquam massa aliquet elit. Eget
              maecenas tincidunt suspendisse sit sed rutrum sed cum mauris. Lacus elit
              tristique pharetra proin vulputate magna. Facilisis diam turpis facilisi
              nisl commodo nunc. Montes hendrerit in leo nisl a tellus pharetra
              pellentesque tincidunt. Nisl vitae et ullamcorper augue scelerisque
              ornare et. Purus sagittis lectus fusce lacus. Eu tincidunt consectetur
              cras et. Eu sem pharetra neque egestas cursus nec mauris. Lectus dui
              auctor pharetra magna sed. Elementum ut quis curabitur quis mauris
              ornare pretium. Sed nisi eu egestas eu enim. Nibh orci felis lacus
              egestas orci facilisi diam maecenas dapibus. Mi sed maecenas odio odio.
              Mi ut ultricies dui at tellus nulla. Urna sit eros ultrices et a natoque
              congue a viverra. Turpis nunc pellentesque egestas purus.
            </p>
          </article>
        </div>

        <section className={styles.teamSection}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aea414fb9fa092b267b2060386b3831983788ae5ef05956396250820ad440dd4"
            alt="Team banner"
            className={styles.teamBanner}
          />

          <div className={styles.quoteContainer}>
            <div className={styles.quoteContent}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a0693f118f8bb7d7a320f1621e71fe824ee785a21eaca21a3e37c15b6c6f505"
                alt="Quote image"
                className={styles.quoteImage}
              />
              <div className={styles.quoteText}>
                <blockquote>
                  "Our work does make sense only if it is a faithful witness of
                  his time."
                </blockquote>
                <p className={styles.quoteAuthor}>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>The Team.</h2>

          <div className={styles.teamGallery}>
            <div className={styles.teamMember}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e16a9db58ecc6395d1f8d1a6d7f62c8299e3ab3dbe393fc03c58b52b382921c"
                alt="Team member 1"
                className={styles.memberImage}
              />
            </div>
            <div className={styles.teamMember}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b3991ab6995b8437944a9e9d742e3da28ceaeaa22e33e75f1c6089a75048e8a"
                alt="Team member 2"
                className={styles.memberImage}
              />
            </div>
            <div className={styles.teamMember}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc1ef4414de19456a9ed2a57fa39819216005a05b088a578e9e3661b0dafa6d2"
                alt="Team member 3"
                className={styles.memberImage}
              />
            </div>
            <div className={styles.teamMember}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc1ef4414de19456a9ed2a57fa39819216005a05b088a578e9e3661b0dafa6d2"
                alt="Team member 4"
                className={styles.memberImage}
              />
            </div>
            <div className={styles.teamMember}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc1ef4414de19456a9ed2a57fa39819216005a05b088a578e9e3661b0dafa6d2"
                alt="Team member 5"
                className={styles.memberImage}
              />
            </div>
          </div>

          <p className={styles.teamDescription}>
            Lorem ipsum dolor sit amet consectetur. Vulputate magna mi lectus auctor
            nisi varius enim. Feugiat sed ut amet lacus enim nibh. Adipiscing lacus eu
            libero felis elit eros mauris. Proin quam nunc varius nulla convallis.
            Volutpat nisi ac urna diam mattis amet. Porta gravida pretium pulvinar
            suspendisse venenatis augue purus tellus donec. Turpis amet lacus
            tristique ornare sit aliquet massa nulla scelerisque. Placerat nec
            sagittis diam rhoncus in lacus elementum at. Ac nam nullam vel eleifend
            egestas pellentesque et leo venenatis. Tincidunt magnis diam amet interdum
            tellus a. Dignissim nunc tincidunt tincidunt purus massa volutpat
            elementum integer. Vel gravida rutrum ut at tortor erat sed duis. Volutpat
            blandit magna nisi consequat diam ac.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;