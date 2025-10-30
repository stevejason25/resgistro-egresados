import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'

// Mock data for users/graduates
const users = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '76543210',
    carrera: 'Informática',
    titulo: 'Sistema de gestión académica para la facultad',
    modalidad: 'Proyecto de Grado',
    fecha: '2023-05-15',
  },
  {
    id: 2,
    nombre: 'María López',
    email: 'maria.lopez@ejemplo.com',
    telefono: '76123456',
    carrera: 'Sistemas',
    titulo: 'Aplicación móvil para seguimiento de egresados',
    modalidad: 'Adscripción',
    fecha: '2023-05-10',
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@ejemplo.com',
    telefono: '70123456',
    carrera: 'Informática',
    titulo: 'Plataforma de aprendizaje en línea para estudiantes',
    modalidad: 'Trabajo Dirigido',
    fecha: '2023-05-05',
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@ejemplo.com',
    telefono: '71234567',
    carrera: 'Sistemas',
    titulo: 'Sistema de control de inventario para laboratorios',
    modalidad: 'Tesis',
    fecha: '2023-04-28',
  },
  {
    id: 5,
    nombre: 'Roberto Sánchez',
    email: 'roberto.sanchez@ejemplo.com',
    telefono: '72345678',
    carrera: 'Informática',
    titulo: 'Aplicación web para reserva de aulas',
    modalidad: 'Proyecto de Grado',
    fecha: '2023-04-22',
  },
]

const UsersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [carreraFilter, setCarreraFilter] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState('')

  const carreras = ['Informática', 'Sistemas']
  const modalidades = ['Proyecto de Grado', 'Adscripción', 'Trabajo Dirigido', 'Tesis']

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const query = searchQuery.toLowerCase()

      // Lógica de Búsqueda por Texto (Nombre, Título del Proyecto O Modalidad)
      const textMatch =
        user.nombre.toLowerCase().includes(query) ||
        user.titulo.toLowerCase().includes(query) ||
        user.modalidad.toLowerCase().includes(query)

      // Filtro por Carrera (si se selecciona)
      const carreraMatch = carreraFilter === '' || user.carrera === carreraFilter

      // Filtro por Modalidad (si se selecciona)
      const modalidadDropdownMatch = modalidadFilter === '' || user.modalidad === modalidadFilter

      return textMatch && carreraMatch && modalidadDropdownMatch
    })
  }, [searchQuery, carreraFilter, modalidadFilter])

  const resultsCount = filteredUsers.length
  const totalCount = users.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Título: Aumentado de text-2xl a text-3xl */}
        <h1 className="text-3xl font-bold text-[#1F2937]"> 
          Lista de Egresados
        </h1>
        <Link
          to="/admin/users/create"
          className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Registrar Egresado
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar por nombre, título de proyecto o modalidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // Input: Aumentado a text-base
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base" 
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            {/* Filtros: Aumentado a text-base */}
            <select
              value={carreraFilter}
              onChange={(e) => setCarreraFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            >
              <option value="">Todas las carreras</option>
              {carreras.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={modalidadFilter}
              onChange={(e) => setModalidadFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            >
              <option value="">Todas las modalidades</option>
              {modalidades.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Headers: Mantienen el tamaño de text-xs, pero aumentamos el relleno de las celdas de contenido */}
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Título del Proyecto
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Carrera
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Fecha de Defensa
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* Contenido de la Tabla: Aumentado el padding vertical (py-5) y el tamaño de letra (text-base) */}
                  <td className="px-4 py-5 whitespace-nowrap text-base font-medium text-[#1F2937]">
                    {user.nombre}
                  </td>
                  <td className="px-4 py-5 text-base text-[#4B5563]">
                    {user.titulo}
                  </td>
                  <td className="px-4 py-5 text-base text-[#4B5563]">
                    {/* El tag interno mantiene text-xs para que se vea como un badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.carrera === 'Informática'
                          ? 'bg-[#0B4F9F]/10 text-[#0B4F9F]'
                          : 'bg-[#C62828]/10 text-[#C62828]'
                      }`}
                    >
                      {user.carrera}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-base text-[#4B5563]">
                    {user.modalidad}
                  </td>
                  <td className="px-4 py-5 text-base text-[#4B5563]">
                    {new Date(user.fecha).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-5 text-base text-[#4B5563]">
                    <div>{user.email}</div>
                    <div>{user.telefono}</div>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-right text-base font-medium">
                    <Link
                      to={`/admin/users/${user.id}/edit`}
                      className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3"
                    >
                      <EditIcon className="h-5 w-5" /> {/* Icono un poco más grande */}
                    </Link>
                    <button className="text-[#C62828] hover:text-[#C62828]/70">
                      <TrashIcon className="h-5 w-5" /> {/* Icono un poco más grande */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {resultsCount === 0 && (
            <div className="py-10 text-center text-base text-gray-500">
              No se encontraron resultados para los filtros aplicados.
            </div>
          )}
        </div>

        {/* Paginación: Aumentado el tamaño del texto a text-base */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-base text-[#4B5563]">
            Mostrando{' '}
            <span className="font-medium">
              {resultsCount > 0 ? 1 : 0}
            </span>{' '}
            a <span className="font-medium">{resultsCount}</span> de{' '}
            <span className="font-medium">{totalCount}</span> resultados
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-base text-[#4B5563] hover:bg-gray-50 disabled:opacity-50"
              disabled={resultsCount <= 5}
            >
              Anterior
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-base text-[#4B5563] hover:bg-gray-50 disabled:opacity-50"
              disabled={resultsCount <= 5}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList