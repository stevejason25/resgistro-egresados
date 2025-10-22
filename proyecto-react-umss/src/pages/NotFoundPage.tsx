import React from 'react'
import { Link } from 'react-router-dom'
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-[#0B4F9F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Página no encontrada
        </h2>
        <p className="text-[#4B5563] mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
export default NotFoundPage