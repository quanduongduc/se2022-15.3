import { ReactElement } from 'react';
import Tracks from './Tracks';
import '../css/collection.css';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import PlayingBar from './PlayingBar';

const Collection = (): ReactElement => (
    <div className="collection-wrapper">
        <TopBar />
        <Sidebar />
        <PlayingBar />
        <div className="collection-content overflow-auto">
            <Tracks />
        </div>
    </div>
);

export default Collection;
