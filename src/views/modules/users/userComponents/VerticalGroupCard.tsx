import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownButton from './DropdownButton'

interface GroupCardProps {
  image: string
  title: string
  location: string
}

const VerticalGroupCard: React.FC<GroupCardProps> = ({ image, title, location }) => {
  const navigate = useNavigate()

  const handleOptionSelect = (option: string) => {
    if (option === "Ver grupo") {
      // Lógica para ver grupo
    } else if (option === "Editar grupo") {
      // Lógica para editar grupo
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className="w-full h-32 rounded-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover border-2 border-gray-300"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold text-black">{title}</span>
        <span className="text-xs text-gray-500">{location}</span>
      </div>
      <div className="absolute bottom-2 right-2">
        <DropdownButton options={['Ver grupo', 'Editar grupo']} onOptionSelect={handleOptionSelect} />
      </div>
    </div>
  )
}

export default VerticalGroupCard