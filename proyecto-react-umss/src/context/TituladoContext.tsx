import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ITitulado } from '../types'
import { TituladoFormData } from '../lib/validations'

const mockTitulados: ITitulado[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '76543210',
    carrera: 'Informática',
    proyectoId: 1,
  },
  {
    id: 2,
    nombre: 'María López',
    email: 'maria.lopez@ejemplo.com',
    telefono: '76123456',
    carrera: 'Sistemas',
    proyectoId: 2,
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@ejemplo.com',
    telefono: '70123456',
    carrera: 'Informática',
    proyectoId: 3,
  },
]

const simulateApiCall = (duration: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, duration))

interface TituladoContextType {
  titulados: ITitulado[]
  isLoading: boolean
  getTitulados: () => Promise<void>
  addTitulado: (record: TituladoFormData) => Promise<void>
  deleteTitulado: (id: number) => Promise<void>
}

const TituladoContext = createContext<TituladoContextType | undefined>(
  undefined,
)

export const useTitulado = () => {
  const context = useContext(TituladoContext)
  if (!context) {
    throw new Error('useTitulado must be used within a TituladoProvider')
  }
  return context
}

export const TituladoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [titulados, setTitulados] = useState<ITitulado[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getTitulados = async () => {
    setIsLoading(true)
    await simulateApiCall()
    setTitulados(mockTitulados)
    setIsLoading(false)
  }

  const addTitulado = async (record: TituladoFormData) => {
    setIsLoading(true)
    await simulateApiCall()
    const newTitulado = { ...record, id: Date.now() }
    setTitulados((current) => [newTitulado, ...current])
    setIsLoading(false)
  }

  const deleteTitulado = async (id: number) => {
    setIsLoading(true)
    await simulateApiCall(300)
    setTitulados((current) => current.filter((u) => u.id !== id))
    setIsLoading(false)
  }

  return (
    <TituladoContext.Provider
      value={{
        titulados,
        isLoading,
        getTitulados,
        addTitulado,
        deleteTitulado,
      }}
    >
      {children}
    </TituladoContext.Provider>
  )
}