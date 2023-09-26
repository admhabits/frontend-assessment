import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';

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

    const rowRenderer: ListRowRenderer = ({ key, index, style }) => (
        <div key={key} style={style}>
            {planets[index].name}
        </div>
    );

    return (
        <div>
            <div className="h-96">
                <InfiniteScroll
                    dataLength={planets.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4 style={{ position: 'absolute', top: '50%', left: '50%', transform: ' translate(-50%, -50%)' }}>Loading...</h4>}
                    height={450}
                >
                    <AutoSizer>
                        {({ height, width }) => (
                            <div className='styles.grid'>
                                <List
                                    height={height}
                                    width={width}
                                    rowCount={planets.length}
                                    rowHeight={40}
                                    rowRenderer={rowRenderer}
                                />
                            </div>
                        )}
                    </AutoSizer>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default PlanetList;