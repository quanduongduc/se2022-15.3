import { ReactElement } from 'react';
import '../css/sidebar.css';
import Logo from '../../image/logo.png';
import SidebarButton from './SidebarButton';
import {
    faHeart,
    faHouse,
    faList,
    faMagnifyingGlass,
    faSquarePlus
} from '@fortawesome/free-solid-svg-icons';
import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const PLAYLIST_URL = '/playlist/';

const Sidebar = (): ReactElement => {
    const navigate = useNavigate();

    const {
        playlistContextState: { playlists },
        updatePlaylistContextState
    } = usePlaylistContext();

    const setSelectedPlaylist = async (playlistId: any) => {
        axios
            .get(`${PLAYLIST_URL}${playlistId}`, { withCredentials: true })
            .then((response) => {
                const playlistResponse = response?.data?.playlist;
                updatePlaylistContextState({
                    selectedPlaylistId: playlistId,
                    selectedPlaylist: playlistResponse
                });
                navigate(PLAYLIST_URL);
            });
    };

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-title-wrapper w-100 pt-3 mb-4">
                <div className="sidebar-logo">
                    <img src={Logo} className="sidebar-img me-1" />
                </div>
                <div className="sidebar-title text-white px-0 fs-3 pt-1">
                    Salyr
                </div>
            </div>
            <div className="menu-item mt-4 ml-3">
                <SidebarButton
                    name="home-page"
                    title="Trang chủ"
                    to="/"
                    icon={faHouse}
                />
                <SidebarButton
                    name="search-page"
                    title="Tìm kiếm"
                    to="/search"
                    icon={faMagnifyingGlass}
                />
                <SidebarButton
                    name="library-page"
                    title="Thư viện"
                    to="/collection"
                    icon={faList}
                />
            </div>
            <div className="playlist-bar mt-3">
                <SidebarButton
                    name="playlist-page"
                    title="Tạo playlist"
                    to="/playlist/create"
                    icon={faSquarePlus}
                />
                <SidebarButton
                    name="playlist-page"
                    title="Danh sách yêu thích"
                    to="/favorite"
                    icon={faHeart}
                />
                <div className="scroll-playlist d-flex justify-content-start flex-column ">
                    <div className="list-playlist-container ms-4">
                        {playlists.map(({ _id, title }) => (
                            <p
                                key={_id}
                                className="playlist-title"
                                onClick={() => {
                                    setSelectedPlaylist(_id);
                                }}
                            >
                                {title}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
