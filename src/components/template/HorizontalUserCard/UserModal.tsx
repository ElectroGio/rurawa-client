import React from 'react';
import { FaTimes } from 'react-icons/fa';
import UserForm from './UserForm';

interface UserModalProps {
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nuevo usuario</h2>
        <UserForm />
      </div>
    </div>
  );
};

export default UserModal;
