import React from 'react'
import { useAuth } from '../../context/AuthContext'
const UserProfile: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1F2937]">Mi Perfil</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <p>
            <strong>Nombre:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Rol:</strong>{' '}
            {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
          </p>
        </div>
      </div>
    </div>
  )
}
export default UserProfile