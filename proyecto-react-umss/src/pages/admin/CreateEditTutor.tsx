import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
const CreateEditTutor: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    profesion: '',
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    alert('Tutor registrado correctamente')
    navigate('/admin/tutors')
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {isEditing ? 'Editar Tutor' : 'Registrar Nuevo Tutor'}
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Complete la información del tutor para poder asignarlo a proyectos
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
                placeholder="Ej: Dr. Juan Pérez"
                required
              />
            </div>
            <div>
              <label
                htmlFor="profesion"
                className="block text-sm font-medium text-[#4B5563] mb-1"
              >
                Profesión / Título *
              </label>
              <input
                type="text"
                id="profesion"
                name="profesion"
                value={formData.profesion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                placeholder="Ej: Ingeniero de Sistemas - PhD"
                required
              />
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
                placeholder="correo@umss.edu.bo"
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
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-[#4B5563]">* Campos obligatorios</p>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              {isEditing ? 'Actualizar Tutor' : 'Guardar Tutor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateEditTutor