import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IProject } from '../types'
import { ProjectFormData } from '../lib/validations'

const mockProjects: IProject[] = [
  {
    id: 1,
    codigo: '2235',
    titulo: 'Sistema de gestión académica para la facultad',
    tutorId: 1,
    carrera: 'Informática',
    modalidad: 'Proyecto de Grado',
    fecha: '2023-05-15',
    egresado: 'Juan Pérez',
  },
  {
    id: 2,
    codigo: '21456',
    titulo: 'Aplicación móvil para seguimiento de egresados',
    tutorId: 2,
    carrera: 'Sistemas',
    modalidad: 'Adscripción',
    fecha: '2023-05-10',
    egresado: 'María López',
  },
  {
    id: 3,
    codigo: '10045',
    titulo: 'Plataforma de aprendizaje en línea para estudiantes',
    tutorId: 3,
    carrera: 'Informática',
    modalidad: 'Trabajo Dirigido',
    fecha: '2023-05-05',
    egresado: 'Carlos Rodríguez',
  },
]

const simulateApiCall = (duration: number = 600) =>
  new Promise((resolve) => setTimeout(resolve, duration))

interface ProjectContextType {
  projects: IProject[]
  isLoading: boolean
  getProjects: () => Promise<void>
  addProject: (project: ProjectFormData) => Promise<void>
  deleteProject: (id: number) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getProjects = async () => {
    setIsLoading(true)
    await simulateApiCall()
    setProjects(mockProjects)
    setIsLoading(false)
  }

  const addProject = async (project: ProjectFormData) => {
    setIsLoading(true)
    await simulateApiCall()
    const newProject = { ...project, id: Date.now() }
    setProjects((current) => [newProject, ...current])
    setIsLoading(false)
  }

  const deleteProject = async (id: number) => {
    setIsLoading(true)
    await simulateApiCall(300)
    setProjects((current) => current.filter((p) => p.id !== id))
    setIsLoading(false)
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        getProjects,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}