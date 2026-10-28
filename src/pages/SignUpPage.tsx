import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignUpPage.module.css'

interface StoredUser {
  name: string
  email: string
  password: string
}

const SignUpPage: React.FC = () => {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    // Load existing users
    const existing: StoredUser[] = JSON.parse(localStorage.getItem('netflix_users') || '[]')
    if (existing.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists.')
      return
    }

    // Save new user
    existing.push({ name: name.trim(), email: email.toLowerCase().trim(), password })
    localStorage.setItem('netflix_users', JSON.stringify(existing))

    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.bgOverlay} />

      <nav className={styles.nav}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className={styles.logo}
          />
        </Link>
        <Link to="/login" className={styles.signInLink}>Sign In</Link>
      </nav>

      <div className={styles.center}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h1 className={styles.h1}>Create Account</h1>
          <p className={styles.sub}>Join Netflix Clone — it's free to try.</p>

          {error && <div className={styles.errorBox}>⚠ {error}</div>}

          {success && (
            <div className={styles.successBox}>
              ✅ Account created! Redirecting to sign in…
            </div>
          )}

          <div className={styles.field}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.input}
              placeholder="Full name"
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email address"
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
              placeholder="Password (min. 6 characters)"
              autoComplete="new-password"
              required
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className={styles.input}
              placeholder="Confirm password"
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className={styles.btn} disabled={success}>
            Create Account
          </button>

          <p className={styles.already}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>Sign in.</Link>
          </p>
        </form>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          {['FAQ', 'Help Centre', 'Terms of Use', 'Privacy'].map(l => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default SignUpPage
