import { ReactElement, useEffect, useState } from 'react';
import { useSearchTracksContext } from '../../context/SearchTracksContextProvider';
import '../css/search.css';
import axios from '../../api/axios';
import { useTrackContext } from '../../context/TrackContextProvider';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
const Search = (): ReactElement => {
    const { updateTrackContextState } = useTrackContext();
    const [searchTracksShow, setSearchTracksShow] = useState<any[]>([]);
    const {
        searchTracksContextState: { searchTracks }
    } = useSearchTracksContext();

    const setLastPlaying = (trackId: string | any) => () => {
        axios.patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        updateTrackContextState({ selectedTrackId: trackId });
    };

    useEffect(() => {
        const newTracksSearch: any = [];
        for (const track of searchTracks) {
            if (
                newTracksSearch.findIndex(
                    (trackE: any) => trackE._id === track._id
                ) === -1
            ) {
                newTracksSearch.push(track);
            }
        }
        setSearchTracksShow(newTracksSearch);
    }, [searchTracks]);

    return (
        <div className="search-wrapper overflow-auto">
            <div className="search-content-container d-flex flex-column">
                {searchTracksShow.map((track, index) => (
                    <div className="search-track-container" key={index}>
                        <div
                            className="search-track-content d-flex flex-row text-white align-items-center rounded-3"
                            onClick={setLastPlaying(track._id)}
                        >
                            <span className="search-track-index ms-5 me-3">
                                {index + 1}
                            </span>
                            <img
                                src={track.themeUrl}
                                alt=""
                                className="search-track-img me-3 ms-3"
                            />
                            <div className="search-track-info ">
                                <div className="search-track-name">
                                    {track.title}
                                </div>
                                <div className="search-track-artist">
                                    {track.artists[0].name}
                                </div>
                            </div>
                            <div className="search-track-duration">
                                {track.duration}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
