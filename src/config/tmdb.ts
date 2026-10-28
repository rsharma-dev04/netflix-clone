export const TMDB_CONFIG = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '5b71eb7aa1e87645fae8fe31e23305db',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
}

export const getImageUrl = (path: string | null, size = 'w500'): string => {
  if (!path) return 'https://via.placeholder.com/500x281/141414/808080?text=No+Image'
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path: string | null): string =>
  getImageUrl(path, 'original')
