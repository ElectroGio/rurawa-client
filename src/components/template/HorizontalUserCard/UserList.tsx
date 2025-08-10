import React from 'react';
import ActivitiesCard from './HorizontalActivitiesCard';

const users = [
  {
    name: 'Antonio Ramírez',
    role: 'Supervisor',
    status: 'Activo',
    pending: 0,
    assigned: 16,
    completed: 6,
    highlight: false,
  },
  {
    name: 'James Ortígoza',
    role: 'Analista',
    status: 'Activo',
    pending: 1,
    assigned: 20,
    completed: 2,
    highlight: false,
  },
  {
    name: 'Alicia Córdoba',
    role: 'Técnico',
    status: 'Activo',
    pending: 0,
    assigned: 8,
    completed: 0,
    highlight: true,
  },
  {
    name: 'Pilar Acevedo',
    role: 'Coordinadora',
    status: 'Activo',
    pending: 0,
    assigned: 4,
    completed: 6,
    highlight: true,
  },
];

const UserList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {users.map((user, index) => (
        <ActivitiesCard key={index} {...user} />
      ))}
    </div>
  );
};

export default UserList;
