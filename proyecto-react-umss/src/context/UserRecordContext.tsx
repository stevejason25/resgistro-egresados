import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IUserRecord } from '../types'
import { UserRecordFormData } from '../lib/validations'

const mockUserRecords: IUserRecord[] = [
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

interface UserRecordContextType {
  userRecords: IUserRecord[]
  isLoading: boolean
  getUserRecords: () => Promise<void>
  addUserRecord: (record: UserRecordFormData) => Promise<void>
  deleteUserRecord: (id: number) => Promise<void>
}

const UserRecordContext = createContext<UserRecordContextType | undefined>(
  undefined,
)

export const useUserRecord = () => {
  const context = useContext(UserRecordContext)
  if (!context) {
    throw new Error('useUserRecord must be used within a UserRecordProvider')
  }
  return context
}

export const UserRecordProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userRecords, setUserRecords] = useState<IUserRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserRecords = async () => {
    setIsLoading(true)
    await simulateApiCall()
    setUserRecords(mockUserRecords)
    setIsLoading(false)
  }

  const addUserRecord = async (record: UserRecordFormData) => {
    setIsLoading(true)
    await simulateApiCall()
    const newUserRecord = { ...record, id: Date.now() }
    setUserRecords((current) => [newUserRecord, ...current])
    setIsLoading(false)
  }

  const deleteUserRecord = async (id: number) => {
    setIsLoading(true)
    await simulateApiCall(300)
    setUserRecords((current) => current.filter((u) => u.id !== id))
    setIsLoading(false)
  }

  return (
    <UserRecordContext.Provider
      value={{
        userRecords,
        isLoading,
        getUserRecords,
        addUserRecord,
        deleteUserRecord,
      }}
    >
      {children}
    </UserRecordContext.Provider>
  )
}