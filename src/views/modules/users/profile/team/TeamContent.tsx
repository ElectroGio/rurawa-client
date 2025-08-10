import React from 'react'
import { Avatar } from '@/components/ui'

const teamMembers = [
  {
    name: 'Juan Pérez',
    position: 'Ingeniero Agrícola',
    status: 'Activo',
    image: 'https://thispersondoesnotexist.com/'
  },
  {
    name: 'María González',
    position: 'Supervisora de Campo',
    status: 'Activo',
    image: 'https://thispersondoesnotexist.com/'
  },
  {
    name: 'Carlos Rodríguez',
    position: 'Técnico Agrícola',
    status: 'Inactivo',
    image: 'https://thispersondoesnotexist.com/'
  },
  {
    name: 'Ana Martínez',
    position: 'Coordinadora',
    status: 'Activo',
    image: 'https://thispersondoesnotexist.com/'
  },
  {
    name: 'Luis Morales',
    position: 'Analista de Datos',
    status: 'Inactivo',
    image: 'https://thispersondoesnotexist.com/'
  }
]

const TeamContent = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {teamMembers.map((member) => (
        <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-md">
          <Avatar 
            src={member.image} 
            size={60}
          />
          <div className="mt-2 font-semibold text-sm text-gray-800">
            {member.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {member.position}
          </div>
          <button
            disabled
            className={`mt-2 px-3 py-0.5 rounded-full text-[10px] font-medium ${
              member.status === 'Activo'
                ? 'border border-green-500 text-green-500'
                : 'border border-red-500 text-red-500'
            }`}
          >
            {member.status}
          </button>
        </div>
      ))}
    </div>
  )
}

export default TeamContent