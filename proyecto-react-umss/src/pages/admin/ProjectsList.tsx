import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
} from 'lucide-react'
// Su Hook y Contexto Original
import { useProject } from '../../context/ProjectContext' 
// Su Componente Modal Original
import Modal from '../../components/ui/Modal' 
// Su Librería de Notificaciones Original
import toast from 'react-hot-toast' 

// --- FUNCIÓN PARA GENERAR LAS OPCIONES DE SEMESTRE ---
// Genera las opciones como SEMESTRE 1/2023, SEMESTRE 2/2023, hasta 2025.
const generateSemesterOptions = () => {
    const options = [];
    const maxYear = 2025; 
    const minYear = 2023;

    for (let year = minYear; year <= maxYear; year++) {
        options.push(`SEMESTRE 1/${year}`);
        options.push(`SEMESTRE 2/${year}`);
    }
    return options;
};

const SEMESTER_OPTIONS = generateSemesterOptions();
// ----------------------------------------------------


const ProjectsList: React.FC = () => {
  // El hook useProject trae los datos del Contexto original
  const { projects, isLoading, getProjects, deleteProject } = useProject()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [carreraFilter, setCarreraFilter] = useState('')
  const [modalidadFilter, setModalidadFilter] = useState('')
  // --- Estado del filtro de semestre ---
  const [semestreFilter, setSemestreFilter] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)

  useEffect(() => {
    getProjects()
  }, [])

  // --- Lógica de filtrado actualizada (incluye semestre) ---
  const filteredProjects = projects.filter((project) => {
    const normalizedQuery = searchQuery.toLowerCase();

    const matchesSearch =
      project.titulo.toLowerCase().includes(normalizedQuery) ||
      project.codigo.toLowerCase().includes(normalizedQuery) ||
      (project.egresado &&
        project.egresado.toLowerCase().includes(normalizedQuery))
    const matchesCarrera =
      carreraFilter === '' || project.carrera === carreraFilter
    const matchesModalidad =
      modalidadFilter === '' || project.modalidad === modalidadFilter
    
    // Lógica para el filtro de semestre basada en la fecha
    const matchesSemestre = () => {
        if (semestreFilter === '') {
            return true; 
        }
        
        try {
            // Convierte la fecha del proyecto (se asume formato válido)
            const projectDate = new Date(project.fecha);
            if (isNaN(projectDate.getTime())) return false; 
            
            // Obtiene el mes (1=Enero, 12=Diciembre)
            const projectMonth = projectDate.getMonth() + 1; 
            const projectYear = projectDate.getFullYear();
            
            // Determina el semestre del proyecto
            const projectSemestre = projectMonth >= 1 && projectMonth <= 6 ? 1 : 2;

            // Parsea el valor seleccionado: ej. "SEMESTRE 1/2025"
            const parts = semestreFilter.split('/');
            if (parts.length !== 2) return false; 
            
            const selectedSemestreStr = parts[0].replace('SEMESTRE ', '').trim();
            const selectedSemestre = parseInt(selectedSemestreStr, 10);
            const selectedYear = parseInt(parts[1], 10);

            // Compara año y semestre
            return (
                projectYear === selectedYear &&
                projectSemestre === selectedSemestre
            );
        } catch (e) {
            console.error("Error al parsear la fecha del proyecto en el filtro:", e);
            return false;
        }
    };

    // Un proyecto pasa el filtro si cumple TODAS las condiciones
    return matchesSearch && matchesCarrera && matchesModalidad && matchesSemestre()
  })
// --- FIN LÓGICA DE FILTRADO ---


  const handleDeleteClick = (id: number) => {
    setProjectToDelete(id)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      try {
        await deleteProject(projectToDelete)
        toast.success('Proyecto eliminado correctamente')
      } catch (error) {
        toast.error('Error al eliminar el proyecto')
      } finally {
        setModalOpen(false)
        setProjectToDelete(null)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Proyecto"
      >
        ¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se
        puede deshacer.
      </Modal>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Gestión de Proyectos
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Registra y gestiona todos los proyectos
          </p>
        </div>
        <Link
          to="/admin/projects/create"
          className="flex items-center px-4 py-2 bg-[#C62828] text-white rounded-md hover:bg-[#C62828]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Crear Proyecto
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              value={carreraFilter}
              onChange={(e) => setCarreraFilter(e.target.value)}
            >
              <option value="">Todas las carreras</option>
              <option value="Informática">Informática</option>
              <option value="Sistemas">Sistemas</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              value={modalidadFilter}
              onChange={(e) => setModalidadFilter(e.target.value)}
            >
              <option value="">Todas las modalidades</option>
              <option value="Proyecto de Grado">Proyecto de Grado</option>
              <option value="Adscripción">Adscripción</option>
              <option value="Trabajo Dirigido">Trabajo Dirigido</option>
              <option value="Tesis">Tesis</option>
            </select>
            
            {/* Filtro de Semestre */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]/50 focus:border-[#0B4F9F]"
              value={semestreFilter} 
              onChange={(e) => setSemestreFilter(e.target.value)} 
            >
              <option value="">Todos los semestres</option>
                {SEMESTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
          </div>
        </div>

        {isLoading && projects.length === 0 ? (
          <div className="text-center py-10">Cargando proyectos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Título del Proyecto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Tutor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Modalidad
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Titulados
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#C62828]">
                      {project.codigo}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#1F2937] font-medium">
                      {project.titulo}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#4B5563]">
                      {/* Aquí necesitarás lógica para buscar el nombre del tutor por project.tutorId */}
                      Tutor ID: {project.tutorId}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#4B5563]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0B4F9F]/10 text-[#0B4F9F]">
                        {project.modalidad}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#4B5563]">
                      {new Date(project.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#4B5563]">
                      {project.egresado || (
                        <span className="text-gray-400 italic">
                          Sin asignar
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3 inline-block"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="text-[#0B4F9F] hover:text-[#0B4F9F]/70 mr-3 inline-block"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(project.id)}
                        className="text-[#C62828] hover:text-[#C62828]/70 inline-block"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsList