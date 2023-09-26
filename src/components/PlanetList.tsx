import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Planet {
    name: string;
    inWishlist: string[];
}

const PlanetList: FC = () => {
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [wishlist, setWishlist] = useState<Planet[]>([]);

    const toggleWishlist = (planet: Planet) => {
        if (planet.inWishlist) {
            // Remove the planet from the wishlist
            setWishlist(wishlist.filter((p) => p.name !== planet.name));
        } else {
            // Add the planet to the wishlist
            setWishlist([...wishlist, planet]);
        }
    };

    const fetchPlanets = async () => {
        try {
            const response = await axios.get('https://swapi.dev/api/planets');
            setPlanets(planets.concat(response.data.results));
        } catch (error) {
            console.error('Error fetching planets:', error);
        }
    };

    useEffect(() => {
        fetchPlanets();
    }, []);

    const loadMore = () => {
        fetchPlanets();
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={planets.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <h4
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        Loading...
                    </h4>
                }
                height={'90vh'}
            >
                <h3 className="font-oswald text-xl font-semibold mb-2 mx-3">Data planet <span className='text-red-500'>{planets.length}</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ">
                    {planets.map((planet, index) => (
                        <div
                            key={index}
                            className="gap-4 p-4 m-2 border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <h3 className="font-oswald text-xl font-semibold mb-2">{planet.name}</h3>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                                <div className="ml-4">
                                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded mt-2 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    className={`flex-1 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 text-sm`}
                                    onClick={() => toggleWishlist(planet)}
                                >
                                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                                    {planet.inWishlist ? 'Unlike' : 'Add Wishlist'}
                                </button>
                                <button
                                    className={`flex-1 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm`}
                                // onClick={() => viewDetail(planet)}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    View Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </div>
    );
};

export default PlanetList;