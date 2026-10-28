import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MyListProvider } from './context/MyListContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import BrowsePage from './pages/BrowsePage'
import TVShowsPage from './pages/TVShowsPage'
import MoviesPage from './pages/MoviesPage'
import NewPopularPage from './pages/NewPopularPage'
import MyListPage from './pages/MyListPage'
import MovieDetailPage from './pages/MovieDetailPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <MyListProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/browse" element={<ProtectedRoute><BrowsePage /></ProtectedRoute>} />
            <Route path="/tv-shows" element={<ProtectedRoute><TVShowsPage /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
            <Route path="/new-popular" element={<ProtectedRoute><NewPopularPage /></ProtectedRoute>} />
            <Route path="/my-list" element={<ProtectedRoute><MyListPage /></ProtectedRoute>} />
            <Route path="/movie/:id" element={<ProtectedRoute><MovieDetailPage /></ProtectedRoute>} />
          </Routes>
        </MyListProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
