
  import React from "react";
  import DropdownButton from "./DropdownButton"; 
  import { useNavigate } from "react-router-dom" 


  interface UserCardProps {
    profileImage: string;
    group: string;
    zone: string;
    contact: string;
    profession: string;
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
    profession,
    isActive,
  }) => {
    const navigate = useNavigate()

    const handleOptionSelect = (option: string) => {
      if (option === "Ver perfil") {
        navigate("/usuarios/perfil/1")
      } else if (option === "Editar perfil") {
        navigate("/usuarios/perfil/configuracion/1")
      }
    }
    
    return (
      <div className="flex items-center gap-4 px-6 py-4  rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0">
          <img
            src={profileImage}
            alt="User Profile"
            className="w-14 h-14 m-120 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        <div className="grid grid-cols-9 gap-6 items-center w-full">
          <div className="flex flex-col col-span-3 ">
            <span className="text-sm font-semibold text-black">{name}</span>
            <span className="text-xs text-gray-400">{email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Grupo</span>
            <span className="text-sm text-black">{group}</span>
          </div>
          <div className="flex flex-col ">
            <span className="text-xs text-gray-400">Zona</span>
            <span className="text-sm text-black">{zone}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Contacto</span>
            <span className="text-sm text-black">{contact}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Profesión</span>
            <span className="text-sm text-black">{profession}</span>
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
              <div className="w-8 h-8 flex justify-center items-center rounded-lg bg-gray-100 ">
              <DropdownButton options={['Ver perfil', 'Editar perfil']} onOptionSelect={handleOptionSelect} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default UserCard;
