import React from 'react'
import { FaCalendar, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { Avatar, Tag } from '@/components/ui'

const projectsData = [
  {
    code: 'PN0001290',
    name: 'Seguimiento cultivos de maíz',
    date: 'Creado Sep 14, 2023',
    priority: 'Alta',
    activities: {
      assigned: 34,
      completed: 13 
    }
  },
  {
    code: 'PN0001265',
    name: 'Renovación de café',
    date: 'Creado Sep 12, 2023',
    priority: 'Alta',
    activities: {
      assigned: 34,
      completed: 10
    }
  },
  {
    code: 'PN0001221',
    name: 'Verificar y registrar horarios de riego',
    date: 'Creado Sep 10, 2023',
    priority: 'Media',
    activities: {
      assigned: 200,
      completed: 96
    }
  },
  {
    code: 'PN0001290',
    name: 'Aplicación de cuestionario de satisfacción',
    date: 'Creado Sep 8, 2023',
    priority: 'Baja',
    activities: {
      assigned: 200,
      completed: 96
    }
  }
]

const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return {
          icon: <FaArrowUp className="mr-1" />,
          className: 'bg-red-100 text-red-600'
        }
      case 'Media':
        return {
          icon: null,
          className: 'bg-yellow-100 text-yellow-600'
        }
      case 'Baja':
        return {
          icon: <FaArrowDown className="mr-1" />,
          className: 'bg-blue-100 text-blue-600'
        }
      default:
        return {
          icon: null,
          className: 'bg-gray-100 text-gray-600'
        }
    }
  }

const AllProjects = () => {
  return (
    <ul className="flex flex-col gap-4">
      {projectsData.map((project) => (
        <li key={project.code}>
          <article className="flex rounded-3xl bg-white">
            <div className="flex flex-1 flex-col px-7 py-6">
              <div className="flex gap-6">
                <button className="size-12 bg-gray-300 p-2 rounded-md flex items-center justify-center" disabled>
                </button>
                <div>
                  <span className="text-xs text-gray-400">
                    {project.code}
                  </span>
                  <div className="mt-1 text-base font-semibold text-black">
                    {project.name}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <FaCalendar /> {project.date}
                </div>
                <Tag className={`text-xs flex items-center ${getPriorityStyles(project.priority).className}`}>
                {getPriorityStyles(project.priority).icon}
                {project.priority}
              </Tag>
              </div>
            </div>
            <div className="h-auto w-px bg-gray-100" />
            <div className="flex flex-1 flex-col px-7 py-6">
              <div className="font-bold text-black">Actividades</div>
              <div className="mt-4 flex gap-9">
                <div>
                  <div className="text-black text-gray-400">Asignadas</div>
                  <div className="mt-1 font-bold leading-6 text-black">{project.activities.assigned}</div>
                </div>
                <div>
                  <div className="text-black text-gray-400">Cumplidas</div>
                  <div className="mt-1 font-bold leading-6 text-black">{project.activities.completed}</div>
                </div>
                <div>
                  <div className="text-black text-gray-400">Encargados</div>
                  <div className="mt-1">
                    <Avatar.Group
                      chained
                      maxCount={3}
                      omittedAvatarProps={{
                        shape: 'circle',
                        size: 24,
                      }}
                    >
                      <Avatar src="https://thispersondoesnotexist.com/" size={24}>NL</Avatar>
                      <Avatar src="https://thispersondoesnotexist.com/" size={24}>AS</Avatar>
                      <Avatar src="https://thispersondoesnotexist.com/" size={24}>WD</Avatar>
                    </Avatar.Group>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default AllProjects