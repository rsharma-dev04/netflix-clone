import { useState, useEffect } from 'react'
import type { Movie } from '../types'

type FetchFn = () => Promise<{ results: Movie[] }>

export const useMovies = (fetchFn: FetchFn) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchFn()
      .then(d => { if (!cancelled) setMovies(d.results) })
      .catch((e: unknown) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Error') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { movies, loading, error }
}
