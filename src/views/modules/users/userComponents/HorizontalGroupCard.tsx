import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownButton from './DropdownButton'

interface GroupCardProps {
  image: string
  title: string
  location: string
}

const HorizontalGroupCard: React.FC<GroupCardProps> = ({ image, title, location }) => {
  const navigate = useNavigate()

  const handleOptionSelect = (option: string) => {
    if (option === "Ver grupo") {
      // Lógica para ver grupo
    } else if (option === "Editar grupo") {
      // Lógica para editar grupo
    }
  }

  return (
    <div className="flex items-center gap-4 px-4 py-0  rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative flex items-center gap-4 p-4 rounded-lg w-60">
        <img
          src={image}
          alt={title}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black truncate w-32">{title}</span>
          <span className="text-xs text-gray-500">{location}</span>
        </div>
      </div>
      <div className="ml-auto">
        <DropdownButton options={['Ver grupo', 'Editar grupo']} onOptionSelect={handleOptionSelect} />
      </div>
    </div>
  )
}

export default HorizontalGroupCard