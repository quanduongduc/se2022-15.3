import { ReactElement } from 'react';
import MainView from '../../components/tsx/MainView';
import PlayingBar from '../../components/tsx/PlayingBar';
import Sidebar from '../../components/tsx/Sidebar';

const Home = (): ReactElement => {
    return (
        <>
            <Sidebar></Sidebar>
            <MainView></MainView>
            <PlayingBar></PlayingBar>
        </>
    );
};

export default Home;
