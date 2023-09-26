import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Planet {
  name: string;
}

const PlanetList: FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
        {planets.map((planet, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            {planet.name}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PlanetList;