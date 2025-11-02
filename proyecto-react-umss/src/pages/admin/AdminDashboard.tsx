import React from 'react'
import { DownloadIcon, UploadIcon, UserPlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
// La variable monthlyData se mantiene eliminada
// Los datos de proyectos recientes y stats se mantienen iguales

const recentProjects = [
  {
    id: 1,
    codigo: '00001',
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
    codigo: '00002',
    titulo: 'Aplicación móvil para seguimiento de egresados',
    persona: 'María López',
    carrera: 'Sistemas',
    fecha: '2023-05-10',
    modalidad: 'Adscripción',
    telefono: '76123456',
    email: 'maria.lopez@ejemplo.com',
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
    <div className="space-y-8"> {/* Espaciado vertical ligeramente mayor */}
      {/* Cabecera y Botones de Acción */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1> {/* Título más grande y elegante */}
        <div className="flex space-x-3">
          <Link
            to="/admin/users/create"
            className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90 transition-colors"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Registrar Egresado
          </Link>
          {/* Botones de acción secundaria con estilo más limpio */}
          <button className="flex items-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <UploadIcon className="w-4 h-4 mr-2" />
            Importar
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>
      
      {/* Stats cards: Eliminamos el border-t-4 y aplicamos una sombra sutil */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#0B4F9F]"> {/* Sombra y borde izquierdo */}
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider"> {/* Texto más sutil y en mayúsculas */}
            Total Proyectos
          </h3>
          <p className="text-4xl font-extrabold text-[#1F2937] mt-1"> {/* Número más audaz */}
            {stats.total}
          </p>
          <div className="mt-2 text-xs text-gray-400">
            Todos los proyectos registrados
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#C62828]"> {/* Sombra y borde izquierdo */}
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Por Carrera</h3>
          <div className="flex justify-between items-end mt-1">
            <div>
              <p className="text-3xl font-extrabold text-[#1F2937]">
                {stats.informatica}
              </p>
              <div className="text-xs text-gray-400">Informática</div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#1F2937]">
                {stats.sistemas}
              </p>
              <div className="text-xs text-gray-400">Sistemas</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#0B4F9F]"> {/* Sombra y borde izquierdo */}
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Por Modalidad</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1"> {/* Espacio vertical reducido */}
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                {stats.proyectoGrado}
              </p>
              <div className="text-xs text-gray-400">Proyecto de Grado</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                {stats.adscripcion}
              </p>
              <div className="text-xs text-gray-400">Adscripción</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                {stats.trabajoDirigido}
              </p>
              <div className="text-xs text-gray-400">Trabajo Dirigido</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">{stats.tesis}</p>
              <div className="text-xs text-gray-400">Tesis</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Proyectos Recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md"> {/* Aplicamos sombra también a la tabla */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700"> {/* Título más prominente */}
            Proyectos Recientes
          </h3>
          <Link
            to="/admin/projects"
            className="text-sm font-medium text-[#0B4F9F] hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> {/* py-2 reducido, color de texto más sutil */}
                  Código
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Persona
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrera
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#0B4F9F]"> {/* py-2 reducido */}
                    <Link to={`/admin/projects/${project.id}`}>
                      {project.codigo}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800"> {/* Color de texto un poco más oscuro */}
                    {project.titulo}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {project.persona}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-xl text-xs font-medium ${project.carrera === 'Informática' ? 'bg-[#0B4F9F]/10 text-[#0B4F9F]' : 'bg-[#C62828]/10 text-[#C62828]'}`} // Aplicamos rounded-xl para un estilo "pill"
                    >
                      {project.carrera}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {project.modalidad}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
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