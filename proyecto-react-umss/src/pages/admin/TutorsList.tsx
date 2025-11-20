import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'
import { useTutor } from '../../context/TutorContext'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const TutorsList: React.FC = () => {
  const { tutors, isLoading, getTutors, deleteTutor } = useTutor()
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [tutorToDelete, setTutorToDelete] = useState<number | null>(null)

  useEffect(() => {
    getTutors()
  }, [])

  const filteredTutors = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return tutors.filter(
      (tutor) =>
        tutor.nombre.toLowerCase().includes(query) ||
        tutor.profesion.toLowerCase().includes(query),
    )
  }, [searchQuery, tutors])

  const handleDeleteClick = (id: number) => {
    setTutorToDelete(id)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (tutorToDelete) {
      try {
        await deleteTutor(tutorToDelete)
        toast.success('Tutor eliminado correctamente')
      } catch (error) {
        toast.error('Error al eliminar al tutor')
      } finally {
        setModalOpen(false)
        setTutorToDelete(null)
      }
    }
  }

  const resultsCount = filteredTutors.length
  const totalCount = tutors.length

  return (
    <div className="space-y-6">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Tutor"
      >
        ¿Estás seguro de que deseas eliminar a este tutor? Esta acción no se
        puede deshacer.
      </Modal>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Lista de Tutores
          </h1>
          <p className="text-base text-[#4B5563] mt-1">
            Gestiona los tutores disponibles para asignar a proyectos
          </p>
        </div>
        <Link
          to="/admin/tutors/create"
          className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Registrar Tutor
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F] text-base"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isLoading && tutors.length === 0 ? (
          <div className="text-center py-10">Cargando tutores...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Profesión
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Proyectos
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTutors.map((tutor) => (
                  <tr key={tutor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-5 whitespace-nowrap text-base font-medium text-[#1F2937]">
                      {tutor.nombre}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      {tutor.profesion}
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      <div>{tutor.email}</div>
                      <div>{tutor.telefono}</div>
                    </td>
                    <td className="px-4 py-5 text-base text-[#4B5563]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0B4F9F]/10 text-[#0B4F9F]">
                        {tutor.proyectos} proyectos
                      </span>
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap text-right text-base font-medium">
                      <Link
                        to={`/admin/tutors/${tutor.id}/edit`}
                        className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3 inline-block"
                      >
                        <EditIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(tutor.id)}
                        className="text-[#C62828] hover:text-[#C62828]/70 inline-block"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default TutorsList