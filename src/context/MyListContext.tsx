import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Movie } from '../types'

interface MyListContextType {
  myList: Movie[]
  addToList: (movie: Movie) => void
  removeFromList: (id: number) => void
  isInList: (id: number) => boolean
}

const MyListContext = createContext<MyListContextType | undefined>(undefined)

export const MyListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myList, setMyList] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem('netflix_mylist')
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('netflix_mylist', JSON.stringify(myList))
  }, [myList])

  const addToList = (movie: Movie) => {
    setMyList(prev => prev.find(m => m.id === movie.id) ? prev : [movie, ...prev])
  }

  const removeFromList = (id: number) => {
    setMyList(prev => prev.filter(m => m.id !== id))
  }

  const isInList = (id: number) => myList.some(m => m.id === id)

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </MyListContext.Provider>
  )
}

export const useMyList = (): MyListContextType => {
  const ctx = useContext(MyListContext)
  if (!ctx) throw new Error('useMyList must be inside MyListProvider')
  return ctx
}
