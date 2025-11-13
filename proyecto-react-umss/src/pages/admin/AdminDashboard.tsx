import React from 'react';
import { DownloadIcon, UploadIcon, UserPlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------
// DATOS ESTÁTICOS (Mock Data - Deberán ser reemplazados por la API)
// ----------------------------------------------------------------

const recentProjects = [
  {
    id: 1,
    codigo: 'UMSS-INF-2023-00123',
    titulo: 'Sistema de gestión académica para la facultad',
    persona: 'Juan Pérez',
    carrera: 'Ingeniería Informática',
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
    carrera: 'Ingeniería de Sistemas',
    fecha: '2023-05-10',
    modalidad: 'Adscripción',
    telefono: '76123456',
    email: 'maria.lopez@ejemplo.com',
  },
  
];

const stats = {
  total: 245,
  informatica: 156,
  sistemas: 89,
  proyectoGrado: 120,
  adscripcion: 45,
  trabajoDirigido: 65,
  tesis: 15,
};

// ----------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------

const AdminDashboard: React.FC = () => {
  // Nota: La sección del Navbar ("Dashboard" y "Cerrar Sesión") generalmente se renderiza
  // en un componente Layout, pero se incluyen los botones de acción principales aquí.
  
  return (
    <div className="space-y-6">
      {/* Encabezado y Acciones */}
      <div className="flex justify-between items-center">
        {/* Aquí la captura parece mostrar el icono de UserPlusIcon en el botón */}
        <h1 className="text-2xl font-bold text-[#1F2937]">Dashboard</h1>
        <div className="flex space-x-3">
          <Link
            to="/admin/egresados/register" // Ruta sugerida para el registro
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

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1: Total Proyectos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F] border-l-4">
          <h3 className="text-sm font-medium text-[#4B5563]">TOTAL PROYECTOS</h3>
          <p className="text-3xl font-bold text-[#1F2937] mt-2">{stats.total}</p>
          <div className="mt-2 text-xs text-[#4B5563]">
            Todos los proyectos registrados
          </div>
        </div>
        
        {/* Tarjeta 2: Por Carrera */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#C62828] border-l-4">
          <h3 className="text-sm font-medium text-[#4B5563]">POR CARRERA</h3>
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">{stats.informatica}</p>
              <div className="text-xs text-[#4B5563]">Informática</div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1F2937]">{stats.sistemas}</p>
              <div className="text-xs text-[#4B5563]">Sistemas</div>
            </div>
          </div>
        </div>
        
        {/* Tarjeta 3: Por Modalidad */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F] border-l-4">
          <h3 className="text-sm font-medium text-[#4B5563]">POR MODALIDAD</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-xl font-bold text-[#1F2937]">{stats.proyectoGrado}</p>
              <div className="text-xs text-[#4B5563]">Proyecto de Grado</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">{stats.adscripcion}</p>
              <div className="text-xs text-[#4B5563]">Adscripción</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">{stats.trabajoDirigido}</p>
              <div className="text-xs text-[#4B5563]">Trabajo Dirigido</div>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1F2937]">{stats.tesis}</p>
              <div className="text-xs text-[#4B5563]">Tesis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Proyectos Recientes (Tabla) */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#1F2937]">Proyectos Recientes</h3>
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
                        project.carrera.includes('Informática') // Usamos includes para manejar el texto largo
                          ? 'bg-[#0B4F9F]/10 text-[#0B4F9F]' // Azul para Informática
                          : 'bg-[#C62828]/10 text-[#C62828]' // Rojo para Sistemas
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
  );
};

export default AdminDashboard;