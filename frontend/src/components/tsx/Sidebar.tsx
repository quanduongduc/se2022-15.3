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
import { usePlaylistContext } from '../../context/PlaylistContext';

const Sidebar = (): ReactElement => {
    // const {
    //     playlistContextState: { playlists }
    // } = usePlaylistContext();

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
                    to="/playlist"
                    icon={faSquarePlus}
                />
                <SidebarButton
                    name="playlist-page"
                    title="Danh sách yêu thích"
                    to="/favorite"
                    icon={faHeart}
                />
                <div className="scroll-playlist d-flex justify-content-start flex-column ">
                    <li className="playlist-child">1</li>
                    <li className="playlist-child">2</li>
                    <li className="playlist-child">3</li>
                    <li className="playlist-child">4</li>
                    <li className="playlist-child">5</li>
                    <li className="playlist-child">6</li>
                    <li className="playlist-child">7</li>
                    <li className="playlist-child">8</li>
                    <li className="playlist-child">9</li>
                    <li className="playlist-child">10</li>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
