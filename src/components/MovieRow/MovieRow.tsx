import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../../types'
import MovieCard from './MovieCard'
import styles from './MovieRow.module.css'

interface Props { title: string; movies: Movie[]; isLarge?: boolean }

const MovieRow: React.FC<Props> = ({ title, movies, isLarge = false }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)
  const navigate = useNavigate()

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return
    const amount = rowRef.current.clientWidth * 0.75
    const next = dir === 'left' ? pos - amount : pos + amount
    rowRef.current.scrollTo({ left: next, behavior: 'smooth' })
    setPos(next)
  }

  const handleClick = (m: Movie) =>
    navigate(`/movie/${m.id}?type=${m.media_type === 'tv' ? 'tv' : 'movie'}`)

  if (!movies.length) return null

  return (
    <section className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.slider}>
        <button className={`${styles.chevron} ${styles.left}`} onClick={() => scroll('left')} aria-label="left">‹</button>
        <div className={styles.posters} ref={rowRef}>
          {movies.map(m => <MovieCard key={m.id} movie={m} isLarge={isLarge} onClick={() => handleClick(m)} />)}
        </div>
        <button className={`${styles.chevron} ${styles.right}`} onClick={() => scroll('right')} aria-label="right">›</button>
      </div>
    </section>
  )
}

export default MovieRow
