import React from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  return (
    <header className="bg-[#0B4F9F] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={user?.role === 'admin' ? '/admin' : '/user'}
            className="flex items-center"
          >
            <span className="font-bold text-xl">UMSS</span>
            <span className="ml-2 font-medium">Registro de Proyectos</span>
          </Link>
        </div>
        <div className="flex-1 mx-8 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar proyecto..."
              className="w-full py-1.5 pl-10 pr-4 rounded-md bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2">{user?.name}</span>
            <UserIcon className="w-5 h-5" />
          </div>
          <button
            onClick={logout}
            className="flex items-center text-white/90 hover:text-white"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="ml-1">Salir</span>
          </button>
        </div>
      </div>
    </header>
  )
}
export default Navbar