import { ResourceItem, resources } from './components/ResouceListItems';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceModule = () => {
  const navigate = useNavigate();

  const handleResourceClick = (title: string) => {
    if (title === 'Proyectos') {
      navigate('/proyectos'); 
    } else if (title === 'Cuestionarios') {
      navigate('/app/questionnaires');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recursos</h1>
        <div>
          <button className="bg-[#008B00] text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-[#006600] transition">
            + Nueva carpeta
          </button>
        </div>
      </div>

      <div className="p-6 min-h-screen">
        <header className="mb-6 flex flex-col lg:flex-row items-center justify-between ">
          <div className="flex items-center space-x-4 w-full lg:w-2/3 bg-white p-7 rounded-lg">
            <div>
              <h2 className="text-2xl font-bold">Almacén de datos de sus proyectos</h2>
              <p className="text-gray-500 mt-2">
                Agregue datos del proyecto, cree actividades temáticas, edite datos, y comparta información con los miembros del equipo.
              </p>
            </div>
            {/* <img
              src="public/img/rurawa-logo/illustration.png"
              alt="Ilustración"
              className="w-40 h-40 object-contain"
            /> */}
          </div>
          <div className="flex justify-end items-end mb-2">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
              <h2 className="text-lg font-bold text-gray-800">Proyectos actuales</h2>
              <p className="text-3xl font-bold text-gray-900">10</p>
              <p className="text-sm text-green-600 font-medium">Crecimiento +3</p>
              <p className="text-sm text-gray-500">
                Proyectos en curso el mes pasado: <span className="font-semibold">7</span>
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 m:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource: ResourceItem, index: number) => (
            <div
              key={index}
              onClick={() => handleResourceClick(resource.title)}
              className={`flex items-center p-4 rounded-lg shadow-sm cursor-pointer ${resource.color}`}
            >
              <div className="text-3xl mr-4">{resource.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{resource.title}</h3>
                <p className="text-sm">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResourceModule;
