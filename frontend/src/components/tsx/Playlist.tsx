import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import '../css/playlist.css';

const Playlist = (): ReactElement => (
    <div className="playlist-wrapper">
        <Outlet />
    </div>
);

export default Playlist;
