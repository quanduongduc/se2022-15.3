import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import PlayingBar from './components/tsx/PlayingBar';
import Sidebar from './components/tsx/Sidebar';
import TopBar from './components/tsx/TopBar';

const App = (): ReactElement => {
    return (
        <>
            <div className="App-wrapper">
                <TopBar />
                <Sidebar />
                <PlayingBar />
                <Outlet />
            </div>
        </>
    );
};

export default App;
