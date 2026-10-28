import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { fetchMovieDetails } from '../services/tmdbApi'
import { getBackdropUrl, getImageUrl } from '../config/tmdb'
import type { MovieDetails } from '../types'
import Navbar from '../components/Navbar/Navbar'
import { useMyList } from '../context/MyListContext'
import styles from './MovieDetailPage.module.css'

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const mediaType = (searchParams.get('type') ?? 'movie') as 'movie' | 'tv'
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToList, removeFromList, isInList } = useMyList()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchMovieDetails(Number(id), mediaType)
      .then(setMovie).catch(() => setError('Failed to load.'))
      .finally(() => setLoading(false))
  }, [id, mediaType])

  if (loading) return <div className={styles.page}><Navbar /><div className={styles.center}><div className={styles.spin} /></div></div>
  if (error || !movie) return (
    <div className={styles.page}><Navbar />
      <div className={styles.center}><p>{error || 'Not found.'}</p>
        <button onClick={() => navigate('/browse')} className={styles.backBtn}>Back to Browse</button>
      </div>
    </div>
  )

  const title = movie.title ?? movie.name ?? 'Untitled'
  const year = (movie.release_date ?? movie.first_air_date ?? '').slice(0, 4)
  const trailerKey = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.hero} style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>
          <h1 className={styles.title}>{title}</h1>
          {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}
          <div className={styles.meta}>
            {year && <span>{year}</span>}
            {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
            {movie.number_of_seasons && <span>{movie.number_of_seasons} Season{movie.number_of_seasons > 1 ? 's' : ''}</span>}
            <span className={styles.score}>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
          <div className={styles.heroBtns}>
            <button className={styles.play}>▶ Play</button>
            <button
              className={`${styles.myList} ${isInList(movie.id) ? styles.inList : ''}`}
              onClick={() => isInList(movie.id) ? removeFromList(movie.id) : addToList(movie)}
            >
              {isInList(movie.id) ? '✓ In My List' : '+ My List'}
            </button>
          </div>
        </div>
        <div className={styles.heroFade} />
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          {trailerKey && (
            <section className={styles.section}>
              <h2>Trailer</h2>
              <div className={styles.trailerWrap}>
                <iframe src={`https://www.youtube.com/embed/${trailerKey}`} title="Trailer"
                  allowFullScreen allow="accelerometer; autoplay; encrypted-media" className={styles.trailer} />
              </div>
            </section>
          )}
          <section className={styles.section}>
            <h2>About {title}</h2>
            <p className={styles.overview}>{movie.overview}</p>
          </section>
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <section className={styles.section}>
              <h2>Cast</h2>
              <div className={styles.castGrid}>
                {movie.credits.cast.slice(0, 12).map(m => (
                  <div key={m.id} className={styles.castCard}>
                    <img src={m.profile_path ? getImageUrl(m.profile_path, 'w185') : 'https://via.placeholder.com/80x80/1a1a1a/888?text=N%2FA'}
                      alt={m.name} className={styles.castImg} />
                    <div className={styles.castName}>{m.name}</div>
                    <div className={styles.castChar}>{m.character}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {movie.similar?.results && movie.similar.results.length > 0 && (
            <section className={styles.section}>
              <h2>More Like This</h2>
              <div className={styles.simGrid}>
                {movie.similar.results.slice(0, 8).map(m => (
                  <div key={m.id} className={styles.simCard} onClick={() => navigate(`/movie/${m.id}?type=${mediaType}`)}>
                    <img src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')} alt={m.title ?? m.name} className={styles.simImg} />
                    <div className={styles.simInfo}>
                      <span>{m.title ?? m.name}</span>
                      <span>⭐ {m.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className={styles.sidebar}>
          <img src={getImageUrl(movie.poster_path, 'w342')} alt={title} className={styles.poster} />
          <div className={styles.sideInfo}>
            {movie.genres?.length > 0 && <p><span className={styles.sl}>Genres</span>{movie.genres.map(g => g.name).join(', ')}</p>}
            {movie.status && <p><span className={styles.sl}>Status</span>{movie.status}</p>}
            {movie.original_language && <p><span className={styles.sl}>Language</span>{movie.original_language.toUpperCase()}</p>}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default MovieDetailPage
