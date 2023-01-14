import {
    faClockFour,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement, SyntheticEvent, useState } from 'react';
import axios from '../../api/axios';
import { useFavoriteTracksContext } from '../../context/FavoriteContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import '../css/favorite.css';
import Track from './Track';
const SEARCH_URL = '/track/search/?title=';
const ADD_TRACK_TO_FAVORITE_URL = '/user/add-favourite/';
const REMOVE_TRACK_FAVORITE_URL = '/user/remove-favourite/';

const Favorite = (): ReactElement => {
    const [favoriteAddTrack, setFavoriteAddTrack] = useState<any[]>([]);

    const {
        favoriteTracksContextState: { favoriteTracks }
    } = useFavoriteTracksContext();

    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const trackInFavorite = [];
    for (const track of tracks) {
        for (const favoriteTrack of favoriteTracks) {
            if (track._id === favoriteTrack._id) {
                trackInFavorite.push(track);
            }
        }
    }

    const [title, setTitle] = useState('');

    const searchHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        axios
            .get(`${SEARCH_URL}${title}`, { withCredentials: true })
            .then((response) => {
                setFavoriteAddTrack(response?.data?.tracks);
            });
    };

    const addTrackToFavorite = (trackID: string) => () => {
        axios.patch(
            `${ADD_TRACK_TO_FAVORITE_URL}${trackID}`,
            JSON.stringify({ trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    const removeTrackFromFavorite = (trackID: string) => () => {
        axios.patch(
            `${REMOVE_TRACK_FAVORITE_URL}${trackID}`,
            JSON.stringify({ trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    return (
        <div className="favorite-wrapper">
            <div className="favorite-header text-white d-flex align-items-center">
                <span className="favorite-title">Danh sách yêu thích</span>
            </div>
            <div className="favorite-content">
                <div className="favorite-data-header d-flex text-white border-bottom">
                    <div className="favorite-index-header ms-5 me-5">#</div>
                    <div className="favorite-title-header ms-3">TIÊU ĐỀ</div>
                    <div className="favorite-created-at">NGÀY TẠO</div>
                    <div className="favorite-duration">
                        <FontAwesomeIcon
                            icon={faClockFour}
                            color="white"
                            className="favorite-clock-font"
                            title="duration"
                        />
                    </div>
                </div>
                <div className="favorite-data-content d-flex flex-column">
                    {trackInFavorite.map((track, index) => (
                        <div className="favorite-data-show d-flex flex-row">
                            <Track
                                key={track._id}
                                item={track}
                                itemIndex={index}
                            />
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
                        onSubmit={searchHandler}
                    >
                        <input
                            type="text"
                            className="favorite-add-tracks-input border-0"
                            placeholder="Bạn muốn nghe gì?"
                            aria-invalid="false"
                            autoCapitalize="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="black"
                            className="favorite-add-tracks-icon rounded ms-1 border-dark"
                        />
                    </form>
                    <div className="find-tracks d-flex flex-column text-white">
                        {favoriteAddTrack.map((track, index) => (
                            <div className="add-track-container d-flex flex-row">
                                <Track
                                    key={track._id}
                                    item={track}
                                    itemIndex={index}
                                />
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
