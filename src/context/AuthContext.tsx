import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { AuthContextType, User } from '../types'

interface StoredUser {
  name: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('netflix_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('netflix_user') }
    }
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    await new Promise(res => setTimeout(res, 700))

    // 1. Check registered users from sign-up
    const users: StoredUser[] = JSON.parse(localStorage.getItem('netflix_users') || '[]')
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    )

    // 2. Also allow built-in demo account
    const isDemo =
      email.toLowerCase().trim() === 'demo@netflix.com' && password === 'demo1234'

    if (found || isDemo) {
      const u: User = {
        email: found ? found.email : 'demo@netflix.com',
        name:  found ? found.name  : 'Demo User',
      }
      setUser(u)
      localStorage.setItem('netflix_user', JSON.stringify(u))
    } else {
      throw new Error('Incorrect email or password.')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('netflix_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
