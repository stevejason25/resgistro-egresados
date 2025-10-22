import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'
// Mock data for tutors
const tutors = [
  {
    id: 1,
    nombre: 'Dr. Roberto García',
    email: 'roberto.garcia@umss.edu.bo',
    telefono: '70111222',
    profesion: 'Ingeniero de Sistemas - PhD en Computación',
    proyectos: 12,
  },
  {
    id: 2,
    nombre: 'Ing. María Fernández',
    email: 'maria.fernandez@umss.edu.bo',
    telefono: '70222333',
    profesion: 'Ingeniera Informática - MSc',
    proyectos: 8,
  },
  {
    id: 3,
    nombre: 'Dr. Carlos Mendoza',
    email: 'carlos.mendoza@umss.edu.bo',
    telefono: '70333444',
    profesion: 'Ingeniero de Sistemas - PhD',
    proyectos: 15,
  },
]
const TutorsList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Lista de Tutores
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
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
              placeholder="Buscar tutor..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
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
              {tutors.map((tutor) => (
                <tr key={tutor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#1F2937]">
                    {tutor.nombre}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    {tutor.profesion}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    <div>{tutor.email}</div>
                    <div>{tutor.telefono}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0B4F9F]/10 text-[#0B4F9F]">
                      {tutor.proyectos} proyectos
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/tutors/${tutor.id}/edit`}
                      className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3 inline-block"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Link>
                    <button className="text-[#C62828] hover:text-[#C62828]/70 inline-block">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-[#4B5563]">
            Mostrando <span className="font-medium">1</span> a{' '}
            <span className="font-medium">3</span> de{' '}
            <span className="font-medium">3</span> resultados
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-[#4B5563] hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Anterior
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-[#4B5563] hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TutorsList