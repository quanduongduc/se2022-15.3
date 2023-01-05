import { ReactElement } from 'react';
import '../css/sidebar.css';
import Logo from '../../image/logo.png';

const Sidebar = (): ReactElement => {
    return (
        <div className="sidebar-wrapper">
            <div className="title-wrapper w-100 pt-2 pb-3">
                <div className="logo mx-1">
                    <img src={Logo} className="img" />
                </div>
                <div className="title text-white px-0 fs-3 pt-1">Salyr</div>
            </div>
            <ul className="menu-item text-white mt-4">
                <li>Trang chủ</li>
                <li>Tìm Kiếm</li>
                <li>Thư viện</li>
            </ul>
            <div className="playlist"></div>
        </div>
    );
};

export default Sidebar;
