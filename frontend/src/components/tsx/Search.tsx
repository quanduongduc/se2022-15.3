import { ReactElement, useEffect, useState } from 'react';
import { useSearchTracksContext } from '../../context/SearchContextProvider';
import '../css/search.css';

const Search = (): ReactElement => {
    const [listSearchTrack, setListSearchTrack] = useState<any[]>([]);
    const {
        searchTracksContextState: { searchTracks }
    } = useSearchTracksContext();

    useEffect(() => {
        setListSearchTrack(searchTracks);
    }, [searchTracks]);

    return (
        <div className="search-wrapper">
            <div className="search-content-container"></div>
        </div>
    );
};

export default Search;
