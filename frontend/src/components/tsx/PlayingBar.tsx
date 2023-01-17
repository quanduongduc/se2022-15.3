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
import { ReactElement, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import { useTrackContext } from '../../context/TrackContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import useAuth from '../../hooks/useAuth';
import '../css/playingbar.css';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
const ADD_TRACK_TO_FAVORITE_URL = '/user/add-favourite/';
const REMOVE_TRACK_FAVORITE_URL = '/user/remove-favourite/';

const PlayingBar = (): ReactElement => {
    const { auth } = useAuth();
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const {
        trackContextState: { selectedTrackId },
        updateTrackContextState
    } = useTrackContext();

    const trackIndexLastPlay = tracks.findIndex(
        (track: any) => track._id === auth?.user.lastPlay._id
    );

    const trackInFavoriteLastPlay = auth?.user.favouriteTracks.findIndex(
        (track: any) => track._id === auth?.user.lastPlay._id
    );

    const checkIsFavorite = (trackIdIndex: number) => {
        if (trackIdIndex !== -1) return true;
        return false;
    };

    const [currentTrack, setcurrentTrack] = useState(trackIndexLastPlay);
    const [isRandom, setIsRandom] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [isFavorite, setIsFavorite] = useState(
        checkIsFavorite(trackInFavoriteLastPlay)
    );
    const title = tracks[currentTrack].title;
    const artists = tracks[currentTrack].artists[0];
    const themeUrl = tracks[currentTrack].themeUrl;
    const trackUrl = tracks[currentTrack].trackUrl;
    const audioRef = useRef(new Audio(trackUrl));
    const [trackInfo, setTrackInfo] = useState({
        currentTime: 0,
        duration: 0
    });

    const setLastPlaying = (trackId: string) => {
        axios.patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
    };

    const setSelectedTrack = (trackId: string) => {
        updateTrackContextState({ selectedTrackId: trackId });
    };

    const setTrackIndex = (trackId: string | undefined) => {
        return tracks.findIndex((track: any) => track._id === trackId);
    };

    const updateTimeHandler = (e: any) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setTrackInfo({ ...trackInfo, currentTime, duration });
    };

    const trackEndHandler = () => {
        const currentIndex = tracks.findIndex(
            (track) => track._id === tracks[currentTrack]._id
        );

        let nextTrack = (currentIndex + 1) % tracks.length;

        if (isRepeat) {
            nextTrack = currentIndex;
        }

        if (isRandom) {
            nextTrack = Math.floor(Math.random() * tracks.length);
        }

        setcurrentTrack(nextTrack);
        audioRef.current.play();
    };

    const playTrackHandler = () => {
        if (isPlaying) {
            setIsPlaying(!isPlaying);
            audioRef.current.pause();
        } else {
            setIsPlaying(!isPlaying);
            setLastPlaying(tracks[currentTrack]._id);
            audioRef.current.play();
        }
    };

    const togglePlayPauseIcon = () => {
        if (isPlaying) return faPause;
        return faPlay;
    };

    const playRepeatHandler = () => {
        setIsRepeat(!isRepeat);
    };

    const repeatclasName = () => {
        if (isRepeat) return 'repeat-font-active';
        return 'repeat-font';
    };

    const randomclassName = () => {
        if (isRandom) return 'random-font-active';
        return 'random-font';
    };

    const addTrackToFavorite = (trackID: string) => {
        axios.patch(
            `${ADD_TRACK_TO_FAVORITE_URL}${trackID}`,
            JSON.stringify({ trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    const removeTrackFromFavorite = (trackID: string) => {
        axios.patch(
            `${REMOVE_TRACK_FAVORITE_URL}${trackID}`,
            JSON.stringify({ trackID }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    };

    const favoriteHandler = () => {
        if (isFavorite) {
            removeTrackFromFavorite(tracks[currentTrack]._id);
            setIsFavorite(!isFavorite);
        } else {
            addTrackToFavorite(tracks[currentTrack]._id);
            setIsFavorite(!isFavorite);
        }
    };

    const heartClassName = () => {
        if (isFavorite) return 'favorite-font-active';
        return 'favorite-font';
    };

    const playRandomHandler = () => {
        setIsRandom(!isRandom);
    };

    const getTime = (time: any) => {
        const minute = Math.floor(time / 60);
        const second = ('0' + Math.floor(time % 60)).slice(-2);
        return `${minute}:${second}`;
    };

    const dragHandler = (e: any) => {
        audioRef.current.currentTime = e.target.value;
    };

    const skipTrackHandler = async (direction: any) => {
        const currentIndex = tracks.findIndex(
            (track) => track._id === selectedTrackId
        );

        if (direction === 'forward-step-btn') {
            setLastPlaying(tracks[(currentIndex + 1) % tracks.length]._id);
            setSelectedTrack(tracks[(currentIndex + 1) % tracks.length]._id);
            setcurrentTrack((currentIndex + 1) % tracks.length);
        } else if (direction === 'backward-step-btn') {
            if (currentIndex - 1 === -1) {
                setLastPlaying(tracks[tracks.length - 1]._id);
                setSelectedTrack(tracks[tracks.length - 1]._id);
                setcurrentTrack(tracks.length - 1);
            } else {
                setLastPlaying(tracks[(currentIndex - 1) % tracks.length]._id);
                setSelectedTrack(
                    tracks[(currentIndex - 1) % tracks.length]._id
                );
                setcurrentTrack((currentIndex - 1) % tracks.length);
            }
        }
        if (isPlaying) audioRef.current.play();
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="playingbar-wrapper">
            <div className="playingbar-form">
                <div className="playing-widget d-flex align-items-center">
                    <div className="widget-container">
                        <img src={themeUrl} alt="" className="track-img" />
                    </div>
                    <div className="song-info d-flex flex-column align-items-center text-white">
                        <div className="song-name  d-flex align-items-center">
                            <span className="song-name">{title}</span>
                        </div>
                        <div className="song-artist d-flex align-items-center">
                            <span className="song-artist">{artists.name}</span>
                        </div>
                    </div>
                    <button
                        className="favorite-btn justify-content-center"
                        onClick={favoriteHandler}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={heartClassName()}
                        />
                    </button>
                </div>
                <div className="playing-control-container d-flex align-items-center flex-column">
                    <div className="playing-control d-flex align-items-center flex-column">
                        <div className="playing-control-btn d-flex">
                            <div className="playing-control-left d-flex">
                                <button
                                    className="random-song-btn d-flex align-items-center mx-2"
                                    onClick={playRandomHandler}
                                >
                                    <FontAwesomeIcon
                                        icon={faShuffle}
                                        className={randomclassName()}
                                    />
                                </button>
                                <button
                                    className="backward-step-btn d-flex align-items-center justify-items-center mx-2"
                                    onClick={() =>
                                        skipTrackHandler('backward-step-btn')
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faBackwardStep}
                                        className="backward-font"
                                    />
                                </button>
                            </div>
                            <button
                                className="playing-btn d-flex align-items-center justify-items-center rounded-circle mx-2"
                                onClick={playTrackHandler}
                            >
                                <FontAwesomeIcon
                                    icon={togglePlayPauseIcon()}
                                    color="black"
                                    className="playing-font"
                                />
                            </button>
                            <div className="playing-control-right d-flex">
                                <button
                                    className="forward-step-btn d-flex align-items-center justify-items-center mx-2"
                                    onClick={() =>
                                        skipTrackHandler('forward-step-btn')
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faForwardStep}
                                        className="forward-font"
                                    />
                                </button>
                                <button
                                    className="repeat-btn d-flex align-items-center justify-items-center mx-2"
                                    onClick={playRepeatHandler}
                                >
                                    <FontAwesomeIcon
                                        icon={faRepeat}
                                        className={repeatclasName()}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="playing-progress-bar mt-2 d-flex text-white">
                            <p className="time-start me-3">
                                {getTime(trackInfo.currentTime || 0)}
                            </p>
                            <input
                                onChange={dragHandler}
                                min={0}
                                max={trackInfo.duration || 0}
                                value={trackInfo.currentTime}
                                type="range"
                                className="progress d-flex align-items-center"
                            />
                            <p className="time-duration ms-3">
                                {getTime(trackInfo.duration || 0)}
                            </p>
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
                        <input
                            type="range"
                            min={0}
                            max={100}
                            className="volume"
                        />
                    </div>
                </div>
            </div>
            <audio
                onLoadedMetadata={updateTimeHandler}
                onTimeUpdate={updateTimeHandler}
                onEnded={trackEndHandler}
                ref={audioRef}
                src={tracks[currentTrack].trackUrl}
            />
        </div>
    );
};

export default PlayingBar;
