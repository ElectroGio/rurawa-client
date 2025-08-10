import React from 'react';

interface GroupCardProps {
  image: string;
  title: string;
  location: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ image, title, location }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
      <img src={image} alt={title} className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-500">{location}</span>
      <button className="self-end text-gray-400 hover:text-gray-600 transition">
        <span className="text-xl">•••</span>
      </button>
    </div>
  );
};

export default GroupCard;
