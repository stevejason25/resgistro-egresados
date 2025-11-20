import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ITutor } from '../types'
import { TutorFormData } from '../lib/validations'

const mockTutors: ITutor[] = [
  {
    id: 1,
    nombre: 'Dr. Roberto García',
    email: 'roberto.garcia@umss.edu.bo',
    telefono: '70111222',
    profesion: 'Ingeniero de Sistemas - PhD en Computación',
    proyectos: 12,
  },
  {
    id: 2,
    nombre: 'Ing. María Fernández',
    email: 'maria.fernandez@umss.edu.bo',
    telefono: '70222333',
    profesion: 'Ingeniera Informática - MSc',
    proyectos: 8,
  },
  {
    id: 3,
    nombre: 'Dr. Carlos Mendoza',
    email: 'carlos.mendoza@umss.edu.bo',
    telefono: '70333444',
    profesion: 'Ingeniero de Sistemas - PhD',
    proyectos: 15,
  },
]

const simulateApiCall = (duration: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, duration))

interface TutorContextType {
  tutors: ITutor[]
  isLoading: boolean
  getTutors: () => Promise<void>
  addTutor: (tutor: TutorFormData) => Promise<void>
  deleteTutor: (id: number) => Promise<void>
}

const TutorContext = createContext<TutorContextType | undefined>(undefined)

export const useTutor = () => {
  const context = useContext(TutorContext)
  if (!context) {
    throw new Error('useTutor must be used within a TutorProvider')
  }
  return context
}

export const TutorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tutors, setTutors] = useState<ITutor[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getTutors = async () => {
    setIsLoading(true)
    await simulateApiCall()
    setTutors(mockTutors)
    setIsLoading(false)
  }

  const addTutor = async (tutor: TutorFormData) => {
    setIsLoading(true)
    await simulateApiCall()
    const newTutor = { ...tutor, id: Date.now(), proyectos: 0 }
    setTutors((current) => [newTutor, ...current])
    setIsLoading(false)
  }

  const deleteTutor = async (id: number) => {
    setIsLoading(true)
    await simulateApiCall(300)
    setTutors((current) => current.filter((t) => t.id !== id))
    setIsLoading(false)
  }

  return (
    <TutorContext.Provider
      value={{
        tutors,
        isLoading,
        getTutors,
        addTutor,
        deleteTutor,
      }}
    >
      {children}
    </TutorContext.Provider>
  )
}