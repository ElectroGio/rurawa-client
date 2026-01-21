import React from 'react'
import { HiLocationMarker, HiCalendar } from 'react-icons/hi'
import { PiNotePencil } from "react-icons/pi";
import UserAvatar from '@/components/custom/UserAvatar/UserAvatar'
import type { User } from '@/@types/user'

interface SidebarContainerProps {
  user: User
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ user }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const calculateAge = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="bg-white p-4  rounded-3xl shadow-md">

      <div className="flex justify-between items-center">
        <UserAvatar 
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          profileImage={user.profileImage}
          size={80}
        />
        <button className="bg-gray-100 p-2 rounded-full">
          <PiNotePencil className="text-gray-600 size-5" />
        </button>
      </div>
      <div className="mt-4 ">
        <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
        <div className="flex space-x-4">
          <p className="text-gray-600">{user.bloodType || 'N/A'}</p>
          <p className="text-gray-600">{calculateAge(user.dateOfBirth)} años</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />


      <div>
        <h3 className="text-lg font-bold">Info principal</h3>
        <div className="mt-4">
          <label className="text-gray-700">Profesión</label>
          <input
            type="text"
            value={user.profession || 'No especificada'}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Grupo</label>
          <input
            type="text"
            value="Sin grupo"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Ubicación</label>
          <div className="relative">
            <input
              type="text"
              value={`${user.city || 'N/A'}, ${user.state || 'N/A'}`}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              readOnly
            />
            <HiLocationMarker className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Fecha de nacimiento</label>
          <div className="relative">
            <input
              type="text"
              value={formatDate(user.dateOfBirth)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              readOnly
            />
            <HiCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Contacto</h3>
        <div className="mt-4">
          <label className="text-gray-700">Email</label>
          <input
            type="text"
            value={user.email || 'No especificado'}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Número de teléfono</label>
          <input
            type="text"
            value={`+${user.countryCode || ''} ${user.phoneNumber || 'No especificado'}`}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Documento</label>
          <input
            type="text"
            value={user.documentNumber || 'No especificado'}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default SidebarContainer