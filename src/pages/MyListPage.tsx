import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useMyList } from '../context/MyListContext'
import { getImageUrl } from '../config/tmdb'
import styles from './MyListPage.module.css'

const MyListPage: React.FC = () => {
  const { myList, removeFromList } = useMyList()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>My List</h1>

        {myList.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🎬</span>
            <p>Your list is empty.</p>
            <p className={styles.sub}>Browse movies and click <strong>+ My List</strong> to save them here.</p>
            <button className={styles.browseBtn} onClick={() => navigate('/browse')}>
              Browse Now
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {myList.map(m => (
              <div key={m.id} className={styles.card}>
                <img
                  src={getImageUrl(m.backdrop_path ?? m.poster_path, 'w500')}
                  alt={m.title ?? m.name}
                  className={styles.img}
                  onClick={() => navigate(`/movie/${m.id}?type=${m.media_type === 'tv' ? 'tv' : 'movie'}`)}
                />
                <div className={styles.info}>
                  <span className={styles.title}>{m.title ?? m.name}</span>
                  <div className={styles.actions}>
                    <span className={styles.rating}>⭐ {m.vote_average.toFixed(1)}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromList(m.id)}
                      title="Remove from My List"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyListPage
