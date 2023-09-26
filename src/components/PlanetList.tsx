import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                    {planets.map((planet, index) => (
                        <div
                            key={index}
                            className="gap-4 p-4 m-2 border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            {planet.name}
                            <button
                                className={`w-full mt-2 py-2 rounded-md ${planet.inWishlist
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                                onClick={() => toggleWishlist(planet)}
                            >
                                {planet.inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </div>
    );
};

export default PlanetList;