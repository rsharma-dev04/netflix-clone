import axios from 'axios'
import { TMDB_CONFIG } from '../config/tmdb'
import type { Movie, MovieDetails, MovieListResult } from '../types'

const api = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  params: { api_key: TMDB_CONFIG.API_KEY, language: 'en-US' },
})

export const fetchTrending = (): Promise<MovieListResult> =>
  api.get('/trending/all/week').then(r => r.data)

export const fetchNetflixOriginals = (): Promise<MovieListResult> =>
  api.get('/discover/tv', { params: { with_networks: 213, sort_by: 'popularity.desc' } }).then(r => r.data)

export const fetchTopRated = (): Promise<MovieListResult> =>
  api.get('/movie/top_rated').then(r => r.data)

export const fetchActionMovies = (): Promise<MovieListResult> =>
  api.get('/discover/movie', { params: { with_genres: 28 } }).then(r => r.data)

export const fetchComedyMovies = (): Promise<MovieListResult> =>
  api.get('/discover/movie', { params: { with_genres: 35 } }).then(r => r.data)

export const fetchHorrorMovies = (): Promise<MovieListResult> =>
  api.get('/discover/movie', { params: { with_genres: 27 } }).then(r => r.data)

export const fetchRomanceMovies = (): Promise<MovieListResult> =>
  api.get('/discover/movie', { params: { with_genres: 10749 } }).then(r => r.data)

export const fetchDocumentaries = (): Promise<MovieListResult> =>
  api.get('/discover/movie', { params: { with_genres: 99 } }).then(r => r.data)

export const fetchPopularTV = (): Promise<MovieListResult> =>
  api.get('/tv/popular').then(r => r.data)

export const fetchMovieDetails = (id: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> =>
  api.get(`/${mediaType}/${id}`, { params: { append_to_response: 'videos,similar,credits' } }).then(r => r.data)

export const searchMulti = (query: string): Promise<MovieListResult> =>
  api.get('/search/multi', { params: { query, include_adult: false } }).then(r => r.data)

export const fetchBannerMovie = async (): Promise<Movie> => {
  const data = await fetchNetflixOriginals()
  return data.results[Math.floor(Math.random() * data.results.length)]
}
