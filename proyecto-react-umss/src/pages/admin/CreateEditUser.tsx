import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
// Mock data for available projects
const availableProjects = [
  {
    id: 1,
    codigo: 'UMSS-INF-2023-00123',
    titulo: 'Sistema de gestión académica para la facultad',
    modalidad: 'Proyecto de Grado',
  },
  {
    id: 2,
    codigo: 'UMSS-SIS-2023-00124',
    titulo: 'Aplicación móvil para seguimiento de egresados',
    modalidad: 'Adscripción',
  },
  {
    id: 3,
    codigo: 'UMSS-INF-2023-00125',
    titulo: 'Plataforma de aprendizaje en línea para estudiantes',
    modalidad: 'Trabajo Dirigido',
  },
]
const CreateEditUser: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    carrera: 'Informática',
    proyectoId: '',
  })
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Update selected project when project is selected
    if (name === 'proyectoId') {
      const project = availableProjects.find((p) => p.id === parseInt(value))
      setSelectedProject(project || null)
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    alert('Titulado registrado correctamente')
    navigate('/admin/users')
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {isEditing ? 'Editar Titulado' : 'Registrar Nuevo Titulado'}
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Asigne un proyecto existente al titulado
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-[#4B5563] hover:text-[#0B4F9F]"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información personal */}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-medium text-[#1F2937] border-b pb-2">
                Información Personal
              </h2>
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                placeholder="Nombre completo del titulado"
                required
              />
            </div>
            <div>
              <label
                htmlFor="carrera"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Carrera *
              </label>
              <select
                id="carrera"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                required
              >
                <option value="Informática">Informática</option>
                <option value="Sistemas">Sistemas</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Número de Celular *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                placeholder="70123456"
                required
              />
            </div>
            {/* Asignación de proyecto */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t">
              <h2 className="text-lg font-medium text-[#1F2937] border-b pb-2">
                Asignación de Proyecto
              </h2>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="proyectoId"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Seleccionar Proyecto *
              </label>
              <select
                id="proyectoId"
                name="proyectoId"
                value={formData.proyectoId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                required
              >
                <option value="">Seleccione un proyecto</option>
                {availableProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.codigo} - {project.titulo}
                  </option>
                ))}
              </select>
              <p className="text-xs text-[#4B5563] mt-1">
                ¿No encuentra el proyecto?{' '}
                <a
                  href="/admin/projects/create"
                  className="text-[#C62828] hover:underline font-medium"
                >
                  Créelo primero en Proyectos
                </a>
              </p>
            </div>
            {/* Información del proyecto seleccionado */}
            {selectedProject && (
              <div className="md:col-span-2 bg-[#F5F7FA] p-4 rounded-md">
                <h3 className="text-sm font-medium text-[#1F2937] mb-3">
                  Información del Proyecto Seleccionado
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#4B5563]">Código:</span>
                    <p className="font-medium text-[#1F2937]">
                      {selectedProject.codigo}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#4B5563]">Modalidad:</span>
                    <p className="font-medium text-[#1F2937]">
                      {selectedProject.modalidad}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#4B5563]">Título:</span>
                    <p className="font-medium text-[#1F2937]">
                      {selectedProject.titulo}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-[#4B5563]">* Campos obligatorios</p>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              {isEditing ? 'Actualizar Registro' : 'Guardar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateEditUser