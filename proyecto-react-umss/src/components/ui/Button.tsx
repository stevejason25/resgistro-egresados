import React from 'react'

type ButtonVariant = 'primary' | 'danger' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const baseStyle =
    'flex items-center justify-center px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-[#0B4F9F] text-white hover:bg-[#0B4F9F]/90',
    danger: 'bg-[#C62828] text-white hover:bg-[#C62828]/90',
    secondary:
      'bg-white border border-gray-300 text-[#4B5563] hover:bg-gray-50',
  }

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}

export default Button