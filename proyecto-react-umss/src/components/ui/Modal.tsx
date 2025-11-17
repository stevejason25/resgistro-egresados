import React, { Fragment } from 'react'
import Button from './Button'
import { XIcon, AlertTriangleIcon } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  if (!isOpen) return null

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-[#1F2937]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 sm:h-10 sm:w-10">
              <AlertTriangleIcon
                className="h-5 w-5 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="ml-4 text-left">
              <p className="text-sm text-[#4B5563]">{children}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 bg-gray-50 p-4 rounded-b-lg">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default Modal