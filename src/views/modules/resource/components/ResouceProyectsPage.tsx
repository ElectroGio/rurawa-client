import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiChevronLeft, FiSearch, FiFolderPlus, FiShare2 } from 'react-icons/fi';
import ShareResourceModal from './ShareResouceModal'; 

const Proyectos: React.FC = () => {
  const navigate = useNavigate(); 
  const [selectedActivity, setSelectedActivity] = useState('Actividad técnica');
  const [isModalOpen, setModalOpen] = useState(false); 

  const activities = [
    { name: 'Renovación de café', updated: '10 de nov. de 2023' },
    { name: 'Renovación de café', updated: 'Última modificación hoy' },
    { name: 'Renovación de café', updated: '10 de nov. de 2023' },
    { name: 'Renovación de café', updated: '10 de nov. de 2023' },
  ];

  const handleBackToRecursos = () => {
    navigate('/recursos');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar de actividades */}
      <aside className="w-1/4 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <FiChevronLeft
            className="text-green-600 mr-2 cursor-pointer"
            onClick={handleBackToRecursos}
          />
          <h1
            className="text-lg font-bold text-gray-700 cursor-pointer"
            onClick={handleBackToRecursos}
          >
            Actividades
          </h1>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg mb-4">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar actividad..."
            className="bg-transparent w-full outline-none text-sm text-gray-700"
          />
        </div>
        <ul>
          {activities.map((activity, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer mb-2 ${
                selectedActivity === activity.name
                  ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedActivity(activity.name)}
            >
              <h3 className="text-sm font-medium">{activity.name}</h3>
              <p className="text-xs text-gray-500">Modificado: {activity.updated}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">{selectedActivity}</h2>
          <div className="flex space-x-2">
            <button className="bg-[#008B00] text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-[#006600] transition">
              <FiFolderPlus className="inline mr-2" /> Nueva carpeta
            </button>
            <button
              className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-300 transition"
              onClick={openModal} // Abre el modal al hacer clic
            >
              <FiShare2 className="inline mr-2" /> Compartir
            </button>
          </div>
        </div>

        {/* Detalles de la actividad */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800">Requisitos para el control y verificación de renovación de café</h3>
          <p className="text-sm text-gray-600 mt-4">
            Al desarrollar la actividad, se deben utilizar predominantemente las BPA. Las rutas establecidas para la
            ejecución de esta actividad obedecen a los seguimientos y asesorías hechas en los períodos comprendidos
            entre 2021 y 2022.
          </p>

          <h4 className="mt-20 text-gray-700 font-bold">Requisitos para la presentación del cumplimiento de la actividad</h4>
          <p className="text-sm text-gray-600 mt-2">
            Los requisitos para la presentación del cumplimiento de la actividad deben contener informe, cuestionario
            completo y evidencia fotográfica de la visita. Se hará revisión de navegación del sitio, así como un área
            de contenido para que un visitante del sitio desde la primera página pueda recibir información introductoria
            sobre la empresa, así como conocer las últimas novedades de la empresa.
          </p>
          <div className="mt-20 flex space-x-10">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-center">
              <p className="text-xs font-medium text-gray-600">Informe actividad</p>
              <p className="text-xs text-gray-400">Sep 19, 2023 | 10:52 AM</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-center">
              <p className="text-xs font-medium text-gray-600">Cuestionario renovación</p>
              <p className="text-xs text-gray-400">Sep 19, 2023 | 10:52 AM</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm text-center">
              <p className="text-xs font-medium text-gray-600">Evidencia en jpg</p>
              <p className="text-xs text-gray-400">Sep 19, 2023 | 10:52 AM</p>
            </div>
          </div>

          <h4 className="mt-20 text-gray-700 font-bold">Requisitos para compartir acceso</h4>
          <p className="text-sm text-gray-600 mt-2">
            <span className="text-green-600 cursor-pointer">+ Haz click para agregar un bloque.</span>
          </p>
        </div>
      </main>

      {/* Modal de compartir */}
      <ShareResourceModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Proyectos;
