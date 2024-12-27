import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData()
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>React and MongoDB Connection</h1>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
    );
};

export default App;
