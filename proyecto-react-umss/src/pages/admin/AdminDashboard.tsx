import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DownloadIcon, UploadIcon, UserPlusIcon, FileTextIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import { ProjectFormData } from '../../lib/validations'
import toast from 'react-hot-toast'
import ReportModal from '../../components/ui/ReportModal'

const AdminDashboard: React.FC = () => {
  const { projects, getProjects, addProject } = useProject()
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Estado para controlar el modal de reportes PDF
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  useEffect(() => {
    if (projects.length === 0) {
      getProjects()
    }
  }, [getProjects, projects.length])

  const stats = useMemo(() => {
    const informatica = projects.filter(
      (p) => p.carrera === 'Informática',
    ).length
    const sistemas = projects.filter((p) => p.carrera === 'Sistemas').length
    const proyectoGrado = projects.filter(
      (p) => p.modalidad === 'Proyecto de Grado',
    ).length
    const adscripcion = projects.filter(
      (p) => p.modalidad === 'Adscripción',
    ).length
    const trabajoDirigido = projects.filter(
      (p) => p.modalidad === 'Trabajo Dirigido',
    ).length
    const tesis = projects.filter((p) => p.modalidad === 'Tesis').length

    return {
      total: projects.length,
      informatica,
      sistemas,
      proyectoGrado,
      adscripcion,
      trabajoDirigido,
      tesis,
    }
  }, [projects])

  const recentProjects = projects.slice(0, 5)

  // --- LÓGICA DE EXPORTAR A CSV ---
  const handleExport = () => {
    if (projects.length === 0) {
      toast.error('No hay proyectos para exportar')
      return
    }

    const headers = [
      'Código',
      'Título',
      'Tutor ID',
      'Carrera',
      'Modalidad',
      'Fecha',
      'Descripción',
    ]

    const csvContent = projects.map((p) => {
      return [
        p.codigo,
        `"${p.titulo.replace(/"/g, '""')}"`, // Escapar comillas en el título
        p.tutorId,
        p.carrera,
        p.modalidad,
        p.fecha,
        `"${(p.descripcion || '').replace(/"/g, '""')}"`,
      ].join(',')
    })

    const csvString = [headers.join(','), ...csvContent].join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `proyectos_umss_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Exportación completada')
  }

  // --- LÓGICA DE IMPORTAR CSV ---
  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    
    reader.onload = async (event) => {
      const text = event.target?.result as string
      if (!text) return

      try {
        const lines = text.split('\n')
        const dataLines = lines.slice(1).filter((line) => line.trim() !== '')

        let importCount = 0

        for (const line of dataLines) {
          // CSV parse simple
          const [codigo, titulo, tutorId, carrera, modalidad, fecha, descripcion] = line.split(',')

          if (codigo && titulo) {
            const newProject: ProjectFormData = {
              codigo: codigo.trim(),
              titulo: titulo.replace(/"/g, '').trim(),
              tutorId: Number(tutorId) || 0,
              carrera: carrera?.trim() || 'Informática',
              modalidad: modalidad?.trim() || 'Proyecto de Grado',
              fecha: fecha?.trim() || new Date().toISOString().split('T')[0],
              descripcion: descripcion?.replace(/"/g, '').trim() || '',
            }
            
            await addProject(newProject)
            importCount++
          }
        }

        toast.success(`Se importaron ${importCount} proyectos exitosamente`)
      } catch (error) {
        console.error(error)
        toast.error('Error al procesar el archivo CSV')
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      {/* Modal de Reportes PDF */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      {/* Input oculto para CSV */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv" 
        className="hidden" 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Dashboard</h1>
          <p className="text-sm text-[#4B5563]">Resumen estadístico de la facultad</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Botón de Reportes (PDF) */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center px-4 py-2 bg-[#1F2937] text-white rounded-md hover:bg-[#374151] transition-colors shadow-sm"
          >
            <FileTextIcon className="w-4 h-4 mr-2" />
            Reportes
          </button>

          <Link
            to="/admin/titulados/create"
            className="flex items-center px-4 py-2 bg-[#0B4F9F] text-white rounded-md hover:bg-[#0B4F9F]/90 shadow-sm"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Registrar Titulado
          </Link>
          <button 
            onClick={handleImportClick}
            className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-[#4B5563]"
            title="Importar CSV"
          >
            <UploadIcon className="w-4 h-4" />
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-[#4B5563]"
            title="Exportar CSV"
          >
            <DownloadIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tarjetas Informativas (Sin Gráficos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1: Total Proyectos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F] border-l-4">
          <h3 className="text-sm font-medium text-[#4B5563]">TOTAL PROYECTOS</h3>
          <p className="text-3xl font-bold text-[#1F2937] mt-2">{stats.total}</p>
          <div className="mt-2 text-xs text-[#4B5563]">
            Todos los proyectos registrados
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#C62828]">
          <h3 className="text-sm font-medium text-[#4B5563]">Por Carrera</h3>
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

        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#0B4F9F]">
          <h3 className="text-sm font-medium text-[#4B5563]">Por Modalidad</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-xl font-bold text-[#1F2937]">
                {stats.proyectoGrado}
              </p>
              <div className="text-xs text-[#4B5563]">Proy. de Grado</div>
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

      {/* Tabla Recientes */}
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
  )
}

export default AdminDashboard;