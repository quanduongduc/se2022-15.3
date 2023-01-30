import { ReactElement } from 'react';
import { useTracksContext } from '../../context/TracksContextProvider';
import Track from './Track';
import '../css/tracks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import { useTrackContext } from '../../context/TrackContextProvider';
import axios from '../../api/axios';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
const Tracks = (): ReactElement => {
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const { updateTrackContextState } = useTrackContext();

    const setSelectedTrack = (trackId: string) => () => {
        updateTrackContextState({ selectedTrackId: trackId });
    };

    const setLastPlaying = (trackId: string | any) => () => {
        axios.patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        setSelectedTrack(trackId);
    };

    return (
        <div className="tracks-container">
            <div className="tracks-header d-flex flex-column text-white align-items-center">
                <div className="tracks-title mt-5">Thư viện</div>
            </div>
            <div className="playlist-view-content-container d-flex flex-column">
                <div className="track-data-header d-flex text-white">
                    <div className="index-header me-5">#</div>
                    <div className="title-header ms-3">TIÊU ĐỀ</div>
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
                        <div
                            className="set-track"
                            onClick={setLastPlaying(track._id)}
                            key={track._id}
                        >
                            <Track item={track} itemIndex={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracks;
