import React, { useState } from 'react'
import { FaUser, FaShieldAlt, FaListAlt, FaBell, FaLink } from 'react-icons/fa'

const SideBarConfig: React.FC<{ onSelect: (section: string) => void }> = ({ onSelect }) => {
  const [selected, setSelected] = useState('Cuenta')

  const handleSelect = (section: string) => {
    setSelected(section)
    onSelect(section)
  }

  const buttons = [
    { icon: <FaUser />, text: 'Cuenta' },
    { icon: <FaShieldAlt />, text: 'Centro de permisos' },
    { icon: <FaListAlt />, text: 'Registro de actividades' },
    { icon: <FaBell />, text: 'Notificaciones' },
    { icon: <FaLink />, text: 'Equipos conectados' },
  ]

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md w-full">
      <ul className="space-y-2">
        {buttons.map((button) => (
          <li
            key={button.text}
            className={`flex items-center p-2 cursor-pointer rounded-xl ${
              selected === button.text ? 'bg-gray-100 text-green-700' : 'text-gray-500'
            } hover:bg-gray-100 hover:text-green-700 relative`}
            onClick={() => handleSelect(button.text)}
          >
            {selected === button.text && (
              <div className="absolute right-0 top-0 h-full w-1 bg-green-700 rounded-r-xl"></div>
            )}
            <span className="mr-2">{button.icon}</span>
            <span>{button.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBarConfig