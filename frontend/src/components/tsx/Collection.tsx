import { ReactElement, useEffect, useState } from 'react';
import axios from '../../api/axios';
import MainView from './MainView';
import PlayingBar from './PlayingBar';
import Sidebar from './Sidebar';

const Collection = (): ReactElement => {
    const [collection, setCollection] = useState();

    useEffect(() => {
        axios
            .get('/track', { withCredentials: true })
            .then((response) => {
                console.log(response.data.tracks[0].trackUrl);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    return (
        <>
            <Sidebar></Sidebar>
            <MainView></MainView>
            <PlayingBar></PlayingBar>
        </>
    );
};

export default Collection;
