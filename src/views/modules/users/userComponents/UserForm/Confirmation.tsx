import React from 'react'

const Confirmation: React.FC<{ onClose: () => void, onNewUser: () => void }> = ({ onClose, onNewUser }) => {
  return (
    <div className="text-center mt-8">
      <img
        src="public/img/banner/illustration-office.png"
        alt="Illustration Office"
        className="mx-auto mb-4"
      />
      <h5 className="text-lg font-bold text-purple-500">¡Se ha registrado un nuevo usuario exitosamente!</h5>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={onClose}
          className="py-2 px-4 bg-[#008B00] text-white font-medium rounded-lg hover:bg-[#006A00] transition"
        >
          Salir
        </button>
        <button
          onClick={onNewUser}
          className="py-2 px-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
        >
          Crear un nuevo usuario
        </button>
      </div>
    </div>
  )
}

export default Confirmation