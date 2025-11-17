import React from 'react'

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F5F7FA]">
      <div className="text-lg font-medium text-[#4B5563]">Cargando...</div>
    </div>
  )
}

export default LoadingScreen