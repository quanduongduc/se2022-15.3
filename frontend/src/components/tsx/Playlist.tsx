import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import '../css/playlist.css';

const Playlist = (): ReactElement => (
    <div className="playlist-wrapper">
        <div className="playlist-content overflow-auto">
            <Outlet />
        </div>
    </div>
);

export default Playlist;
