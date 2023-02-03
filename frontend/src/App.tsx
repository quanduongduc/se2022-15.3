import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './components/tsx/TopBar';
import Sidebar from './components/tsx/Sidebar';
import PlayingBar from './components/tsx/PlayingBar';

const App = (): ReactElement => {
    return (
        <div className="app-wrapper">
            <TopBar />
            <Sidebar />
            <PlayingBar />
            <Outlet />
        </div>
    );
};

export default App;
