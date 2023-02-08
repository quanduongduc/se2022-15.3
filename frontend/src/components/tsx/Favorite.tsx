import {
    faClockFour,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTrackContext } from '../../context/TrackContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import { useFavoriteTracksContext } from '../../context/FavoriteContextProvider';
import '../css/favorite.css';
import Track from './Track';
import axios from '../../api/axios';
const SEARCH_URL = '/track/search/?title=';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
const ADD_TRACK_TO_FAVORITE_URL = '/user/add-favourite/';
const REMOVE_TRACK_FAVORITE_URL = '/user/remove-favourite/';

const Favorite = (): ReactElement => {
    const { updateTrackContextState } = useTrackContext();
    const [tracksSearch, settracksSearch] = useState<any[]>([]);
    const [trackInFavorite, setTrackInFavorite] = useState<any[]>([]);
    const {
        favoriteTracksContextState: { favoriteTracks },
        updateFavoriteTracksContextState
    } = useFavoriteTracksContext();
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const newFavoriteTrack = (trackID: string) => {
        const trackIndex = tracks.findIndex(
            (track: any) => track._id === trackID
        );
        return tracks[trackIndex];
    };

    useEffect(() => {
        const ListFavoriteTrack = [];
        for (const track of tracks) {
            for (const favoriteTrack of favoriteTracks) {
                if (track._id === favoriteTrack._id) {
                    ListFavoriteTrack.push(track);
                }
            }
        }
        setTrackInFavorite(ListFavoriteTrack);
    }, [favoriteTracks]);

    const setLastPlaying = (trackId: string) => () => {
        axios
            .patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                updateTrackContextState({ selectedTrackId: trackId });
            });
    };

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (title !== '') {
            axios
                .get(`${SEARCH_URL}${title}`, { withCredentials: true })
                .then((response) => {
                    let searchTracks = response?.data?.tracks;
                    for (const track of trackInFavorite) {
                        searchTracks = searchTracks.filter(
                            (trackInSearch: any) =>
                                trackInSearch._id !== track._id
                        );
                    }
                    const newSearchTracks: any = [];
                    for (const track of searchTracks) {
                        if (newSearchTracks.length < 10) {
                            newSearchTracks.push(track);
                        }
                    }
                    settracksSearch(newSearchTracks);
                });
        }
    }, [title]);

    const addTrackToFavorite = (trackID: string) => () => {
        axios
            .patch(
                `${ADD_TRACK_TO_FAVORITE_URL}${trackID}`,
                JSON.stringify({ trackID }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            .then(() => {
                const newFavoriteTracks = favoriteTracks.concat(
                    newFavoriteTrack(trackID)
                );
                updateFavoriteTracksContextState({
                    favoriteTracks: newFavoriteTracks
                });
                const newtracksSearch = tracksSearch.filter(
                    (track) => track._id !== trackID
                );
                settracksSearch(newtracksSearch);
            });
    };

    const removeTrackFromFavorite = (trackID: string) => () => {
        axios
            .patch(
                `${REMOVE_TRACK_FAVORITE_URL}${trackID}`,
                JSON.stringify({ trackID }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            .then(() => {
                const newFavoriteTracks = favoriteTracks.filter(
                    (track) => track._id !== trackID
                );
                updateFavoriteTracksContextState({
                    favoriteTracks: newFavoriteTracks
                });
            });
    };

    return (
        <div className="favorite-wrapper">
            <div className="favorite-header text-white d-flex align-items-center">
                <span className="favorite-title ms-2">Danh sách yêu thích</span>
            </div>
            <div className="favorite-content d-flex flex-column">
                <div className="favorite-data-header d-flex text-white border-bottom row-cols-4">
                    <div className="favorite-index-header d-flex ms-2 me-4 col-1 justify-content-center">
                        #
                    </div>
                    <div className="favorite-title-header ms-4 col-4">
                        TIÊU ĐỀ
                    </div>
                    <div className="favorite-created-at col-2 me-5">
                        NGÀY TẠO
                    </div>
                    <div className="favorite-duration">
                        LƯỢT XEM
                    </div>
                </div>
                <div className="favorite-data-content d-flex flex-column">
                    {trackInFavorite.map((track, index) => (
                        <div
                            className="favorite-data-show d-flex flex-row"
                            key={track._id}
                        >
                            <div
                                className="favorite-data-track-container"
                                onClick={setLastPlaying(track._id)}
                            >
                                <Track item={track} itemIndex={index} />
                            </div>
                            <button
                                className="remove-track-btn rounded-5 text-white mt-4"
                                onClick={removeTrackFromFavorite(track._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
                <div className="favorite-add-track-container mt-5">
                    <form
                        className="favorite-add-tracks-form d-flex rounded-5 align-items-center border-dark"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="black"
                            className="favorite-add-tracks-icon rounded ms-3 border-dark"
                        />
                        <input
                            type="search"
                            className="favorite-add-tracks-input border-0"
                            placeholder="Bạn muốn nghe gì?"
                            aria-invalid="false"
                            autoCapitalize="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                    <div className="find-tracks d-flex flex-column text-white">
                        {tracksSearch.map((track, index) => (
                            <div
                                className="add-track-container d-flex flex-row"
                                key={track._id}
                            >
                                <Track item={track} itemIndex={index} />
                                <button
                                    className="add-track-btn rounded-5 text-white mt-4"
                                    onClick={addTrackToFavorite(track._id)}
                                >
                                    Thêm
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorite;
