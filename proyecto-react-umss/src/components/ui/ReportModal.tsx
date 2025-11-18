import React, { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DownloadIcon, XIcon, FileTextIcon, CalendarIcon } from 'lucide-react'
import { useProject } from '../../context/ProjectContext'
import { useTitulado } from '../../context/TituladoContext'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import toast from 'react-hot-toast'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const { projects } = useProject()
  const { titulados } = useTitulado()
  
  const [reportType, setReportType] = useState<'general' | 'individual'>('general')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTituladoId, setSelectedTituladoId] = useState('')

  const generateGeneralReport = () => {
    if (!startDate || !endDate) {
      toast.error('Seleccione un rango de fechas')
      return
    }

    const filteredProjects = projects.filter((p) => {
      return p.fecha >= startDate && p.fecha <= endDate
    })

    if (filteredProjects.length === 0) {
      toast.error('No se encontraron proyectos en ese rango')
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.setTextColor(11, 79, 159)
    doc.text('Universidad Mayor de San Simón', 14, 22)
    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text('Reporte General de Proyectos y Titulados', 14, 32)
    
    doc.setFontSize(10)
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 40)
    doc.text(`Período: ${startDate} al ${endDate}`, 14, 46)

    const tableData = filteredProjects.map(p => [
      p.codigo,
      p.titulo,
      p.carrera,
      p.modalidad,
      new Date(p.fecha).toLocaleDateString()
    ])

    autoTable(doc, {
      startY: 55,
      head: [['Código', 'Título', 'Carrera', 'Modalidad', 'Fecha']],
      body: tableData,
      headStyles: { fillColor: [11, 79, 159] },
    })

    doc.save(`reporte_general_${startDate}_${endDate}.pdf`)
    toast.success('Reporte general descargado')
    onClose()
  }

  const generateIndividualReport = () => {
    if (!selectedTituladoId) {
      toast.error('Seleccione un titulado')
      return
    }

    const titulado = titulados.find(t => t.id === Number(selectedTituladoId))
    if (!titulado) return

    const project = projects.find(p => p.id === titulado.proyectoId)
    
    const doc = new jsPDF()

    // Encabezado Oficial
    doc.setDrawColor(11, 79, 159)
    doc.setLineWidth(1)
    doc.line(14, 15, 196, 15)
    
    doc.setFontSize(22)
    doc.setTextColor(11, 79, 159)
    doc.text('UMSS', 105, 25, { align: 'center' })
    
    doc.setFontSize(16)
    doc.setTextColor(0)
    doc.text('ACTA DE CONFORMIDAD DE PROYECTO', 105, 40, { align: 'center' })

    // Cuerpo del Documento
    doc.setFontSize(12)
    doc.text(`Cochabamba, ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 60)

    const bodyText = `
      Por la presente se certifica que el universitario(a) ${titulado.nombre}, 
      con matrícula correspondiente a la carrera de ${titulado.carrera}, 
      ha completado satisfactoriamente los requisitos académicos.

      Detalles del Proyecto de Titulación:
    `
    doc.text(bodyText, 14, 70)

    // Tabla de detalles
    autoTable(doc, {
      startY: 100,
      body: [
        ['Título del Proyecto', project?.titulo || 'N/A'],
        ['Código de Registro', project?.codigo || 'N/A'],
        ['Modalidad', project?.modalidad || 'N/A'],
        ['Fecha de Defensa', project?.fecha || 'N/A'],
        ['Tutor Asignado', `ID: ${project?.tutorId}`], 
      ],
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } }
    })

    // Firmas
    doc.line(30, 240, 90, 240) 
    doc.text('Firma Director de Carrera', 60, 245, { align: 'center' })

    doc.line(120, 240, 180, 240) 
    doc.text('Firma Decano', 150, 245, { align: 'center' })

    doc.save(`acta_titulacion_${titulado.nombre.replace(/\s+/g, '_')}.pdf`)
    toast.success('Acta individual descargada')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-[#F5F7FA]">
          <h3 className="text-lg font-medium text-[#1F2937] flex items-center">
            <FileTextIcon className="w-5 h-5 mr-2 text-[#0B4F9F]" />
            Generar Reporte Oficial
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Selector de Tipo */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setReportType('general')}
              className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                reportType === 'general' 
                ? 'bg-[#0B4F9F]/10 border-[#0B4F9F] text-[#0B4F9F]' 
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Reporte por Fechas
            </button>
            <button
              onClick={() => setReportType('individual')}
              className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                reportType === 'individual' 
                ? 'bg-[#0B4F9F]/10 border-[#0B4F9F] text-[#0B4F9F]' 
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Acta Individual
            </button>
          </div>

          {reportType === 'general' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 mb-2">
                Genera un listado de todos los proyectos defendidos en un rango de fechas.
              </div>
              <Input 
                label="Fecha Inicio" 
                type="date" 
                id="startDate" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
              <Input 
                label="Fecha Fin" 
                type="date" 
                id="endDate" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 mb-2">
                Genera el Acta de Conformidad oficial para un titulado específico.
              </div>
              <Select
                label="Seleccionar Titulado"
                id="tituladoSelect"
                value={selectedTituladoId}
                onChange={(e) => setSelectedTituladoId(e.target.value)}
              >
                <option value="">Buscar estudiante...</option>
                {titulados.map(t => (
                  <option key={t.id} value={t.id}>{t.nombre} - {t.carrera}</option>
                ))}
              </Select>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button 
              onClick={reportType === 'general' ? generateGeneralReport : generateIndividualReport}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportModal