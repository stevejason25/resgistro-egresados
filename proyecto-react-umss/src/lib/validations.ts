import { z } from 'zod'

export const tutorSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' }),
  telefono: z
    .string()
    .min(7, { message: 'El teléfono debe tener al menos 7 dígitos' }),
  profesion: z
    .string()
    .min(5, { message: 'La profesión debe tener al menos 5 caracteres' }),
})

export type TutorFormData = z.infer<typeof tutorSchema>

export const projectSchema = z.object({
  codigo: z.string().min(1, { message: 'El código es obligatorio' }),
  titulo: z
    .string()
    .min(10, { message: 'El título debe tener al menos 10 caracteres' }),
  tutorId: z.coerce.number().min(1, { message: 'Debe seleccionar un tutor' }),
  carrera: z.string(),
  modalidad: z.string(),
  fecha: z.string().min(1, { message: 'Debe seleccionar una fecha' }),
  descripcion: z.string().optional(),
  egresado: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>

export const tituladoSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' }),
  telefono: z
    .string()
    .min(7, { message: 'El teléfono debe tener al menos 7 dígitos' }),
  carrera: z.string(),
  proyectoId: z.coerce
    .number()
    .min(1, { message: 'Debe seleccionar un proyecto' }),
})

export type TituladoFormData = z.infer<typeof tituladoSchema>