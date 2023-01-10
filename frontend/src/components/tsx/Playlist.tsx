import { ReactElement } from 'react';
import '../css/playlist.css';
import PlayingBar from './PlayingBar';
import PlaylistView from './PlaylistView';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Playlist = (): ReactElement => (
    <div className="playlist-wrapper">
        <TopBar />
        <Sidebar />
        <PlayingBar />
        <div className="playlist-content overflow-auto">
            <PlaylistView />
        </div>
    </div>
);

export default Playlist;
