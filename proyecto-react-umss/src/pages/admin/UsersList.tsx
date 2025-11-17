import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'
import { useUserRecord } from '../../context/UserRecordContext'
import { useProject } from '../../context/ProjectContext'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const UsersList: React.FC = () => {
  const { userRecords, isLoading, getUserRecords, deleteUserRecord } =
    useUserRecord()
  const { projects, getProjects } = useProject()
  const [searchQuery, setSearchQuery] = useState('')
  const [carreraFilter, setCarreraFilter] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  useEffect(() => {
    getUserRecords()
    if (projects.length === 0) {
      getProjects()
    }
  }, [getUserRecords, getProjects, projects.length])

  const carreras = ['Informática', 'Sistemas']
  const modalidades = [
    'Proyecto de Grado',
    'Adscripción',
    'Trabajo Dirigido',
    'Tesis',
  ]

  const getProjectTitle = (id: number) =>
    projects.find((p) => p.id === id)?.titulo || 'Proyecto no encontrado'
  const getProjectModalidad = (id: number) =>
    projects.find((p) => p.id === id)?.modalidad || 'N/A'

  const filteredUsers = useMemo(() => {
    return userRecords.filter((user) => {
      const query = searchQuery.toLowerCase()
      const projectTitle = getProjectTitle(user.proyectoId).toLowerCase()
      const projectModalidad = getProjectModalidad(user.proyectoId).toLowerCase()

      const textMatch =
        user.nombre.toLowerCase().includes(query) ||
        projectTitle.includes(query) ||
        projectModalidad.includes(query)
      const carreraMatch = carreraFilter === '' || user.carrera === carreraFilter
      const modalidadDropdownMatch =
        modalidadFilter === '' ||
        getProjectModalidad(user.proyectoId) === modalidadFilter
      return textMatch && carreraMatch && modalidadDropdownMatch
    })
  }, [searchQuery, carreraFilter, modalidadFilter, userRecords, projects])

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUserRecord(userToDelete)
        toast.success('Egresado eliminado correctamente')
      } catch (error) {
        toast.error('Error al eliminar al egresado')
      } finally {
        setModalOpen(false)
        setUserToDelete(null)
      }
    }
  }

  const resultsCount = filteredUsers.length
  const totalCount = userRecords.length

  return (
    <div className="space-y-6">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Egresado"
      >
        ¿Estás seguro de que deseas eliminar este registro de egresado?
      </Modal>

      <div className="flex justify-between items-center">
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
              placeholder="Buscar por nombre, título de proyecto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select
              value={carreraFilter}
              onChange={(e) => setCarreraFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            >
              <option value="">Todas las carreras</option>
              {carreras.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={modalidadFilter}
              onChange={(e) => setModalidadFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            >
              <option value="">Todas las modalidades</option>
              {modalidades.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && userRecords.length === 0 ? (
          <div className="text-center py-10">Cargando egresados...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    <td className="px-4 py-5 whitespace-nowrap text-base font-medium text-[#1F2937]">
                      {user.nombre}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      {getProjectTitle(user.proyectoId)}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
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
                      {getProjectModalidad(user.proyectoId)}
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
                        <EditIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-[#C62828] hover:text-[#C62828]/70"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {resultsCount === 0 && !isLoading && (
              <div className="py-10 text-center text-base text-gray-500">
                No se encontraron resultados para los filtros aplicados.
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="text-base text-[#4B5563]">
            Mostrando{' '}
            <span className="font-medium">{resultsCount > 0 ? 1 : 0}</span> a{' '}
            <span className="font-medium">{resultsCount}</span> de{' '}
            <span className="font-medium">{totalCount}</span> resultados
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList