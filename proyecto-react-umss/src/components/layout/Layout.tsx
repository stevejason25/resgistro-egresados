import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import { useAuth } from '../../context/AuthContext'
const Layout: React.FC = () => {
  const { logout } = useAuth()
  return (
    <div className="flex h-screen bg-[#F5F7FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <Breadcrumb />
            <button
              onClick={logout}
              className="text-sm text-[#4B5563] hover:text-[#0B4F9F]"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout