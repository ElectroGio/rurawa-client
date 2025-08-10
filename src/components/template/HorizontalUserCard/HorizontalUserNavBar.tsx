import React, { useState } from 'react';
import { FaBars, FaTrash, FaPlus } from 'react-icons/fa';
import UserCard from './HorizontalUserCard';
import GroupList from './HorizontalGroupList';
import UserModal from './UserModal';
import UserList from './UserList';

const UserNavbar: React.FC = () => {
  const tabs = ['Usuarios', 'Grupos', 'Actividades'];
  const [selectedTab, setSelectedTab] = useState<string>('Usuarios');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const renderContent = () => {
    if (selectedTab === 'Usuarios') {
      return (
        <div className="grid gap-4 p-4">
          <UserCard
            profileImage="public/img/rurawa-logo/logueUserExample.png"
            group="Admins"
            zone="North Zone"
            contact="+1 (555) 123-4567"
            profession="Software Engineer"
            isActive={true}
          />
          <UserCard
            profileImage="public/img/rurawa-logo/logueUserExample3.png"
            group="Administradores"
            zone="Norte"
            contact="user1@example.com"
            profession="Ingeniero"
            isActive={true}
          />
          <UserCard
            profileImage="public/img/rurawa-logo/logueUserExample2.png"
            group="Marketing"
            zone="Sur"
            contact="user2@example.com"
            profession="Diseñador"
            isActive={false}
          />
        </div>
      );
    }
    if (selectedTab === 'Grupos') return <GroupList />;
    if (selectedTab === 'Actividades') return <UserList />;
    return null;
  };

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-50 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Gestión</h1>
        <div className="flex items-center bg-gray-100 p-2 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize rounded-full transition-all ${
                selectedTab === tab
                  ? 'bg-[#008B00] text-white'
                  : 'text-[#008B00]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => setModalOpen(true)} // Se abre el modal
          className="flex items-center gap-2 px-4 py-2 bg-[#008B00] text-white font-medium rounded-full hover:bg-[#008B20] transition"
        >
          <FaPlus />
          {selectedTab === 'Usuarios' ? 'Nuevo usuario' : 'Nuevo grupo'}
        </button>
      </nav>
      <main className="p-4">{renderContent()}</main>
      {isModalOpen && <UserModal onClose={() => setModalOpen(false)} />} 
    </div>
  );
};

export default UserNavbar;
