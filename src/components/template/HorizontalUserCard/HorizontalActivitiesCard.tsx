import React from 'react';

interface UserCardProps {
  name: string;
  role: string;
  status: string; 
  pending: number;
  assigned: number;
  completed: number;
  highlight?: boolean;
  imageUrl?: string;
}

const ActivitiesCard: React.FC<UserCardProps> = ({
  name,
  role,
  status,
  pending,
  assigned,
  completed,
  highlight = false,
  imageUrl,
}) => {
  return (
    <div
      className={`${
        highlight ? 'bg-yellow-100' : 'bg-white'
      } rounded-lg shadow-lg p-4 flex flex-col items-center border border-gray-200`}
    >
      <img
        src={imageUrl || 'https://via.placeholder.com/100'}
        alt={name}
        className="w-16 h-16 rounded-full border-2 border-blue-500 mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">{role}</p>
      <span
        className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'Activo'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
        }`}
      >
        {status}
      </span>
      <div className="mt-4 flex justify-between w-full text-center">
        <div className="flex flex-col items-center w-1/3">
          <span className="text-xl font-bold text-gray-800">{pending}</span>
          <span className="text-sm text-gray-600">Pendientes</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <span className="text-xl font-bold text-gray-800">{assigned}</span>
          <span className="text-sm text-gray-600">Asignadas</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <span className="text-xl font-bold text-gray-800">{completed}</span>
          <span className="text-sm text-gray-600">Cumplidas</span>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesCard;
