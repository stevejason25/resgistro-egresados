import React from 'react'
import { useParams } from 'react-router-dom'
const ProjectDetail: React.FC = () => {
  const { id } = useParams()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1F2937]">
        Detalle del Proyecto
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p>Información detallada del proyecto #{id} irá aquí</p>
      </div>
    </div>
  )
}
export default ProjectDetail