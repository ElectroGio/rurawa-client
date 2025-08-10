import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Verification: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de celular</label>
        <div className="flex">
          <input
            type="text"
            placeholder="+57"
            className="w-16 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
          <input
            type="text"
            placeholder="Escriba el número de celular"
            className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          placeholder="Escriba el correo del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Escriba la contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
    </form>
  )
}

export default Verification