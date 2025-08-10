import React from 'react'
import { PiRocketDuotone } from 'react-icons/pi'

const ProjectCard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-3xl bg-white">
        <div className="flex flex-1 flex-col px-7 py-6">
          <div className="flex gap-6">
            <button className="size-12 bg-gray-100 p-2 rounded-md flex items-center justify-center" disabled>
              <PiRocketDuotone className="text-gray-600 text-3xl" />
            </button>
            <div>
              <span className="text-xs text-green-700">Ver lista de actividades pendientes</span>
              <div className="mt-1 text-base font-semibold">Esta semana</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
          </div>
        </div>
        <div className="h-auto w-px bg-gray-100" />
        <div className="flex flex-1 flex-col px-7 py-6">
          <div className="font-bold text-black">Datos de las actividades</div>
          <div className="mt-4 flex gap-9">
            <div>
              <div className="text-gray-400">Asignadas</div>
              <div className="mt-1 font-bold leading-6 text-black">588</div>
            </div>
            <div>
              <div className="text-gray-400">Pendientes</div>
              <div className="mt-1 font-bold leading-6 text-black">394</div>
            </div>
            <div>
              <div className="text-gray-400">Cumplidas</div>
              <div className="mt-1 font-bold leading-6 text-black">194</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard