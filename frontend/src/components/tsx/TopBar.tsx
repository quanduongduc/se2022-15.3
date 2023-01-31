import {
    faCaretDown,
    faCircleChevronLeft,
    faMagnifyingGlass,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { useTracksContext } from '../../context/TracksContextProvider';
import useAuth from '../../hooks/useAuth';
import '../css/topbar.css';
const SEARCH_URL = '/track/search/?title=';
const SEARCH_ARTIST_URL = '/artist/search/?name=';

const TopBar = () => {
    const { auth } = useAuth();
    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;
    const [title, setTitle] = useState('');
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const searchHandler = (e: SyntheticEvent) => {
        const listTrack: any = [];
        e.preventDefault();
        axios
            .get(`${SEARCH_URL}${title}`, { withCredentials: true })
            .then((response) => {
                const tracks = response?.data?.tracks;
                for (const track of tracks) {
                    listTrack.push(track);
                }
            });
        axios
            .get(`${SEARCH_ARTIST_URL}${title}`, { withCredentials: true })
            .then((response) => {
                const users = response?.data?.users;
                for (const user of users) {
                    for (const trackInTracks in user.tracks) {
                        const trackIndex = tracks.findIndex(
                            (track: any) =>
                                track._id === user.tracks[trackInTracks]
                        );
                        listTrack.push(tracks[trackIndex]);
                    }
                }
            });
        console.log(listTrack);
    };
    const location = useLocation().pathname;
    const isActive = location === '/search';
    const searchFormShow = isActive
        ? 'search-container-active'
        : 'search-container-hidden';
    const logout = () => () => {
        console.log(document.cookie);
        document.cookie =
            'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    return (
        <div className="topbar-wrapper">
            <div className="topbar-container d-flex flex-row align-items-center">
                <div className="btn-container ms-3">
                    <button className="back-btn" title="Quay lại">
                        <FontAwesomeIcon
                            icon={faCircleChevronLeft}
                            color="white"
                            size="2x"
                            className="account-icon rounded"
                        />
                    </button>
                </div>
                <div className={searchFormShow}>
                    <form
                        className="search-form d-flex form-control rounded-5 align-items-center border-dark"
                        onSubmit={searchHandler}
                    >
                        <input
                            type="text"
                            className="search-input border-0"
                            placeholder="Bạn muốn nghe gì?"
                            aria-invalid="false"
                            autoCapitalize="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="black"
                            className="search-icon rounded ms-1 border-dark"
                        />
                    </form>
                </div>
                <div className="topbar-account d-flex align-items-center">
                    <button
                        className="account-btn d-flex flex-row rounded-4"
                        onClick={logout()}
                    >
                        <div className="icon-container d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon
                                icon={faUser}
                                color="white"
                                className="account-icon rounded"
                            />
                        </div>
                        <span className="name text-white ms-2 me-3">
                            {firstName + ' ' + lastName}
                        </span>
                        <div className="caret-down-container align-items-center float-end">
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                color="white"
                                className="account-icon rounded"
                            />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
