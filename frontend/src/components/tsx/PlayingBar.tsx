import { faSpeakerDeck } from '@fortawesome/free-brands-svg-icons';
import {
    faBackwardStep,
    faForwardStep,
    faHeart,
    faList,
    faMicrophoneLines,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faVolumeHigh
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import '../css/playingbar.css';

const PlayingBar = (): ReactElement => {
    return (
        <div className="playingbar-wrapper">
            <div className="playingbar-form">
                <div className="playing-widget d-flex align-items-center">
                    <div className="widget-container">
                        <div className="song-img text-white">img</div>
                    </div>
                    <div className="song-info d-flex flex-column align-items-center">
                        <div className="song-name  d-flex align-items-center text-white">
                            <span>CHẠY NGAY ĐI - Onionn Remix</span>
                        </div>
                        <div className="song-artist d-flex align-items-center">
                            artist
                        </div>
                    </div>
                    <button className="favorite-btn justify-content-center">
                        <FontAwesomeIcon
                            icon={faHeart}
                            color="white"
                            className="favorite-font"
                            title="Thêm vào danh sách yêu thích"
                        />
                    </button>
                </div>
                <div className="playing-control-container d-flex align-items-center flex-column">
                    <div className="playing-control d-flex align-items-center flex-column">
                        <div className="playing-control-btn d-flex">
                            <div className="playing-control-left d-flex">
                                <button className="random-song-btn d-flex align-items-center mx-2">
                                    <FontAwesomeIcon
                                        icon={faShuffle}
                                        className="random-font"
                                    />
                                </button>
                                <button className="backward-step-btn d-flex align-items-center justify-items-center mx-2">
                                    <FontAwesomeIcon
                                        icon={faBackwardStep}
                                        className="backward-font"
                                    />
                                </button>
                            </div>
                            <button className="playing-btn d-flex align-items-center justify-items-center rounded-circle mx-2">
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    color="black"
                                    className="playing-font"
                                />
                            </button>
                            <div className="playing-control-right d-flex">
                                <button className="forward-step-btn d-flex align-items-center justify-items-center mx-2">
                                    <FontAwesomeIcon
                                        icon={faForwardStep}
                                        className="forward-font"
                                    />
                                </button>
                                <button className="repeat-btn d-flex align-items-center justify-items-center mx-2">
                                    <FontAwesomeIcon
                                        icon={faRepeat}
                                        className="repeat-font"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="playing-progress-bar mt-2 d-flex">
                            load
                        </div>
                    </div>
                </div>
                <div className="other-feature d-flex align-content-center justify-content-center flex-wrap">
                    <div className="features-container d-flex align-content-center flex-row">
                        <button className="singer-btn mx-1">
                            <FontAwesomeIcon
                                icon={faMicrophoneLines}
                                color="white"
                                className="playing-font"
                                title="Lời bài hát"
                            />
                        </button>
                        <button className="list-btn mx-2">
                            <FontAwesomeIcon
                                icon={faList}
                                color="white"
                                className="playing-font"
                                title="Danh sách chờ"
                            />
                        </button>
                        <button className="speaker-deck-btn mx-2">
                            <FontAwesomeIcon
                                icon={faSpeakerDeck}
                                color="white"
                                className="playing-font"
                            />
                        </button>
                        <button className="speaker-btn mx-2">
                            <FontAwesomeIcon
                                icon={faVolumeHigh}
                                color="white"
                                className="playing-font"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayingBar;
