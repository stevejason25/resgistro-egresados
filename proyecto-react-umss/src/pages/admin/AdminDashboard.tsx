import React from 'react'
import { } from 'recharts'
import { DownloadIcon, UploadIcon, UserPlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const monthlyData = [
  {
    month: 'Ene',
    count: 12,
  },
  {
    month: 'Feb',
    count: 19,
  },
  {
    month: 'Mar',
    count: 15,
  },
  {
    month: 'Abr',
    count: 8,
  },
  {
    month: 'May',
    count: 22,
  },
  {
    month: 'Jun',
    count: 14,
  },
  {
    month: 'Jul',
    count: 10,
  },
  {
    month: 'Ago',
    count: 7,
  },
  {
    month: 'Sep',
    count: 13,
  },
  {
    month: 'Oct',
    count: 18,
  },
  {
    month: 'Nov',
    count: 21,
  },
  {
    month: 'Dic',
    count: 9,
  },
]

const recentProjects = [
  {
    id: 1,
    codigo: 'UMSS-INF-2023-00123',
    titulo: 'Sistema de gestión académica para la facultad',
    persona: 'Juan Pérez',
    carrera: 'Informática',
    fecha: '2023-05-15',
    modalidad: 'Proyecto de Grado',
    telefono: '76543210',
    email: 'juan.perez@ejemplo.com',
  },
  {
    id: 2,
    codigo: 'UMSS-SIS-2023-00124',
    titulo: 'Aplicación móvil para seguimiento de egresados',
    persona: 'María López',
    carrera: 'Sistemas',
    fecha: '2023-05-10',
    modalidad: 'Adscripción',
    telefono: '76123456',
    email: 'maria.lopez@ejemplo.com',
  },
  {
    id: 3,
    codigo: 'UMSS-INF-2023-00125',
    titulo: 'Plataforma de aprendizaje en línea para estudiantes',
    persona: 'Carlos Rodríguez',
    carrera: 'Informática',
    fecha: '2023-05-05',
    modalidad: 'Trabajo Dirigido',
    telefono: '70123456',
    email: 'carlos.rodriguez@ejemplo.com',
  },
  {
    id: 4,
    codigo: 'UMSS-SIS-2023-00126',
    titulo: 'Sistema de control de inventario para laboratorios',
    persona: 'Ana Martínez',
    carrera: 'Sistemas',
    fecha: '2023-04-28',
    modalidad: 'Tesis',
    telefono: '71234567',
    email: 'ana.martinez@ejemplo.com',
  },
  {
    id: 5,
    codigo: 'UMSS-INF-2023-00127',
    titulo: 'Aplicación web para reserva de aulas',
    persona: 'Roberto Sánchez',
    carrera: 'Informática',
    fecha: '2023-04-22',
    modalidad: 'Proyecto de Grado',
    telefono: '72345678',
    email: 'roberto.sanchez@ejemplo.com',
  },
]

const stats = {
  total: 245,
  informatica: 156,
  sistemas: 89,
  proyectoGrado: 120,
  adscripcion: 45,
  trabajoDirigido: 65,
  tesis: 15,
}

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1F2937]">Dashboard</h1>
        <div className="flex space-x-3">
          <Link
            to="/admin/users/create"
            className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Registrar Egresado
          </Link>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <UploadIcon className="w-4 h-4 mr-2" />
            Importar
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F]">
          <h3 className="text-sm font-medium text-[#4B5563]">
            Total Proyectos
          </h3>
          <p className="text-3xl font-bold text-[#1F2937] mt-2">
            {stats.total}
          </p>
          <div className="mt-2 text-xs text-[#4B5563]">
            Todos los proyectos registrados
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#C62828]">
          <h3 className="text-sm font-medium text-[#4B5563]">Por Carrera</h3>
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                {stats.informatica}
              </p>
              <div className="text-xs text-[#4B5563]">Informática</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                {stats.sistemas}
              </p>
              <div className="text-xs text-[#4B5563]">Sistemas</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F]">
          <h3 className="text-sm font-medium text-[#4B5563]">Por Modalidad</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-xl font-bold text-[#1F2937]">
                {stats.proyectoGrado}
              </p>
              <div className="text-xs text-[#4B5563]">Proyecto de Grado</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">
                {stats.adscripcion}
              </p>
              <div className="text-xs text-[#4B5563]">Adscripción</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">
                {stats.trabajoDirigido}
              </p>
              <div className="text-xs text-[#4B5563]">Trabajo Dirigido</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">{stats.tesis}</p>
              <div className="text-xs text-[#4B5563]">Tesis</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#1F2937]">
            Proyectos Recientes
          </h3>
          <Link
            to="/admin/projects"
            className="text-sm text-[#0B4F9F] hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Código
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Título
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Persona
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Carrera
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#0B4F9F]">
                    <Link to={`/admin/projects/${project.id}`}>
                      {project.codigo}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#1F2937]">
                    {project.titulo}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">
                    {project.persona}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.carrera === 'Informática'
                          ? 'bg-[#0B4F9F]/10 text-[#0B4F9F]'
                          : 'bg-[#C62828]/10 text-[#C62828]'
                      }`}
                    >
                      {project.carrera}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">
                    {project.modalidad}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#4B5563]">
                    {new Date(project.fecha).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard