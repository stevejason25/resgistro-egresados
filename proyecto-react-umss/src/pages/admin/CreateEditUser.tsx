import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
import { useUserRecord } from '../../context/UserRecordContext'
import { useProject } from '../../context/ProjectContext'
import { IProject } from '../../types'
import toast from 'react-hot-toast'
import BlueInput from '../../components/ui/BlueInput'
import BlueSelect from '../../components/ui/BlueSelect'
import Button from '../../components/ui/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRecordSchema, UserRecordFormData } from '../../lib/validations'

const CreateEditUser: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addUserRecord, isLoading: isSaving } = useUserRecord()
  const { projects, getProjects } = useProject()
  const isEditing = !!id

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRecordFormData>({
    resolver: zodResolver(userRecordSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      carrera: 'Informática',
      proyectoId: 0,
    },
  })

  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const watchingProjectId = watch('proyectoId')

  useEffect(() => {
    if (projects.length === 0) {
      getProjects()
    }
  }, [getProjects, projects.length])

  useEffect(() => {
    if (watchingProjectId) {
      const project = projects.find(
        (p: IProject) => p.id === Number(watchingProjectId),
      )
      setSelectedProject(project || null)
    } else {
      setSelectedProject(null)
    }
  }, [watchingProjectId, projects])

  const onSubmit: SubmitHandler<UserRecordFormData> = async (data) => {
    try {
      await addUserRecord(data)
      toast.success('Egresado registrado correctamente')
      navigate('/admin/users')
    } catch (error) {
      toast.error('Error al registrar al egresado')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {isEditing ? 'Editar Egresado' : 'Registrar Nuevo Egresado'}
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Asigne un proyecto existente al egresado
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
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-medium text-[#1F2937] border-b pb-2">
                Información Personal
              </h2>
            </div>

            <BlueInput
              label="Nombre Completo *"
              type="text"
              id="nombre"
              placeholder="Nombre completo del egresado"
              error={errors.nombre?.message}
              {...register('nombre')}
            />
            <BlueSelect
              label="Carrera *"
              id="carrera"
              error={errors.carrera?.message}
              {...register('carrera')}
            >
              <option value="Informática">Informática</option>
              <option value="Sistemas">Sistemas</option>
            </BlueSelect>
            <BlueInput
              label="Correo Electrónico *"
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <BlueInput
              label="Número de Celular *"
              type="tel"
              id="telefono"
              placeholder="70123456"
              error={errors.telefono?.message}
              {...register('telefono')}
            />

            <div className="space-y-4 md:col-span-2 pt-4 border-t">
              <h2 className="text-lg font-medium text-[#1F2937] border-b pb-2">
                Asignación de Proyecto
              </h2>
            </div>

            <div className="md:col-span-2">
              <BlueSelect
                label="Seleccionar Proyecto *"
                id="proyectoId"
                error={errors.proyectoId?.message}
                {...register('proyectoId')}
              >
                <option value="0">Seleccione un proyecto</option>
                {projects.map((project: IProject) => (
                  <option key={project.id} value={project.id}>
                    {project.codigo} - {project.titulo}
                  </option>
                ))}
              </BlueSelect>
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
            <Button type="submit" variant="primary" disabled={isSaving}>
              <SaveIcon className="w-4 h-4 mr-2" />
              {isSaving
                ? 'Guardando...'
                : isEditing
                ? 'Actualizar Registro'
                : 'Guardar Registro'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEditUser