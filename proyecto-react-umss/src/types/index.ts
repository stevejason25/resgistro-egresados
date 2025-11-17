export interface IUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface IProject {
  id: number
  codigo: string
  titulo: string
  tutorId: number
  carrera: string
  modalidad: string
  fecha: string
  descripcion?: string
  egresado?: string
}

export interface ITutor {
  id: number
  nombre: string
  email: string
  telefono: string
  profesion: string
  proyectos: number
}

export interface IUserRecord {
  id: number
  nombre: string
  email: string
  telefono: string
  carrera: string
  proyectoId: number
}