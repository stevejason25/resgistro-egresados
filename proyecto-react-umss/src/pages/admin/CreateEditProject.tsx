import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
import { useProject } from '../../context/ProjectContext'
import toast from 'react-hot-toast'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectFormData } from '../../lib/validations'

const availableTutors = [
  { id: 1, nombre: 'Dr. Roberto García' },
  { id: 2, nombre: 'Ing. María Fernández' },
  { id: 3, nombre: 'Dr. Carlos Mendoza' },
]

const CreateEditProject: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addProject, isLoading: isSaving } = useProject()
  const isEditing = !!id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      codigo: '',
      titulo: '',
      tutorId: 0,
      carrera: 'Informática',
      modalidad: 'Proyecto de Grado',
      fecha: '',
      descripcion: '',
    },
  })

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    try {
      const formattedData = {
        ...data,
        tutorId: Number(data.tutorId),
      }
      await addProject(formattedData)
      toast.success('Proyecto guardado correctamente')
      navigate('/admin/projects')
    } catch (error) {
      toast.error('Hubo un error al guardar el proyecto')
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Título del Proyecto *"
                type="text"
                id="titulo"
                placeholder="Título completo del proyecto"
                error={errors.titulo?.message}
                {...register('titulo')}
              />
            </div>

            <div>
              <Input
                label="Código de Proyecto *"
                type="text"
                id="codigo"
                placeholder="Ej: 2235"
                error={errors.codigo?.message}
                {...register('codigo')}
              />
            </div>

            <div>
              <Select
                label="Tutor Asignado *"
                id="tutorId"
                error={errors.tutorId?.message}
                {...register('tutorId', { valueAsNumber: true })}
              >
                <option value="0">Seleccione un tutor</option>
                {availableTutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.nombre}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Input
                label="Fecha de Defensa *"
                type="date"
                id="fecha"
                error={errors.fecha?.message}
                {...register('fecha')}
              />
            </div>

            <div>
              <Select
                label="Carrera *"
                id="carrera"
                error={errors.carrera?.message}
                {...register('carrera')}
              >
                <option value="Informática">Informática</option>
                <option value="Sistemas">Sistemas</option>
              </Select>
            </div>

            <div>
              <Select
                label="Modalidad de Titulación *"
                id="modalidad"
                error={errors.modalidad?.message}
                {...register('modalidad')}
              >
                <option value="Proyecto de Grado">Proyecto de Grado</option>
                <option value="Adscripción">Adscripción</option>
                <option value="Trabajo Dirigido">Trabajo Dirigido</option>
                <option value="Tesis">Tesis</option>
              </Select>
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
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]/50 focus:border-[#C62828]"
                placeholder="Breve descripción del proyecto (opcional)"
                {...register('descripcion')}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-[#4B5563]">* Campos obligatorios</p>
            <Button type="submit" variant="danger" disabled={isSaving}>
              <SaveIcon className="w-4 h-4 mr-2" />
              {isSaving
                ? 'Guardando...'
                : isEditing
                ? 'Actualizar Proyecto'
                : 'Guardar Proyecto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEditProject