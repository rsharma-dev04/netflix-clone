export interface Movie {
  id: number
  title: string
  name?: string
  original_title?: string
  original_name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  media_type?: string
  adult: boolean
  popularity: number
  original_language: string
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime?: number
  number_of_seasons?: number
  number_of_episodes?: number
  status: string
  tagline?: string
  production_companies: ProductionCompany[]
  videos?: VideoResults
  similar?: MovieListResult
  credits?: Credits
}

export interface Genre { id: number; name: string }
export interface ProductionCompany { id: number; name: string; logo_path: string | null; origin_country: string }
export interface Video { id: string; key: string; name: string; site: string; type: string; official: boolean }
export interface VideoResults { results: Video[] }
export interface CastMember { id: number; name: string; character: string; profile_path: string | null }
export interface Credits { cast: CastMember[] }
export interface MovieListResult { page: number; results: Movie[]; total_pages: number; total_results: number }
export interface User { email: string; name: string }
export interface AuthContextType { user: User | null; login: (email: string, password: string) => Promise<void>; logout: () => void; isAuthenticated: boolean }
