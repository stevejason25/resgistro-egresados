import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()
  const pathnames = location.pathname.split('/').filter((x) => x)
  // Determine base route based on user role
  const baseRoute = user?.role === 'admin' ? '/admin' : '/user'
  // Map paths to readable names
  const getPathName = (path: string): string => {
    const pathMap: Record<string, string> = {
      admin: 'Dashboard',
      user: 'Mi Proyecto',
      projects: 'Proyectos',
      create: 'Crear',
      edit: 'Editar',
      users: 'Usuarios',
      audit: 'Auditoría',
      profile: 'Mi Perfil',
      tutors: 'Tutores', // Añadí este que faltaba
    }
    return pathMap[path] || path
  }
  return (
    <div className="flex items-center text-sm text-[#4B5563]">
      <Link to={baseRoute} className="flex items-center hover:text-[#0B4F9F]">
        <HomeIcon className="w-4 h-4 mr-1" />
        <span>{user?.role === 'admin' ? 'Dashboard' : 'Inicio'}</span>
      </Link>
      {pathnames.map((name, index) => {
        // Skip the first element if it's 'admin' or 'user' as we've already included it
        if (index === 0 && (name === 'admin' || name === 'user')) return null
        // Check if this is a dynamic parameter (like an ID)
        const isId = name.match(/^[0-9a-fA-F-]+$/) !== null // Mejorado para IDs
        // Build the path up to this point
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/')
        // For the last item or IDs, don't make it a link
        const isLast = index === pathnames.length - 1
        return (
          <Fragment key={index}>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
            {!isLast && !isId ? (
              <Link to={routeTo} className="hover:text-[#0B4F9F]">
                {getPathName(name)}
              </Link>
            ) : (
              <span className="font-medium">
                {isId ? 'Detalle' : getPathName(name)} 
              </span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
export default Breadcrumb