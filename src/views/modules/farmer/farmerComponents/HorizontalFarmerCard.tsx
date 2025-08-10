
import React from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";

interface UserCardProps {
  profileImage: string;
  group: string;
  zone: string;
  contact: string;
  vereda: string;
  isActive: boolean;
  email: string;
  name: string;
}

const UserCard: React.FC<UserCardProps> = ({
  profileImage,
  name,
  email,
  group,
  zone,
  contact,
  vereda,
  isActive,
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4  rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen de perfil */}
      <div className="flex-shrink-1">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-14 h-14 m-120 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Detalles del usuario */}
      <div className="grid grid-cols-9 gap-6 items-center w-full">
        <div className="flex flex-col col-span-3 ">
          <span className="text-sm font-semibold text-[#0A1629]">{name}</span>
          <span className="text-xs text-[#91929E]">{email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#91929E]">Organizacion</span>
          <span className="text-sm text-[#0A1629]">{group}</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-xs text-[#91929E]">Zona</span>
          <span className="text-sm text-[#0A1629]">{zone}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#91929E]">Vereda</span>
          <span className="text-sm text-[#0A1629]">{vereda}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#91929E]">Contacto</span>
          <span className="text-sm text-[#0A1629]">{contact}</span>
        </div>
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded-lg text-sm font-bold text-center w-fit ${
              isActive
                ? "text-green-600 bg-white border border-green-600"
                : "text-red-600 bg-white border border-red-600"
            }`}
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div className="flex justify-end">
          <button>
            <div className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#F4F9FD] ">
              <CgMoreVerticalAlt className="text-2xl" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
