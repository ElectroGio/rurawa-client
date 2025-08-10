import React, { useState, useEffect, useRef } from 'react'
import { CgMoreVerticalAlt } from 'react-icons/cg'

interface DropdownButtonProps {
  options: string[]
  onOptionSelect: (option: string) => void
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        <div className="w-8 h-8 flex justify-center items-center rounded-lg bg-gray-100">
          <CgMoreVerticalAlt className="text-2xl" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false)
                onOptionSelect(option)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownButton