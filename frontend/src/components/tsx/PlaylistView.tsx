import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { usePlaylistContext } from '../../context/PlaylistContextProvider';
import '../css/playlistView.css';
import Track from './Track';

const PlaylistView = () => {
    const {
        playlistContextState: { selectedPlaylist }
    } = usePlaylistContext();

    if (!selectedPlaylist) return null;

    return (
        <div className="playlist-view-wrapper d-flex flex-column text-white align-items-center">
            <div className="playlist-view-header">
                <div className="playlist-view-title mt-5">
                    {selectedPlaylist.title}
                </div>
            </div>
            <div className="playlist-view-content-container d-flex flex-column">
                <div className="playlist-data-header d-flex text-white">
                    <div className="playlist-view-index-header me-5">#</div>
                    <div className="playlist-view-title-header">TIÊU ĐỀ</div>
                    <div className="playlist-view-created-at">NGÀY TẠO</div>
                    <div className="playlist-view-duration">
                        <FontAwesomeIcon
                            icon={faClockFour}
                            color="white"
                            className="clock-font"
                            title="duration"
                        />
                    </div>
                </div>
                <div className="track-content d-flex flex-column">
                    {selectedPlaylist.tracks.map((track: any, index: any) => (
                        <Track key={track._id} item={track} itemIndex={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistView;
