import React from 'react'

const Personal: React.FC = () => {
  return (
    <div>   
      <form className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombres</label>
          <input
            type="text"
            placeholder="Antonio"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellidos</label>
          <input
            type="text"
            placeholder="Ramírez Caicedo "
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de documento</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]">
            <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
            <option value="Cedula de Extranjeria">Cédula de Extranjería</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de identidad</label>
          <input
            type="text"
            placeholder="1081404****"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de sangre</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección de residencia</label>
          <input
            type="text"
            placeholder="Escriba la dirección de residencia del usuario"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
      </form>
    </div>
  )
}

export default Personal