import { useState } from 'react'
import { getImageUrl } from '../../config/tmdb'
import type { Movie } from '../../types'
import styles from './MovieCard.module.css'

interface Props { movie: Movie; isLarge?: boolean; onClick: () => void }

const MovieCard: React.FC<Props> = ({ movie, isLarge = false, onClick }) => {
  const [err, setErr] = useState(false)
  const title = movie.title ?? movie.name ?? 'Untitled'
  const imgPath = isLarge ? movie.poster_path : (movie.backdrop_path ?? movie.poster_path)

  return (
    <div className={`${styles.card} ${isLarge ? styles.large : ''}`} onClick={onClick} title={title}>
      {imgPath && !err ? (
        <img src={getImageUrl(imgPath, isLarge ? 'w342' : 'w500')} alt={title}
          className={styles.img} loading="lazy" onError={() => setErr(true)} />
      ) : (
        <div className={styles.placeholder}><span>{title}</span></div>
      )}
      <div className={styles.overlay}>
        <div className={styles.info}>
          <span className={styles.name}>{title}</span>
          <div className={styles.meta}>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{(movie.release_date ?? movie.first_air_date ?? '').slice(0, 4)}</span>
          </div>
        </div>
        <button className={styles.playBtn} aria-label={`Play ${title}`}>▶</button>
      </div>
    </div>
  )
}

export default MovieCard
