import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { if (isAuthenticated) navigate('/browse') }, [isAuthenticated, navigate])

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className={styles.logo}
        />
        <button className={styles.signIn} onClick={() => navigate('/login')}>Sign In</button>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Unlimited movies, TV shows, and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <button className={styles.getStarted} onClick={() => navigate('/signup')}>
            Get Started &rsaquo;
          </button>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.feature}>
        <div className={styles.featureText}>
          <h2>Enjoy on your TV.</h2>
          <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
        </div>
        <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" />
      </section>

      <div className={styles.divider} />

      <section className={`${styles.feature} ${styles.rev}`}>
        <div className={styles.featureText}>
          <h2>Download your shows to watch offline.</h2>
          <p>Save your favourites easily and always have something to watch.</p>
        </div>
        <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile" />
      </section>

      <div className={styles.divider} />

      <section className={styles.feature}>
        <div className={styles.featureText}>
          <h2>Watch everywhere.</h2>
          <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
        </div>
        <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices" />
      </section>

      <div className={styles.divider} />

      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        {[
          ['What is Netflix?', 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.'],
          ['How much does Netflix cost?', 'Plans range from $7.00 to $22.99 a month. No extra costs, no contracts.'],
          ['Where can I watch?', 'Watch anywhere, anytime on any internet-connected device.'],
          ['How do I cancel?', 'Netflix is flexible. Cancel online in two clicks — no fees, no hassle.'],
        ].map(([q, a]) => (
          <details key={q} className={styles.item}>
            <summary className={styles.q}>{q} <span>+</span></summary>
            <p className={styles.a}>{a}</p>
          </details>
        ))}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className={styles.getStarted} onClick={() => navigate('/login')}>Get Started &rsaquo;</button>
        </div>
      </section>

      <div className={styles.divider} />

      <footer className={styles.footer}>
        <p>Questions? Call 1-844-505-2993</p>
        <div className={styles.footerLinks}>
          {['FAQ','Help Centre','Account','Terms of Use','Privacy','Cookie Preferences','Corporate Information'].map(l => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <p style={{ color: '#555', marginTop: 8 }}>Netflix Clone — demo only</p>
      </footer>
    </div>
  )
}

export default HomePage
