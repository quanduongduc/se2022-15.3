import { ReactElement } from 'react';
import { useTracksContext } from '../../context/TracksContextProvider';
import useAuth from '../../hooks/useAuth';
import '../css/home.css';

const Home = (): ReactElement => {
    const { auth } = useAuth();
    const lastTrackId = auth?.user?.lastPlay?._id;
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const lastTrackIndex = tracks.findIndex(
        (track: any) => track._id === lastTrackId
    );
    const lastTrack = tracks[lastTrackIndex];

    const listRecentTrack: any = [];
    const recentTracks = (listTrack: any, count: number) => {
        let recentTrack = listTrack[0];
        for (const track of listTrack)
            if (track.updated_at > recentTrack.updated_at) recentTrack = track;

        listRecentTrack.push(recentTrack);
        listTrack = listTrack.filter(
            (track: any) => track.updated_at !== recentTrack.updated_at
        );
        count++;

        if (count < 6) {
            recentTracks(listTrack, count);
        }
    };
    recentTracks(tracks, 0);

    return (
        <div className="home-wrapper">
            <div className="home-content overflow-auto">
                <div className="last-play-track-container text-white">
                    <div className="last-play-title">Bài hát gần đây</div>
                    <div className="last-play-track-wrapper d-flex flex-row align-items-center rounded-3">
                        <div className="last-play-track-image-wrapper">
                            <img
                                src={lastTrack.themeUrl}
                                alt=""
                                className="last-play-track-img rounded-1"
                            />
                        </div>
                        <div className="last-play-track-info ms-4 d-flex flex-column">
                            <div className="last-play-track-title">
                                {lastTrack.title}
                            </div>
                            <div className="last-play-track-artist">
                                {lastTrack.artists[0].name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="new-track-container text-white mt-5 d-flex flex-column">
                    <div className="new-tracks-title">Những bài hát mới</div>
                    <div className="new-tracks-container d-flex flex-row mt-3">
                        {listRecentTrack.map((track: any) => (
                            <div
                                className="new-track-wrapper d-flex flex-column rounded-3"
                                key={track._id}
                            >
                                <div className="new-track-home-img-wrapper d-flex">
                                    <img
                                        src={track.themeUrl}
                                        alt=""
                                        className="track-home-img rounded-3"
                                    />
                                </div>
                                <div className="new-track-home-info mt-3 d-flex flex-column ms-3">
                                    <div className="new-track-home-title d-flex">
                                        {track.title}
                                    </div>
                                    <div className="new-track-home-artist mt-2">
                                        {track.artists[0].name}
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
