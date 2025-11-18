import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  UserIcon,
  GraduationCapIcon,
  BookOpenIcon,
  ClipboardListIcon
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar: React.FC = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0B4F9F]">UMSS</h2>
        <p className="text-xs text-[#4B5563]">Sistema de Proyectos</p>
      </div>

      <nav className="space-y-1">
        {isAdmin ? (
          <>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#0B4F9F] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </NavLink>

            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="px-3 py-2 text-xs font-semibold text-[#4B5563] uppercase">
                Gestión Principal
              </p>
            </div>

            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#C62828] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <BookOpenIcon className="w-5 h-5 mr-3" />
              <span>Proyectos</span>
            </NavLink>

            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="px-3 py-2 text-xs font-semibold text-[#4B5563] uppercase">
                Registros
              </p>
            </div>

            <NavLink
              to="/admin/tutors"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#0B4F9F] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <GraduationCapIcon className="w-5 h-5 mr-3" />
              <span>Tutores</span>
            </NavLink>

            <NavLink
              to="/admin/titulados"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#0B4F9F] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              <span>Titulados</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#0B4F9F] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <ClipboardListIcon className="w-5 h-5 mr-3" />
              <span>Mi Proyecto</span>
            </NavLink>
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${
                  isActive ? 'bg-[#0B4F9F] text-white' : 'text-[#1F2937] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <UserIcon className="w-5 h-5 mr-3" />
              <span>Mi Perfil</span>
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar