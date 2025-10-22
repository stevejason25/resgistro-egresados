import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-6">
          Sistema de Gestión de Proyectos UMSS
        </h1>
        {isAuthenticated ? (
          <div className="space-y-6">
            <p className="text-[#4B5563]">
              Bienvenido, <span className="font-medium">{user?.name}</span>
            </p>
            <div>
              <Link
                to={user?.role === 'admin' ? '/admin' : '/user'}
                className="inline-block px-6 py-3 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
              >
                Ir al {user?.role === 'admin' ? 'Dashboard' : 'Proyecto'}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-[#4B5563]">
              Por favor inicia sesión para acceder al sistema
            </p>
            <div>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default HomePage