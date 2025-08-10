import React from 'react'

const PersonalInfo: React.FC = () => {
  return (
    <form className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          placeholder="Escriba el nombre del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Apellido</label>
        <input
          type="text"
          placeholder="Escriba el apellido del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de indentidad</label>
        <input
          type="text"
          placeholder="Escriba el número de identidad del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
    </form>
  )
}

export default PersonalInfo