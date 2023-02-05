import { ReactElement, useState, useEffect } from 'react';
import { useTrackContext } from '../../context/TrackContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import axios from '../../api/axios';
import '../css/home.css';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';

const Home = (): ReactElement => {
    const { updateTrackContextState } = useTrackContext();
    const [lastTrackActive, setLastTrackActive] = useState(false);
    const [listRecentTrack, setListRecentTrack] = useState<any>([]);
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const {
        trackContextState: { selectedTrackId }
    } = useTrackContext();
    const [lastTrackId, setLastTrackId] = useState(selectedTrackId);

    useEffect(() => {
        setLastTrackId(selectedTrackId);
        if (lastTrackId !== undefined) {
            setLastTrackActive(true);
        }
    });

    const setLastPlaying = (trackId: string) => () => {
        axios
            .patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                updateTrackContextState({ selectedTrackId: trackId });
            });
    };

    const lastTrackIndex = tracks.findIndex(
        (track: any) => track._id === lastTrackId
    );
    const lastTrack = tracks[lastTrackIndex];

    useEffect(() => {
        let newListRecentTrack: any = [];
        if (tracks.length >= 6) {
            newListRecentTrack = tracks.slice(-6, -1);
            newListRecentTrack.push(tracks[tracks.length - 1]);
        } else {
            newListRecentTrack = tracks;
        }
        newListRecentTrack.reverse();
        setListRecentTrack(newListRecentTrack);
    }, [tracks]);

    return (
        <div className="home-wrapper overflow-auto">
            <div className="home-content">
                {lastTrackActive ? (
                    <div className="last-track-container">
                        <div className="last-play-title text-white">
                            Bài hát gần đây
                        </div>
                        <div className="last-play-track-wrapper d-flex flex-row align-items-center rounded-3">
                            <div className="last-play-track-image-wrapper">
                                <img
                                    src={lastTrack?.themeUrl}
                                    alt=""
                                    className="last-play-track-img rounded-1"
                                />
                            </div>
                            <div className="last-play-track-info ms-4 d-flex flex-column">
                                <div className="last-play-track-title text-white">
                                    {lastTrack?.title}
                                </div>
                                <div className="last-play-track-artist">
                                    {lastTrack?.artists[0]?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="lastTrack"></div>
                )}
                <div className="new-track-container text-white mt-5 d-flex flex-column">
                    <div className="new-tracks-title">Những bài hát mới</div>
                    <div className="new-tracks-container d-flex flex-row mt-3">
                        {listRecentTrack.map((track: any) => (
                            <div
                                className="new-track-wrapper d-flex flex-column rounded-3 align-items-center"
                                key={track._id}
                                onClick={setLastPlaying(track?._id)}
                            >
                                <div className="new-track-home-img-wrapper d-flex">
                                    <img
                                        src={track?.themeUrl}
                                        alt=""
                                        className="track-home-img rounded-3"
                                    />
                                </div>
                                <div className="new-track-home-info mt-3 d-flex flex-column ms-3">
                                    <div className="new-track-home-title">
                                        {track?.title}
                                    </div>
                                    <div className="new-track-home-artist mt-2">
                                        {track?.artists[0]?.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
