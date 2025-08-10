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

const VerticalActivityCard: React.FC<ActivityCardProps> = ({
  profileImage,
  name,
  role,
  status,
  pending,
  assigned,
  completed,
}) => {

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className={`flex flex-col items-center gap-1 p-3 rounded-2xl w-full ${pending === 0 ? 'bg-yellow-100' : ''}`}>
      <div className="flex relative pt-2">
          <img
            src={profileImage}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          {pending === 0 && (
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-yellow-600 pt-2">
              <RiZzzFill className="text-xl" />
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-black">{name}</span>
        <span className="text-sm text-black">{role}</span>
        <span
          className={`px-2 py-1 rounded-lg text-sm font-bold text-center w-fit ${
            status === "Activo"
              ? "text-green-600 border border-green-600"
              : "text-red-600 border border-red-600"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full items-center mb-2">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-black">{pending}</span>
          <span className="text-xs text-gray-500">Pendientes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-black">{assigned}</span>
          <span className="text-xs text-gray-500">Asignadas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-black">{completed}</span>
          <span className="text-xs text-gray-500">Completadas</span>
        </div>
      </div>

    </div>
  )
}

export default VerticalActivityCard