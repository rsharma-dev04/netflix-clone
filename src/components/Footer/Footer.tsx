import styles from './Footer.module.css'

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.social}>📘 📸 🐦 ▶️</div>
    <div className={styles.links}>
      {['Audio Description','Help Centre','Gift Cards','Media Centre','Investor Relations','Jobs',
        'Terms of Use','Privacy','Legal Notices','Cookie Preferences','Corporate Information','Contact Us']
        .map(l => <span key={l} className={styles.link}>{l}</span>)}
    </div>
    <p className={styles.copy}>© {new Date().getFullYear()} Netflix Clone — demo purposes only.</p>
  </footer>
)

export default Footer
