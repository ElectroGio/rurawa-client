import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import DropdownButton from './DropdownButton'

interface GroupCardProps {
  groupId: string
  image?: string
  title: string
  location: string
  onViewDetails?: (groupId: string) => void
  onEditGroup?: (groupId: string) => void
}

const VerticalGroupCard: React.FC<GroupCardProps> = ({ 
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
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className="w-full h-32 rounded-md overflow-hidden flex items-center justify-center">
        <Avatar
          size={96}
          src={image}
          alt={title}
          shape="square"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-3xl"
        >
          {!image && title.charAt(0).toUpperCase()}
        </Avatar>
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