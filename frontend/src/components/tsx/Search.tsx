import { ReactElement, useState } from 'react';
import '../css/search.css';

const Search = (): ReactElement => {
    const [listSearchTrack, setListSearchTrack] = useState<any[]>([]);
    return (
        <div className="search-wrapper">
            <div className="search-content-container d-flex flex-column">
                {listSearchTrack.map((track, index) => (
                    <div
                        className="search-track-container d-flex flex-row"
                        key={index}
                    >
                        <div className="track-name">{track.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
