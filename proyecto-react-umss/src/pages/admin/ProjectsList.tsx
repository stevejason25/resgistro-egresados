import React, { useState } from 'react' // NUEVO: Importar useState
import { Link } from 'react-router-dom'
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
} from 'lucide-react'

// MODIFICADO: Mock data con códigos numéricos
const projects = [
  {
    id: 1,
    codigo: '2235', // MODIFICADO
    titulo: 'Sistema de gestión académica para la facultad',
    tutor: 'Dr. Roberto García',
    carrera: 'Informática',
    modalidad: 'Proyecto de Grado',
    fecha: '2023-05-15',
    egresado: 'Juan Pérez',
  },
  {
    id: 2,
    codigo: '21456', // MODIFICADO
    titulo: 'Aplicación móvil para seguimiento de egresados',
    tutor: 'Ing. María Fernández',
    carrera: 'Sistemas',
    modalidad: 'Adscripción',
    fecha: '2023-05-10',
    egresado: 'María López',
  },
  {
    id: 3,
    codigo: '10045', // MODIFICADO
    titulo: 'Plataforma de aprendizaje en línea para estudiantes',
    tutor: 'Dr. Carlos Mendoza',
    carrera: 'Informática',
    modalidad: 'Trabajo Dirigido',
    fecha: '2023-05-05',
    egresado: 'Carlos Rodríguez',
  },
]

const ProjectsList: React.FC = () => {
  // NUEVO: Estados para los filtros y el buscador
  const [searchQuery, setSearchQuery] = useState('')
  const [carreraFilter, setCarreraFilter] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState('')

  // NUEVO: Lógica de filtrado
  const normalizedQuery = searchQuery.toLowerCase()

  const filteredProjects = projects.filter((project) => {
    // 1. Filtro por Buscador (Título, Egresado o Código)
    const matchesSearch =
      project.titulo.toLowerCase().includes(normalizedQuery) ||
      project.codigo.toLowerCase().includes(normalizedQuery) ||
      (project.egresado &&
        project.egresado.toLowerCase().includes(normalizedQuery))

    // 2. Filtro por Carrera
    const matchesCarrera =
      carreraFilter === '' || project.carrera === carreraFilter

    // 3. Filtro por Modalidad
    const matchesModalidad =
      modalidadFilter === '' || project.modalidad === modalidadFilter

    return matchesSearch && matchesCarrera && matchesModalidad
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Gestión de Proyectos
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Centro principal del sistema - Registra y gestiona todos los
            proyectos
          </p>
        </div>
        <Link
          to="/admin/projects/create"
          className="flex items-center px-4 py-2 bg-[#C62828] text-white rounded-md hover:bg-[#C62828]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Crear Proyecto
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar por título, egresado o código..." // MODIFICADO
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              // NUEVO: Conectar estado al input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              // NUEVO: Conectar estado al select
              value={carreraFilter}
              onChange={(e) => setCarreraFilter(e.target.value)}
            >
              <option value="">Todas las carreras</option>
              <option value="Informática">Informática</option>
              <option value="Sistemas">Sistemas</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              // NUEVO: Conectar estado al select
              value={modalidadFilter}
              onChange={(e) => setModalidadFilter(e.target.value)}
            >
              <option value="">Todas las modalidades</option>
              <option value="Proyecto de Grado">Proyecto de Grado</option>
              <option value="Adscripción">Adscripción</option>
              <option value="Trabajo Dirigido">Trabajo Dirigido</option>
              <option value="Tesis">Tesis</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* ... el resto de tu thead ... */}
            <thead className="bg-gray-50">
             <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Código
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Título del Proyecto
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Tutor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Egresado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* MODIFICADO: Usar filteredProjects en lugar de projects */}
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#C62828]">
                    {project.codigo}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#1F2937] font-medium">
                    {project.titulo}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    {project.tutor}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0B4F9F]/10 text-[#0B4F9F]">
                      {project.modalidad}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    {new Date(project.fecha).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#4B5563]">
                    {project.egresado || (
                      <span className="text-gray-400 italic">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/projects/${project.id}`}
                      className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3 inline-block"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
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
            {/* MODIFICADO: Contar los resultados filtrados */}
            Mostrando <span className="font-medium">1</span> a{' '}
            <span className="font-medium">{filteredProjects.length}</span> de{' '}
            <span className="font-medium">{filteredProjects.length}</span>{' '}
            resultados
          </div>
          {/* ... tu paginación (que por ahora está deshabilitada) ... */}
        </div>
      </div>
    </div>
  )
}

export default ProjectsList