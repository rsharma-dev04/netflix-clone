import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import MovieRow from '../components/MovieRow/MovieRow'
import Footer from '../components/Footer/Footer'
import { useMovies } from '../hooks/useMovies'
import { fetchPopularTV, fetchNetflixOriginals } from '../services/tmdbApi'
import axios from 'axios'
import { TMDB_CONFIG } from '../config/tmdb'
import type { MovieListResult } from '../types'
import styles from './BrowsePage.module.css'

const fetchAnimeTv = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/tv`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 16, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const fetchCrimeTv = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/tv`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 80, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const fetchTopRatedTv = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/tv/top_rated`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US' },
  }).then(r => r.data)

const fetchDramaTv = (): Promise<MovieListResult> =>
  axios.get(`${TMDB_CONFIG.BASE_URL}/discover/tv`, {
    params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US', with_genres: 18, sort_by: 'popularity.desc' },
  }).then(r => r.data)

const TVShowsPage: React.FC = () => {
  const originals = useMovies(fetchNetflixOriginals)
  const popular   = useMovies(fetchPopularTV)
  const topRated  = useMovies(fetchTopRatedTv)
  const crime     = useMovies(fetchCrimeTv)
  const anime     = useMovies(fetchAnimeTv)
  const drama     = useMovies(fetchDramaTv)

  return (
    <div className={styles.page}>
      <Navbar />
      <Banner />
      <main className={styles.rows}>
        <MovieRow title="Netflix Originals"  movies={originals.movies} isLarge />
        <MovieRow title="Popular TV Shows"   movies={popular.movies} />
        <MovieRow title="Top Rated Shows"    movies={topRated.movies} />
        <MovieRow title="Crime TV"           movies={crime.movies} />
        <MovieRow title="Anime"              movies={anime.movies} />
        <MovieRow title="Drama"              movies={drama.movies} />
      </main>
      <Footer />
    </div>
  )
}

export default TVShowsPage
