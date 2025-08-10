import React from 'react';
import GroupCard from './HorizontalGroupCard';

const GroupList: React.FC = () => {
  const groups = [
    { image: 'https://via.placeholder.com/150', title: 'Coordinadores', location: 'Zona Huila' },
    { image: 'https://via.placeholder.com/150', title: 'Supervisores', location: 'Zona Huila' },
    { image: 'https://via.placeholder.com/150', title: 'Analistas', location: 'Zona Huila' },
    { image: 'https://via.placeholder.com/150', title: 'Técnicos', location: 'Zona Huila' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50">
      {groups.map((group, index) => (
        <GroupCard key={index} image={group.image} title={group.title} location={group.location} />
      ))}
    </div>
  );
};

export default GroupList;
