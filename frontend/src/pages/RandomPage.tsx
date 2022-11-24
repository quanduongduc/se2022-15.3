import axios from 'axios';
import React, { ReactElement, useState } from 'react';
import { API_URL } from '../constants/constants';

interface Data {
    name: string;
}

const RandomPage = (): ReactElement => {
    const [data, setData] = useState<Data>();
    const getData = async () => {
        const { data } = await axios.get(`${API_URL}/random`);

        setData(data);
    };
    console.log(data);

    return (
        <div className="App">
            <header className="App-header">
                <button className="button" onClick={getData}>
                    GetData
                </button>
                <h1>Power By 🍑🍑🍑</h1>
                <p>{data?.name}</p>
            </header>
        </div>
    );
};

export default RandomPage;
