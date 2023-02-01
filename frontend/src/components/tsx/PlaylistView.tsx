import {
    faClockFour,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useTrackContext } from '../../context/TrackContextProvider';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import '../css/playlistView.css';
import Track from './Track';
import { useTracksContext } from '../../context/TracksContextProvider';
const SEARCH_URL = '/track/search/?title=';
const PLAYLIST_URL = '/playlist';

const PlaylistView = () => {
    const [tracksSearch, settracksSearch] = useState<any[]>([]);
    const [playlistShowTracks, setPlaylistShowTracks] = useState<any[]>([]);
    const { updateTrackContextState } = useTrackContext();
    const [title, setTitle] = useState('');
    const {
        tracksContextState: { tracks }
    } = useTracksContext();
    const {
        playlistContextState: {
            selectedPlaylist,
            selectedPlaylistId,
            playlistTracks
        },
        updatePlaylistContextState
    } = usePlaylistContext();

    const setLastPlaying = (trackId: string | any) => () => {
        axios.patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        updateTrackContextState({ selectedTrackId: trackId });
    };

    useEffect(() => {
        if (title !== '') {
            axios
                .get(`${SEARCH_URL}${title}`, { withCredentials: true })
                .then((response) => {
                    let searchTracks = response?.data?.tracks;
                    for (const track of playlistShowTracks) {
                        searchTracks = searchTracks.filter(
                            (trackInSearch: any) =>
                                trackInSearch._id !== track._id
                        );
                    }
                    settracksSearch(searchTracks);
                });
        }
    }, [title]);

    useEffect(() => {
        const listTrack: any = [];
        for (const track of playlistTracks) {
            listTrack.push(track);
        }
        setPlaylistShowTracks(listTrack);
    }, [playlistTracks]);

    const newPlaylistTrack = (trackID: string) => {
        const trackIndex = tracks.findIndex(
            (track: any) => track._id === trackID
        );
        return tracks[trackIndex];
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

        const newPlaylistTracks = playlistTracks.concat(
            newPlaylistTrack(trackID)
        );

        updatePlaylistContextState({ playlistTracks: newPlaylistTracks });
        setPlaylistShowTracks(newPlaylistTracks);
        const newtracksSearch = tracksSearch.filter(
            (track) => track._id !== trackID
        );
        settracksSearch(newtracksSearch);
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

        const newPlaylistTracks = playlistTracks.filter(
            (track: any) => track._id !== trackID
        );
        updatePlaylistContextState({ playlistTracks: newPlaylistTracks });
        setPlaylistShowTracks(newPlaylistTracks);
    };

    if (!selectedPlaylist) return null;

    return (
        <div className="playlist-view-wrapper d-flex flex-column text-white">
            <div className="playlist-view-header align-items-center">
                <div className="playlist-view-title mt-5 ms-3">
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
                    {playlistShowTracks.map((track: any, index: any) => (
                        <div
                            className="playlist-show-container d-flex flex-row"
                            key={track._id}
                        >
                            <div
                                className="playlist-track-data-container"
                                onClick={setLastPlaying(track._id)}
                            >
                                <Track item={track} itemIndex={index} />
                            </div>
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
                        onSubmit={(e) => e.preventDefault()}
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
                        {tracksSearch.map((track, index) => (
                            <div
                                className="playlist-track-container d-flex flex-row"
                                key={track._id}
                            >
                                <Track item={track} itemIndex={index} />
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
