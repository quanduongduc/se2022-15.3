import { ReactElement } from 'react';
import '../css/mainview.css';

const MainView = (): ReactElement => {
    return (
        <div className="main-view-wrapper">
            <div className="main-view-scroll-wrapper-node-child-spacer"></div>
            <div className="main-view-scroll-wrapper-node-child"></div>
        </div>
    );
};

export default MainView;
