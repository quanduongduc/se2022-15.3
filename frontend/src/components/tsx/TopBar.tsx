import {
    faCaretDown,
    faCircleChevronLeft,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import '../css/topbar.css';

const TopBar = () => {
    const { auth } = useAuth();
    const firstName = auth?.user?.firstName;
    const lastName = auth?.user?.lastName;

    return (
        <div className="topbar-wrapper">
            <div className="topbar-container d-flex align-items-center">
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
