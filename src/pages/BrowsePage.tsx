import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import MovieRow from '../components/MovieRow/MovieRow'
import Footer from '../components/Footer/Footer'
import { useMovies } from '../hooks/useMovies'
import {
  fetchTrending, fetchNetflixOriginals, fetchTopRated,
  fetchActionMovies, fetchComedyMovies, fetchHorrorMovies,
  fetchRomanceMovies, fetchDocumentaries, fetchPopularTV,
} from '../services/tmdbApi'
import styles from './BrowsePage.module.css'

const BrowsePage: React.FC = () => {
  const trending      = useMovies(fetchTrending)
  const originals     = useMovies(fetchNetflixOriginals)
  const topRated      = useMovies(fetchTopRated)
  const action        = useMovies(fetchActionMovies)
  const comedy        = useMovies(fetchComedyMovies)
  const horror        = useMovies(fetchHorrorMovies)
  const romance       = useMovies(fetchRomanceMovies)
  const docs          = useMovies(fetchDocumentaries)
  const popularTV     = useMovies(fetchPopularTV)

  return (
    <div className={styles.page}>
      <Navbar />
      <Banner />
      <main className={styles.rows}>
        <MovieRow title="Netflix Originals" movies={originals.movies} isLarge />
        <MovieRow title="Trending Now"       movies={trending.movies} />
        <MovieRow title="Top Rated"          movies={topRated.movies} />
        <MovieRow title="Action Thrillers"   movies={action.movies} />
        <MovieRow title="Comedy"             movies={comedy.movies} />
        <MovieRow title="Scary Movies"       movies={horror.movies} />
        <MovieRow title="Romance"            movies={romance.movies} />
        <MovieRow title="Documentaries"      movies={docs.movies} />
        <MovieRow title="Popular on TV"      movies={popularTV.movies} />
      </main>
      <Footer />
    </div>
  )
}

export default BrowsePage
