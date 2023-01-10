import { ReactElement } from 'react';
import PlayingBar from '../../components/tsx/PlayingBar';
import Sidebar from '../../components/tsx/Sidebar';
import TopBar from './TopBar';

const Favorite = (): ReactElement => {
    return (
        <div className="favorite-wrapper">
            <TopBar />
            <Sidebar />
            <PlayingBar />
            <div className="search-content overflow-auto"></div>
        </div>
    );
};

export default Favorite;
