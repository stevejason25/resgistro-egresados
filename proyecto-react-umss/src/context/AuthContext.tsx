import React, { useEffect, useState, createContext, useContext } from 'react'
import { IUser } from '../types'

type AuthContextType = {
  user: IUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario está almacenado en localStorage al cargar
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      // Simular llamada a API (aquí conectarás tu backend Laravel luego)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Usuario simulado basado en el email para propósitos de demostración
      let mockUser: IUser
      if (email.toLowerCase().includes('admin')) {
        mockUser = {
          id: 1,
          name: 'Admin User',
          email,
          role: 'admin',
        }
      } else {
        mockUser = {
          id: 2,
          name: 'Regular User',
          email,
          role: 'user',
        }
      }

      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    // Redirigir al login forzando recarga para limpiar estados si es necesario
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}