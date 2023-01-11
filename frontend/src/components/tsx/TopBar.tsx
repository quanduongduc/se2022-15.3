import {
    faCaretDown,
    faCircleChevronLeft,
    faMagnifyingGlass,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, SyntheticEvent } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import '../css/topbar.css';
const SEARCH_URL = '/track/search/?title=';

const TopBar = () => {
    const { auth } = useAuth();
    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;
    const [title, setTitle] = useState('');

    const searchHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        axios
            .get(`${SEARCH_URL}${title}`, { withCredentials: true })
            .then((response) => {
                console.log(response?.data);
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
                <div className="search-container d-flex align-items-center">
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
                    <button className="account-btn d-flex flex-row rounded-4">
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
