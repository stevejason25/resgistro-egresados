import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
// Mock data for tutors
const availableTutors = [
  {
    id: 1,
    nombre: 'Dr. Roberto García',
  },
  {
    id: 2,
    nombre: 'Ing. María Fernández',
  },
  {
    id: 3,
    nombre: 'Dr. Carlos Mendoza',
  },
]
const CreateEditProject: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [formData, setFormData] = useState({
    titulo: '',
    tutorId: '',
    carrera: 'Informática',
    modalidad: 'Proyecto de Grado',
    fecha: '',
    descripcion: '',
  })
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    alert('Proyecto guardado correctamente')
    navigate('/admin/projects')
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Complete toda la información del proyecto
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
            <div className="md:col-span-2">
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Título del Proyecto *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                placeholder="Título completo del proyecto"
                required
              />
            </div>
            <div>
              <label
                htmlFor="tutorId"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Tutor Asignado *
              </label>
              <select
                id="tutorId"
                name="tutorId"
                value={formData.tutorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                required
              >
                <option value="">Seleccione un tutor</option>
                {availableTutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.nombre}
                  </option>
                ))}
              </select>
              <p className="text-xs text-[#4B5563] mt-1">
                ¿No encuentra el tutor?{' '}
                <a
                  href="/admin/tutors/create"
                  className="text-[#0B4F9F] hover:underline"
                >
                  Registre uno nuevo
                </a>
              </p>
            </div>
            <div>
              <label
                htmlFor="fecha"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Fecha de Defensa *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                required
              >
                <option value="Informática">Informática</option>
                <option value="Sistemas">Sistemas</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="modalidad"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Modalidad de Titulación *
              </label>
              <select
                id="modalidad"
                name="modalidad"
                value={formData.modalidad}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                required
              >
                <option value="Proyecto de Grado">Proyecto de Grado</option>
                <option value="Adscripción">Adscripción</option>
                <option value="Trabajo Dirigido">Trabajo Dirigido</option>
                <option value="Tesis">Tesis</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Descripción del Proyecto
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                placeholder="Breve descripción del proyecto (opcional)"
              />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-[#4B5563]">* Campos obligatorios</p>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-[#C62828] text-white rounded-md hover:bg-[#C62828]/90"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              {isEditing ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateEditProject