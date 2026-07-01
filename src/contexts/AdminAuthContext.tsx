/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { isAdminAuthenticated, setAdminAuth, clearAdminAuth } from '../lib/storage'

interface AdminAuthContextType {
  isAuth: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'admin123'

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(isAdminAuthenticated())

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true)
      setIsAuth(true)
      return true
    }
    return false
  }

  const logout = () => {
    clearAdminAuth()
    setIsAuth(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
