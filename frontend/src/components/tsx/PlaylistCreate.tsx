import { ReactElement, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import '../css/playlistCreate.css';
const PLAYLIST_CREATE_URL = '/playlist/create';
const PLAYLIST_URL = '/playlist/';

const PlaylistCreate = (): ReactElement => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const { updatePlaylistContextState } = usePlaylistContext();

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
                            updatePlaylistContextState({
                                selectedPlaylistId: playlistId,
                                selectedPlaylist: playlistResponse
                            });
                            navigate(PLAYLIST_URL);
                        });
                };
                setSelectedPlaylist(playListResponse?.data?.playlist._id);
                setTitle('');
                navigate('/playlist');
            })
            .catch((err) => {
                console.log(err?.response?.data);
            });
    };
    return (
        <div className="playlist-view-create-wrapper">
            <div className="playlist-view-create-container d-flex flex-column text-white align-items-center">
                <div className="playlist-view-create-header">
                    <div className="playlist-view-create-title mt-5">
                        tạo playlist
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
                                    className="name-playlist form-control border-dark rounded-3 me-3 ms-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <button className="create-playlist-btn rounded-4">
                                    Tạo playlist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCreate;
