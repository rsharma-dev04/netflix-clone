import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMulti } from '../../services/tmdbApi'
import { useDebounce } from '../../hooks/useDebounce'
import { getImageUrl } from '../../config/tmdb'
import type { Movie } from '../../types'
import styles from './SearchBar.module.css'

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 400)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return }
    setLoading(true)
    searchMulti(debouncedQuery)
      .then(d => setResults(d.results.slice(0, 6)))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  const handleOpen = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }
  const handleClose = () => { setOpen(false); setQuery(''); setResults([]) }

  const handleSelect = (m: Movie) => {
    navigate(`/movie/${m.id}?type=${m.media_type === 'tv' ? 'tv' : 'movie'}`)
    handleClose()
  }

  return (
    <div className={styles.wrap}>
      {!open ? (
        <button className={styles.icon} onClick={handleOpen} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      ) : (
        <div className={styles.box}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input ref={inputRef} className={styles.input} placeholder="Titles, people, genres"
            value={query} onChange={e => setQuery(e.target.value)} />
          <button className={styles.close} onClick={handleClose}>✕</button>
        </div>
      )}
      {open && query.trim() && (
        <div className={styles.results}>
          {loading && <div className={styles.msg}>Searching…</div>}
          {!loading && results.length === 0 && <div className={styles.msg}>No results</div>}
          {results.map(m => (
            <div key={m.id} className={styles.item} onClick={() => handleSelect(m)}>
              <img src={getImageUrl(m.poster_path, 'w92')} alt={m.title ?? m.name} className={styles.thumb} />
              <div>
                <div className={styles.name}>{m.title ?? m.name}</div>
                <div className={styles.year}>
                  {(m.release_date ?? m.first_air_date ?? '').slice(0, 4)}
                  {m.media_type && <span className={styles.badge}>{m.media_type === 'tv' ? 'TV' : 'Movie'}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
