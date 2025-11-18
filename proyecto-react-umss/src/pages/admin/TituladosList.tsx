import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'
import { useTitulado } from '../../context/TituladoContext'
import { useProject } from '../../context/ProjectContext'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'
import { CAREERS, MODALITIES } from '../../lib/constants'

const TituladosList: React.FC = () => {
  const { titulados, isLoading, getTitulados, deleteTitulado } = useTitulado()
  const { projects, getProjects } = useProject()
  const [searchQuery, setSearchQuery] = useState('')
  const [carreraFilter, setCarreraFilter] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [tituladoToDelete, setTituladoToDelete] = useState<number | null>(null)

  useEffect(() => {
    getTitulados()
    if (projects.length === 0) {
      getProjects()
    }
  }, [getTitulados, getProjects, projects.length])

  const getProjectTitle = (id: number) =>
    projects.find((p) => p.id === id)?.titulo || 'Proyecto no encontrado'

  const getProjectModalidad = (id: number) =>
    projects.find((p) => p.id === id)?.modalidad || 'N/A'

  const filteredTitulados = useMemo(() => {
    return titulados.filter((titulado) => {
      const query = searchQuery.toLowerCase()
      const projectTitle = getProjectTitle(titulado.proyectoId).toLowerCase()
      const projectModalidad = getProjectModalidad(titulado.proyectoId).toLowerCase()
      
      const textMatch =
        titulado.nombre.toLowerCase().includes(query) ||
        projectTitle.includes(query) ||
        projectModalidad.includes(query)

      const carreraMatch = carreraFilter === '' || titulado.carrera === carreraFilter
      
      const modalidadDropdownMatch =
        modalidadFilter === '' ||
        getProjectModalidad(titulado.proyectoId) === modalidadFilter

      return textMatch && carreraMatch && modalidadDropdownMatch
    })
  }, [searchQuery, carreraFilter, modalidadFilter, titulados, projects])

  const handleDeleteClick = (id: number) => {
    setTituladoToDelete(id)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (tituladoToDelete) {
      try {
        await deleteTitulado(tituladoToDelete)
        toast.success('Titulado eliminado correctamente')
      } catch (error) {
        toast.error('Error al eliminar al titulado')
      } finally {
        setModalOpen(false)
        setTituladoToDelete(null)
      }
    }
  }

  const resultsCount = filteredTitulados.length
  const totalCount = titulados.length

  return (
    <div className="space-y-6">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Titulado"
      >
        ¿Estás seguro de que deseas eliminar este registro de titulado?
      </Modal>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1F2937]">
          Lista de Titulados
        </h1>
        <Link
          to="/admin/titulados/create"
          className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Registrar Titulado
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar por nombre, título..."
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
              {CAREERS.map((c) => (
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
              {MODALITIES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && titulados.length === 0 ? (
          <div className="text-center py-10">Cargando titulados...</div>
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
                {filteredTitulados.map((titulado) => (
                  <tr key={titulado.id} className="hover:bg-gray-50">
                    <td className="px-4 py-5 whitespace-nowrap text-base font-medium text-[#1F2937]">
                      {titulado.nombre}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      {getProjectTitle(titulado.proyectoId)}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          titulado.carrera === 'Informática'
                            ? 'bg-[#0B4F9F]/10 text-[#0B4F9F]'
                            : 'bg-[#C62828]/10 text-[#C62828]'
                        }`}
                      >
                        {titulado.carrera}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      {getProjectModalidad(titulado.proyectoId)}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      <div>{titulado.email}</div>
                      <div>{titulado.telefono}</div>
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap text-right text-base font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/admin/titulados/${titulado.id}/edit`}
                          className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 transition-colors"
                          title="Editar"
                        >
                          <EditIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(titulado.id)}
                          className="text-[#C62828] hover:text-[#C62828]/70 transition-colors"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
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

export default TituladosList