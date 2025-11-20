import { useState } from 'react'

export const useForm = <T extends Object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData(initialState)
  }

  return {
    formData,
    handleChange,
    resetForm,
    ...formData,
  }
}