import React from "react";

interface UserCardProps {
  profileImage: string;
  group: string;
  zone: string;
  contact: string;
  profession: string;
  isActive: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  profileImage,
  group,
  zone,
  contact,
  profession,
  isActive,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen de perfil */}
      <div className="flex-shrink-0">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Detalles del usuario */}
      <div className="grid grid-cols-5 flex-1 gap-4">
        {/* Grupo */}
        <div>
          <span className="block text-xs font-bold text-gray-600">Grupo</span>
          <span className="block text-sm text-gray-800">{group}</span>
        </div>

        {/* Zona */}
        <div>
          <span className="block text-xs font-bold text-gray-600">Zona</span>
          <span className="block text-sm text-gray-800">{zone}</span>
        </div>

        {/* Contacto */}
        <div>
          <span className="block text-xs font-bold text-gray-600">Contacto</span>
          <span className="block text-sm text-gray-800">{contact}</span>
        </div>

        {/* Profesión */}
        <div>
          <span className="block text-xs font-bold text-gray-600">Profesión</span>
          <span className="block text-sm text-gray-800">{profession}</span>
        </div>

        {/* Estado */}
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded-lg text-sm font-bold text-center ${
              isActive
                ? "text-green-600 bg-white border border-green-600"
                : "text-red-600 bg-white border border-red-600"
            }`}
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
