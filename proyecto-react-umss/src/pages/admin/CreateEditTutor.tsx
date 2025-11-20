import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
import { useTutor } from '../../context/TutorContext'
import toast from 'react-hot-toast'
import BlueInput from '../../components/ui/BlueInput'
import Button from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tutorSchema } from '../../lib/validations'
import { z } from 'zod'

type TutorFormData = z.infer<typeof tutorSchema>

const CreateEditTutor: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addTutor, isLoading: isSaving } = useTutor()
  const isEditing = !!id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TutorFormData>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      profesion: '',
    },
  })

  const onSubmit = async (data: TutorFormData) => {
    try {
      await addTutor(data)
      toast.success('Tutor registrado correctamente')
      navigate('/admin/tutors')
    } catch (error) {
      toast.error('Error al registrar al tutor')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {isEditing ? 'Editar Tutor' : 'Registrar Nuevo Tutor'}
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Complete la información del tutor
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
            <BlueInput
              label="Nombre Completo *"
              type="text"
              id="nombre"
              placeholder="Ej: Dr. Juan Pérez"
              error={errors.nombre?.message}
              {...register('nombre')}
            />
            <BlueInput
              label="Profesión / Título *"
              type="text"
              id="profesion"
              placeholder="Ej: Ingeniero de Sistemas - PhD"
              error={errors.profesion?.message}
              {...register('profesion')}
            />
            <BlueInput
              label="Correo Electrónico *"
              type="email"
              id="email"
              placeholder="correo@umss.edu.bo"
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
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-[#4B5563]">* Campos obligatorios</p>
            <Button type="submit" variant="primary" disabled={isSaving}>
              <SaveIcon className="w-4 h-4 mr-2" />
              {isSaving
                ? 'Guardando...'
                : isEditing
                ? 'Actualizar Tutor'
                : 'Guardar Tutor'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEditTutor