import React from 'react'

const projectData = [
  {
    name: 'Seguimiento cultivos de maíz',
    assigned: '15',
    start: 'Sep 13, 2023',
    end: 'Sep 16, 2023',
    status: 'Pendiente'
  },
  {
    name: 'Verificar y registrar horarios de riego',
    assigned: '14',
    start: 'Sep 4, 2023',
    end: 'Sep 5, 2023',
    status: 'Aprobado'
  },
  {
    name: 'Aplicación de cuestionario de satisfacción',
    assigned: '20',
    start: 'Sep 1, 2023',
    end: 'Sep 2, 2023',
    status: 'Aprobado'
  }
]

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }
  return text
}

const ProjectStatus = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-black text-lg font-semibold">
          Proyectos
      </div>
      {projectData.map((project, index) => (
        <div key={index} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md">
          <div className="flex flex-col items-start w-1/3">
            <div className="text-gray-500">Proyectos</div>
            <div className="flex items-center mt-1">
              <div className={`w-3 h-3 rounded-full ${project.status === 'Pendiente' ? 'bg-yellow-500' : 'bg-green-500'}`} />
              <div className="ml-2 text-black">{truncateText(project.name, 25)}</div>
            </div>
          </div>
          <div className="flex flex-col items-start w-1/6">
            <div className="text-gray-500">Asignado</div>
            <div className="text-black mt-1">{project.assigned}</div>
          </div>
          <div className="flex flex-col items-start w-1/6">
            <div className="text-gray-500">Inicio</div>
            <div className="text-black mt-1">{project.start}</div>
          </div>
          <div className="flex flex-col items-start w-1/6">
            <div className="text-gray-500">Final</div>
            <div className="text-black mt-1">{project.end}</div>
          </div>
          <button
            disabled
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              project.status === 'Pendiente'
                ? 'bg-yellow-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {project.status}
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProjectStatus