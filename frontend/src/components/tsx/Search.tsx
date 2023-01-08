import { ReactElement } from 'react';
import MainView from './MainView';
import PlayingBar from './PlayingBar';
import Sidebar from './Sidebar';

const Search = (): ReactElement => {
    return (
        <>
            <Sidebar></Sidebar>
            <MainView></MainView>
            <PlayingBar></PlayingBar>
        </>
    );
};

export default Search;
