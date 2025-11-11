import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  UserIcon,
  ShieldIcon,
  ArrowRightIcon,
  AtSignIcon,
  LockIcon,
  ChevronLeftIcon,
} from 'lucide-react'
const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'admin' | 'user'>('selection')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent, role: 'admin' | 'user') => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      // Use the appropriate email format based on role
      const loginEmail =
        role === 'admin'
          ? email.includes('@')
            ? email
            : `${email}@admin.umss.edu`
          : email.includes('@')
            ? email
            : `${email}@user.umss.edu`
      await login(loginEmail, password)
      navigate(role === 'admin' ? '/admin' : '/user')
    } catch (err) {
      setError('Credenciales inválidas. Por favor intente de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }
  const goBack = () => {
    setStep('selection')
    setEmail('')
    setPassword('')
    setError('')
  }
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Logo and title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937]">
            UMSS - Sistema de Proyectos
          </h1>
          <p className="text-[#4B5563] mt-2">Universidad Mayor de San Simón</p>
        </div>
        {/* Role selection step */}
        {step === 'selection' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center mb-4">
              Seleccione su tipo de acceso
            </h2>
            <button
              onClick={() => setStep('admin')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-[#0B4F9F]/5 hover:border-[#0B4F9F] transition-colors group"
            >
              <div className="flex items-center">
                <div className="bg-[#0B4F9F]/10 p-2 rounded-full">
                  <ShieldIcon className="h-6 w-6 text-[#0B4F9F]" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-[#1F2937]">Administrador</h3>
                  <p className="text-sm text-[#4B5563]">
                    Acceso completo al sistema
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#0B4F9F] transition-colors" />
            </button>
            <button
              onClick={() => setStep('user')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-[#0B4F9F]/5hover:border-[#0B4F9F] transition-colors group"
            >
              <div className="flex items-center">
                <div className="bg-[#0B4F9F]/10 p-2 rounded-full">
                  <UserIcon className="h-6 w-6 text-[#0B4F9F]" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-[#1F2937]">
                    Usuario / Titulado
                  </h3>
                  <p className="text-sm text-[#4B5563]">Acceso a su proyecto</p>
                </div>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#0B4F9F] transition-colors" />
            </button>
            <div className="pt-4 text-center">
              <Link to="/" className="text-sm text-[#0B4F9F] hover:underline">
                Volver a la página principal
              </Link>
            </div>
          </div>
        )}
        {/* Admin login form */}
        {step === 'admin' && (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={goBack}
                className="flex items-center text-[#4B5563] hover:text-[#0B4F9F]"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                <span>Volver</span>
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 pr-8">
                Acceso Administrador
              </h2>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-[#C62828] text-[#C62828] rounded-md text-sm">
                {error}
              </div>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, 'admin')}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-[#4B5563] mb-1"
                >
                  Usuario o Correo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSignIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="admin-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                    placeholder="admin o admin@umss.edu"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-[#4B5563] mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Para esta demo, cualquier contraseña funcionará
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90 flex justify-center items-center disabled:opacity-70"
                >
                  {isLoading
                    ? 'Iniciando sesión...'
                    : 'Iniciar Sesión como Administrador'}
                </button>
              </div>
            </form>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex">
                <ShieldIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  El acceso como administrador permite gestionar todos los
                  proyectos, usuarios y configuraciones del sistema.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* User login form */}
        {step === 'user' && (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={goBack}
                className="flex items-center text-[#4B5563] hover:text-[#0B4F9F]"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                <span>Volver</span>
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 pr-8">
                Acceso Usuario
              </h2>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-[#C62828] text-[#C62828] rounded-md text-sm">
                {error}
              </div>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, 'user')}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="user-email"
                  className="block text-sm font-medium text-[#4B5563] mb-1"
                >
                  Usuario o Correo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSignIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="user-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
                    placeholder="usuario o usuario@umss.edu"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="user-password"
                  className="block text-sm font-medium text-[#4B5563] mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="user-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/5Compare50 focus:border-[#0B4F9F]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Para esta demo, cualquier contraseña funcionará
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90 flex justify-center items-center disabled:opacity-70"
                >
                  {isLoading
                    ? 'Iniciando sesión...'
                    : 'Iniciar Sesión como Usuario'}
                </button>
              </div>
            </form>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex">
                <UserIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  El acceso como usuario permite consultar y gestionar
                  únicamente su propio proyecto de titulación.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default LoginPage