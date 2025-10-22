import React, { useEffect, useState, createContext, useContext } from 'react'
type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}
type AuthContextType = {
  user: User | null
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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])
  const login = async (email: string, password: string) => {
    try {
      // Mock API call - in a real app, this would call your Laravel backend
      setLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Mock response based on email for demo purposes
      let mockUser: User
      if (email.includes('admin')) {
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
    // Opcional: Redirigir a /login
    window.location.href = '/login';
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