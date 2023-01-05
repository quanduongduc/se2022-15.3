import { ReactElement } from 'react';
import '../css/playingbar.css';

const PlayingBar = (): ReactElement => {
    return (
        <div className="playingbar-wrapper">
            <div className="playing-widget"></div>
            <div className="playing-control"></div>
            <div className="other-feature"></div>
        </div>
    );
};

export default PlayingBar;
