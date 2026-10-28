import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import MovieRow from '../components/MovieRow/MovieRow'
import Footer from '../components/Footer/Footer'
import { useMovies } from '../hooks/useMovies'
import { fetchTopRated, fetchActionMovies, fetchComedyMovies, fetchHorrorMovies, fetchRomanceMovies, fetchDocumentaries } from '../services/tmdbApi'
import axios from 'axios'
import { TMDB_CONFIG } from '../config/tmdb'
import type { MovieListResult } from '../types'
import styles from './BrowsePage.module.css'

const fetchSciFi = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 878, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const fetchThriller = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 53, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const fetchAnimation = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 16, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const MoviesPage: React.FC = () => {
  const topRated  = useMovies(fetchTopRated)
  const action    = useMovies(fetchActionMovies)
  const comedy    = useMovies(fetchComedyMovies)
  const horror    = useMovies(fetchHorrorMovies)
  const romance   = useMovies(fetchRomanceMovies)
  const docs      = useMovies(fetchDocumentaries)
  const sciFi     = useMovies(fetchSciFi)
  const thriller  = useMovies(fetchThriller)
  const animation = useMovies(fetchAnimation)

  return (
    <div className={styles.page}>
      <Navbar />
      <Banner />
      <main className={styles.rows}>
        <MovieRow title="Top Rated Movies"   movies={topRated.movies} />
        <MovieRow title="Action & Adventure" movies={action.movies} />
        <MovieRow title="Comedy"             movies={comedy.movies} />
        <MovieRow title="Horror"             movies={horror.movies} />
        <MovieRow title="Romance"            movies={romance.movies} />
        <MovieRow title="Science Fiction"    movies={sciFi.movies} />
        <MovieRow title="Thrillers"          movies={thriller.movies} />
        <MovieRow title="Animation"          movies={animation.movies} />
        <MovieRow title="Documentaries"      movies={docs.movies} />
      </main>
      <Footer />
    </div>
  )
}

export default MoviesPage
