import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBannerMovie } from '../../services/tmdbApi'
import { getBackdropUrl } from '../../config/tmdb'
import type { Movie } from '../../types'
import styles from './Banner.module.css'

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const navigate = useNavigate()

  useEffect(() => { fetchBannerMovie().then(setMovie).catch(console.error) }, [])

  if (!movie) return <div className={styles.skeleton} />

  const title = movie.name ?? movie.original_name ?? movie.title ?? 'Unknown'
  const overview = movie.overview?.length > 200 ? movie.overview.slice(0, 200) + '…' : movie.overview

  return (
    <header className={styles.banner} style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {overview && <p className={styles.overview}>{overview}</p>}
        <div className={styles.buttons}>
          <button className={styles.play} onClick={() => navigate(`/movie/${movie.id}?type=${movie.media_type ?? 'tv'}`)}>
            ▶ Play
          </button>
          <button className={styles.info} onClick={() => navigate(`/movie/${movie.id}?type=${movie.media_type ?? 'tv'}`)}>
            ℹ More Info
          </button>
        </div>
      </div>
      <div className={styles.fade} />
    </header>
  )
}

export default Banner
