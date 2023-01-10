import { ReactElement } from 'react';
import PlayingBar from '../../components/tsx/PlayingBar';
import Sidebar from '../../components/tsx/Sidebar';
import '../css/home.css';
import TopBar from './TopBar';

const Home = (): ReactElement => {
    return (
        <>
            <div className="home-wrapper">
                <TopBar />
                <Sidebar />
                <PlayingBar />
            </div>
        </>
    );
};

export default Home;
