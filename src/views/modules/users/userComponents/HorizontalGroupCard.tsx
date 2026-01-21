import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownButton from './DropdownButton'

interface GroupCardProps {
  groupId: string
  image: string
  title: string
  location: string
  onViewDetails?: (groupId: string) => void
  onEditGroup?: (groupId: string) => void
}

const HorizontalGroupCard: React.FC<GroupCardProps> = ({ 
  groupId,
  image, 
  title, 
  location,
  onViewDetails,
  onEditGroup
}) => {
  const navigate = useNavigate()

  const handleOptionSelect = (option: string) => {
    if (option === "Ver grupo" && onViewDetails) {
      onViewDetails(groupId)
    } else if (option === "Editar grupo" && onEditGroup) {
      onEditGroup(groupId)
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