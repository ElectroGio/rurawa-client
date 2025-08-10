import React from 'react'

import { RiZzzFill } from "react-icons/ri"


interface ActivityCardProps {
  profileImage: string
  name: string
  role: string
  status: string
  pending: number
  assigned: number
  completed: number
}

const HorizontalActivityCard: React.FC<ActivityCardProps> = ({
  profileImage,
  name,
  role,
  status,
  pending,
  assigned,
  completed,
}) => {


  return (
    <div className="flex items-center gap-4 px-4 py-2  rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className={`relative flex items-center gap-4 p-4 rounded-lg w-60 ${pending === 0 ? 'bg-yellow-100' : ''}`}>
        <img
          src={profileImage}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        {pending === 0 && (
          <div className="absolute top-2 right-2 text-yellow-600">
            <RiZzzFill className="text-xl" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black truncate w-32">{name}</span>
          <span className="text-sm text-gray-500">{role}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full items-center">
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded-lg text-sm font-bold text-center w-fit ${
              status === "Activo"
                ? "text-green-600 bg-white border border-green-600"
                : "text-red-600 bg-white border border-red-600"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-black">Pendientes</span>
          <span className="text-sm text-gray-500">{pending}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-black">Asignadas</span>
          <span className="text-sm text-gray-500">{assigned}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-black">Completadas</span>
          <span className="text-sm text-gray-500">{completed}</span>
        </div>
      </div>
    </div>
  )
}

export default HorizontalActivityCard