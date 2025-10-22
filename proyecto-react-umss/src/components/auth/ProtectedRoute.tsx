import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
interface ProtectedRouteProps {
  children: React.ReactNode
  role?: 'admin' | 'user'
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, loading, isAuthenticated } = useAuth()
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
export default ProtectedRoute