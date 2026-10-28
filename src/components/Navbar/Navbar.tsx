import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home',          path: '/browse' },
  { label: 'TV Shows',      path: '/tv-shows' },
  { label: 'Movies',        path: '/movies' },
  { label: 'New & Popular', path: '/new-popular' },
  { label: 'My List',       path: '/my-list' },
]

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [showDrop, setShowDrop] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className={styles.logo}
          onClick={() => navigate('/browse')}
        />
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li
              key={link.path}
              className={location.pathname === link.path ? styles.active : ''}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <SearchBar />
        <div className={styles.profileWrap}
          onMouseEnter={() => setShowDrop(true)}
          onMouseLeave={() => setShowDrop(false)}
        >
          <div className={styles.avatar}>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</div>
          <span className={styles.caret}>▾</span>
          {showDrop && (
            <div className={styles.dropdown}>
              <div className={styles.dItem}>{user?.name}</div>
              <div className={styles.dItem} style={{ fontSize: '0.75rem', color: '#999' }}>{user?.email}</div>
              <div className={styles.divider} />
              <div className={`${styles.dItem} ${styles.signOut}`}
                onClick={() => { logout(); navigate('/') }}>
                Sign out of Netflix
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
