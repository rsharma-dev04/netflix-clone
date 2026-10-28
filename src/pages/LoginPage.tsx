import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/browse')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.bgOverlay} />

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className={styles.logo}
          />
        </Link>
      </nav>

      {/* Form */}
      <div className={styles.center}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h1 className={styles.h1}>Sign In</h1>

          {error && <div className={styles.errorBox}>⚠ {error}</div>}

          <div className={styles.field}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email or phone number"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className={styles.signInBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Sign In'}
          </button>

          <div className={styles.remember}>
            <label className={styles.checkLabel}>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <span className={styles.forgot}>Need help?</span>
          </div>

          <p className={styles.newUser}>
            New to Netflix?{' '}
            <Link to="/signup" className={styles.signUpLink}>Sign up now.</Link>
          </p>

          <p className={styles.recaptcha}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <span className={styles.learnMore}>Learn more.</span>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerPhone}>Questions? Call 000-800-919-1694</p>
        <div className={styles.footerLinks}>
          {['FAQ', 'Help Centre', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information'].map(l => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default LoginPage
