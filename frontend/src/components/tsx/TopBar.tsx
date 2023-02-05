import {
    faCircleChevronLeft,
    faMagnifyingGlass,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTracksContext } from '../../context/TracksContextProvider';
import { useSearchTracksContext } from '../../context/SearchTracksContextProvider';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import '../css/topbar.css';
const LOGOUT_URL = '/auth/logout';
const SEARCH_URL = '/track/search/?title=';
const SEARCH_ARTIST_URL = '/artist/search/?name=';

const TopBar = () => {
    const { auth } = useAuth();
    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;
    const [title, setTitle] = useState('');
    const location = useLocation().pathname;
    const isActive = location === '/search';
    const searchFormShow = isActive
        ? 'search-container-active'
        : 'search-container-hidden';
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const { updateSearchTracksContextState } = useSearchTracksContext();

    useEffect(() => {
        const listTrack: any[] = [];
        if (title !== '' && listTrack.length < 10) {
            axios
                .get(`${SEARCH_URL}${title}`, { withCredentials: true })
                .then((response) => {
                    const tracksSearch = response?.data?.tracks;
                    for (const track of tracksSearch) {
                        listTrack.push(track);
                    }
                    axios
                        .get(`${SEARCH_ARTIST_URL}${title}`, {
                            withCredentials: true
                        })
                        .then((response) => {
                            const users = response?.data?.artists;
                            for (const user of users) {
                                for (const trackInTracks in user.tracks) {
                                    const trackIndex = tracks.findIndex(
                                        (track: any) =>
                                            track._id ===
                                            user.tracks[trackInTracks]
                                    );
                                    listTrack.push(tracks[trackIndex]);
                                }
                                updateSearchTracksContextState({
                                    searchTracks: listTrack
                                });
                            }
                        });
                });
        } else {
            axios
                .get(`${SEARCH_ARTIST_URL}${title}`, { withCredentials: true })
                .then(() => {
                    updateSearchTracksContextState({
                        searchTracks: []
                    });
                });
        }
    }, [title]);

    const logoutHandler = () => {
        axios
            .post(LOGOUT_URL, JSON.stringify({}), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                window.location.reload();
            });
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
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="black"
                            className="search-icon rounded ms-1 me-2 border-dark"
                        />
                        <input
                            type="search"
                            className="search-input border-0"
                            placeholder="Bạn muốn nghe gì?"
                            aria-invalid="false"
                            autoCapitalize="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                </div>
                <div className="dropdown-container d-flex position-absolute rounded-circle">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary"
                            className="dropdown d-flex align-items-center rounded-5"
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
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logoutHandler}>
                                Đăng xuất
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
