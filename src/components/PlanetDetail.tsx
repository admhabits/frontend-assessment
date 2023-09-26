import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PlanetDetailPopupProps {
  nama: string;
  rotasi: string;
  orbit: string,
  diameter: string,
  population: string,
  onClose: () => void; // Callback to close the popup
}

const PlanetDetailPopup: React.FC<PlanetDetailPopupProps> = ({
  nama,
  rotasi,
  orbit,
  diameter,
  population,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-3xl p-4 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
        </button>
        <h2 className="text-2xl font-bold mb-2">{nama}</h2>
        <p className="text-gray-600">{rotasi}</p>
        <p className="text-gray-600">{orbit}</p>
        <p className="text-gray-600">{diameter}</p>
        <p className="text-gray-600">{population}</p>
      </div>
    </div>
  );
};

export default PlanetDetailPopup;
