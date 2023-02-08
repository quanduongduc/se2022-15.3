import { useNavigate } from 'react-router-dom';
import { ReactElement, SyntheticEvent, useState } from 'react';
import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import axios from '../../api/axios';
import '../css/playlistCreate.css';
const PLAYLIST_URL = '/playlist/';
const PLAYLIST_CREATE_URL = '/playlist/create';

const PlaylistCreate = (): ReactElement => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const {
        playlistContextState: { playlists },
        updatePlaylistContextState
    } = usePlaylistContext();

    const createPlaylistHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .post(PLAYLIST_CREATE_URL, JSON.stringify({ title }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then((playListResponse) => {
                const setSelectedPlaylist = async (playlistId: any) => {
                    axios
                        .get(`${PLAYLIST_URL}${playlistId}`, {
                            withCredentials: true
                        })
                        .then((response) => {
                            const playlistResponse = response?.data?.playlist;
                            const tracksResponse =
                                playListResponse?.data?.playlist.tracks;
                            updatePlaylistContextState({
                                selectedPlaylistId: playlistId,
                                selectedPlaylist: playlistResponse,
                                playlistTracks: tracksResponse
                            });
                            navigate(PLAYLIST_URL);
                        });
                };
                const newPlaylists = playlists.concat(
                    playListResponse?.data?.playlist
                );
                updatePlaylistContextState({ playlists: newPlaylists });
                setSelectedPlaylist(playListResponse?.data?.playlist._id);
                setTitle('');
                navigate('/playlist');
            });
    };
    return (
        <div className="playlist-view-create-container d-flex flex-column text-white align-items-center">
            <div className="playlist-view-create-header">
                <div className="playlist-view-create-title mt-5 ms-2">
                    Tạo playlist
                </div>
            </div>
            <div className="playlist-view-create-content-container d-flex flex-column">
                <div className="playlist-content d-flex flex-column">
                    <form onSubmit={createPlaylistHandler}>
                        <div className="create-playlist d-flex align-items-center">
                            <input
                                type="text"
                                aria-invalid="false"
                                placeholder="Nhập tên playlist"
                                autoCapitalize="off"
                                className="name-playlist form-control border-dark rounded-5 me-3 ms-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button className="create-playlist-btn rounded-5">
                                Tạo playlist
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCreate;
