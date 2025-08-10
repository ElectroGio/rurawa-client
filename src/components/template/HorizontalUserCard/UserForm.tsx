import React from 'react';

const UserForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          placeholder="Escribe el nombre del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Apellido</label>
        <input
          type="text"
          placeholder="Escribe el apellido del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de identidad</label>
        <input
          type="text"
          placeholder="Escribe el número de identidad del usuario"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008B00]"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-[#008B00] text-white font-medium rounded-lg hover:bg-[#006A00] transition"
      >
        Continuar
      </button>
    </form>
  );
};

export default UserForm;
