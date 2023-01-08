import { ReactElement } from 'react';
import PlaylistContextProvider from '../../context/PlaylistContext';
import MainView from './MainView';
import PlayingBar from './PlayingBar';
import Sidebar from './Sidebar';

const Playlist = (): ReactElement => {
    return (
        <>
            <PlaylistContextProvider>
                <Sidebar></Sidebar>
                <MainView></MainView>
                <PlayingBar></PlayingBar>
            </PlaylistContextProvider>
        </>
    );
};

export default Playlist;
