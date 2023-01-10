import { ReactElement } from 'react';
import { useTracksContext } from '../../context/TracksContextProvider';
import Track from './Track';
import '../css/tracks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
const Tracks = (): ReactElement => {
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    return (
        <div className="tracks-container">
            <div className="tracks-header d-flex flex-column text-white align-items-center">
                <div className="tracks-title mt-5">Thư viện</div>
            </div>
            <div className="playlist-view-content-container d-flex flex-column">
                <div className="track-data-header d-flex text-white">
                    <div className="index-header me-5">#</div>
                    <div className="title-header">TIÊU ĐỀ</div>
                    <div className="created-at">NGÀY TẠO</div>
                    <div className="duration">
                        <FontAwesomeIcon
                            icon={faClockFour}
                            color="white"
                            className="clock-font"
                            title="duration"
                        />
                    </div>
                </div>
                <div className="playlist-track-content d-flex flex-column">
                    {tracks.map((track, index) => (
                        <Track key={track._id} item={track} itemIndex={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracks;
