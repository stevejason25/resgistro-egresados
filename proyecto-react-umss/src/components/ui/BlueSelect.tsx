import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
}

const BlueSelect: React.FC<SelectProps> = ({
  label,
  id,
  children,
  error,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#4B5563] mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        {...props}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
            : 'border-gray-300 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]'
        }`}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default BlueSelect