import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownButton from './DropdownButton'
import UserAvatar from '@/components/custom/UserAvatar/UserAvatar'

interface UserCardProps {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  profileImage?: string
  name: string
  profession: string
  isActive: boolean
}

const VerticalUserCard: React.FC<UserCardProps> = ({
  userId,
  firstName,
  lastName,
  email,
  profileImage,
  name,
  profession,
  isActive,
}) => {
  const navigate = useNavigate()

  const handleOptionSelect = (option: string) => {
    if (option === "Ver perfil") {
      navigate(`/usuarios/perfil/${userId}`)
    } else if (option === "Editar perfil") {
      navigate(`/usuarios/perfil/configuracion/${userId}`)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className="w-full h-32 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
        <UserAvatar
          firstName={firstName}
          lastName={lastName}
          email={email}
          profileImage={profileImage}
          size={100}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold text-black">{name}</span>
        <span className="text-xs text-gray-500">{profession}</span>
        <span
          className={`px-2 py-1 mt-2 rounded-lg text-sm font-bold text-center ${
            isActive
              ? 'text-green-600 bg-white border border-green-600'
              : 'text-red-600 bg-white border border-red-600'
          }`}
        >
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      <div className="absolute bottom-2 right-2">
        <DropdownButton options={['Ver perfil', 'Editar perfil']} onOptionSelect={handleOptionSelect} />
      </div>
    </div>
  )
}

export default VerticalUserCard   