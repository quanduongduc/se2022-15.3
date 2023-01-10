import { ReactElement } from 'react';
import PlayingBar from './PlayingBar';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Search = (): ReactElement => {
    return (
        <div className="search-wrapper">
            <TopBar />
            <Sidebar />
            <PlayingBar />
        </div>
    );
};

export default Search;
