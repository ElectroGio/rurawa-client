import React from 'react';
import Dialog from '@/components/ui/Dialog'; 

interface ShareResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareResourceModal: React.FC<ShareResourceModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative p-6">
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
        </button>

        {/* Contenido del modal */}
        <h3 className="text-lg font-bold mb-4 text-gray-800">Compartir recurso</h3>
        <div className="flex justify-center mb-6">
          <img
            src="public/img/rurawa-logo/modal-image.png"
            alt="Compartir recurso"
            className="w-70 h-40 object-contain"
          />
        </div>
        <label htmlFor="integrante" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar integrante
        </label>
        <select
          id="integrante"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="integrante1">integrante1@gmail.com</option>
          <option value="integrante2">integrante2@gmail.com</option>
          <option value="integrante3">integrante3@gmail.com</option>
        </select>
        <button className="text-green-600 text-sm mt-4">+ Agregar otro</button>
        <div className="text-right mt-6">
          <button
            className="bg-[#008B00] text-white text-sm py-2 px-4 rounded-full hover:bg-[#006600]"
            onClick={onClose}
          >
            Enviar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareResourceModal;
