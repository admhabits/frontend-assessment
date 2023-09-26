import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'styles/Animation.module.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PlanetDetailPopupProps {
    nama: string;
    rotasi: string;
    orbit: string;
    diameter: string;
    population: string;
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background Animation */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-60 animate-backgroundAnimation"
            ></div>
            <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300"
                >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                </button>
                <div className="flex flex-col items-center space-y-4 mb-4">
                    {/* Planet Avatar Skeleton */}
                    <div className="bg-gray-200 w-32 h-32 rounded-full animate-pulse" />
                    <h2 className="text-3xl font-oswald font-semibold mb-2">{nama}</h2>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                Rotation
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Orbit
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Diameter
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Population
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4">{rotasi}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{orbit}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{diameter}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{population}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Meteor Animation */}
            <div
                className="absolute top-0 h-1 w-1 bg-gradient-to-r from-yellow-300 via-red-500 to-orange-300 rounded-full animate-meteorAnimation"
            ></div>
        </div>
    );
};

export default PlanetDetailPopup;
