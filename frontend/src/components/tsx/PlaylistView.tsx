import {
    faClockFour,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SyntheticEvent, useState } from 'react';
import axios from '../../api/axios';

import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import '../css/playlistView.css';
import Track from './Track';
const SEARCH_URL = '/track/search/?title=';
const PLAYLIST_URL = '/playlist';

const PlaylistView = () => {
    const [playlistAddTrack, setPlaylistAddTrack] = useState<any[]>([]);
    const {
        playlistContextState: { selectedPlaylist, selectedPlaylistId }
    } = usePlaylistContext();

    const [title, setTitle] = useState('');

    const searchHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        axios
            .get(`${SEARCH_URL}${title}`, { withCredentials: true })
            .then((response) => {
                setPlaylistAddTrack(response?.data?.tracks);
            });
    };

    const addTrackToPlaylist = (trackID: string) => () => {
        axios.patch(
            `${PLAYLIST_URL}/${selectedPlaylistId}/add-track/${trackID}`,
            JSON.stringify({ selectedPlaylistId, trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    const removeTrackFromPlaylist = (trackID: string) => () => {
        axios.patch(
            `${PLAYLIST_URL}/${selectedPlaylistId}/remove-track/${trackID}`,
            JSON.stringify({ selectedPlaylistId, trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    if (!selectedPlaylist) return null;

    return (
        <div className="playlist-view-wrapper d-flex flex-column text-white">
            <div className="playlist-view-header align-items-center">
                <div className="playlist-view-title mt-5">
                    {selectedPlaylist.title}
                </div>
            </div>
            <div className="playlist-view-content-container d-flex flex-column">
                <div className="playlist-data-header d-flex text-white">
                    <div className="playlist-view-index-header me-5">#</div>
                    <div className="playlist-view-title-header">TIÊU ĐỀ</div>
                    <div className="playlist-view-created-at">NGÀY TẠO</div>
                    <div className="playlist-view-duration">
                        <FontAwesomeIcon
                            icon={faClockFour}
                            color="white"
                            className="clock-font"
                            title="duration"
                        />
                    </div>
                </div>
                <div className="track-content d-flex flex-column">
                    {selectedPlaylist.tracks.map((track: any, index: any) => (
                        <div className="playlist-show-container d-flex flex-row">
                            <Track
                                key={track._id}
                                item={track}
                                itemIndex={index}
                            />
                            <button
                                className="playlist-remove-track-btn rounded-5 mt-4 text-white"
                                onClick={removeTrackFromPlaylist(track._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
                <div className="playlist-add-track-container mt-5">
                    <form
                        className="playlist-add-tracks-form d-flex rounded-5 align-items-center border-dark"
                        onSubmit={searchHandler}
                    >
                        <input
                            type="text"
                            className="playlist-add-tracks-input border-0"
                            placeholder="Bạn muốn nghe gì?"
                            aria-invalid="false"
                            autoCapitalize="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="black"
                            className="playlist-add-tracks-icon rounded ms-1 border-dark"
                        />
                    </form>
                    <div className="playlist-find-tracks d-flex flex-column text-white">
                        {playlistAddTrack.map((track, index) => (
                            <div className="playlist-track-container d-flex flex-row">
                                <Track
                                    key={track._id}
                                    item={track}
                                    itemIndex={index}
                                />
                                <button
                                    className="playlist-add-track-btn rounded-5 mt-4 text-white"
                                    onClick={addTrackToPlaylist(track._id)}
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

export default PlaylistView;
