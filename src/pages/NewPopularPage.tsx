import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useMovies } from '../hooks/useMovies'
import { fetchTrending, fetchPopularTV } from '../services/tmdbApi'
import axios from 'axios'
import { TMDB_CONFIG } from '../config/tmdb'
import { getImageUrl } from '../config/tmdb'
import type { MovieListResult } from '../types'
import { useNavigate } from 'react-router-dom'
import styles from './NewPopularPage.module.css'

const fetchUpcoming = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/movie/upcoming`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US' },
  }).then(r => r.data)

const fetchNowPlaying = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/movie/now_playing`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US' },
  }).then(r => r.data)

const NewPopularPage: React.FC = () => {
  const trending   = useMovies(fetchTrending)
  const upcoming   = useMovies(fetchUpcoming)
  const nowPlaying = useMovies(fetchNowPlaying)
  const popularTV  = useMovies(fetchPopularTV)
  const navigate   = useNavigate()

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>New &amp; Popular</h1>

        <section className={styles.section}>
          <h2>🔥 Trending This Week</h2>
          <div className={styles.grid}>
            {trending.movies.map(m => (
              <div key={m.id} className={styles.card}
                onClick={() => navigate(`/movie/${m.id}?type=${m.media_type === 'tv' ? 'tv' : 'movie'}`)}>
                <img src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')} alt={m.title ?? m.name} className={styles.img} />
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{m.title ?? m.name}</span>
                  <span className={styles.cardRating}>⭐ {m.vote_average.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>🎬 Now Playing in Cinemas</h2>
          <div className={styles.grid}>
            {nowPlaying.movies.map(m => (
              <div key={m.id} className={styles.card}
                onClick={() => navigate(`/movie/${m.id}?type=movie`)}>
                <img src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')} alt={m.title} className={styles.img} />
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{m.title}</span>
                  <span className={styles.cardRating}>⭐ {m.vote_average.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>📅 Coming Soon</h2>
          <div className={styles.grid}>
            {upcoming.movies.map(m => (
              <div key={m.id} className={styles.card}
                onClick={() => navigate(`/movie/${m.id}?type=movie`)}>
                <img src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')} alt={m.title} className={styles.img} />
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{m.title}</span>
                  <span className={styles.cardDate}>{m.release_date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>📺 Popular on TV</h2>
          <div className={styles.grid}>
            {popularTV.movies.map(m => (
              <div key={m.id} className={styles.card}
                onClick={() => navigate(`/movie/${m.id}?type=tv`)}>
                <img src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')} alt={m.name} className={styles.img} />
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{m.name}</span>
                  <span className={styles.cardRating}>⭐ {m.vote_average.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default NewPopularPage
