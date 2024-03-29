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
import { useFavoriteTracksContext } from '../../context/FavoriteContextProvider';
import { useTrackContext } from '../../context/TrackContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import axios from '../../api/axios';
import '../css/playingbar.css';
import { usePlaylistContext } from '../../context/PlaylistContextProvider';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';
const ADD_TRACK_TO_FAVORITE_URL = '/user/add-favourite/';
const REMOVE_TRACK_FAVORITE_URL = '/user/remove-favourite/';

const PlayingBar = (): ReactElement => {
    const {
        tracksContextState: { tracks }
    } = useTracksContext();
    const {
        trackContextState: { selectedTrackId },
        updateTrackContextState
    } = useTrackContext();
    const {
        favoriteTracksContextState: { favoriteTracks },
        updateFavoriteTracksContextState
    } = useFavoriteTracksContext();

    const {
        playlistContextState: { selectedPlaylist }
    } = usePlaylistContext();

    const checkIsFavorite = (trackId: string) => {
        const trackIndex = favoriteTracks.findIndex(
            (track: any) => track._id === trackId
        );
        if (trackIndex !== -1) return true;
        return false;
    };
    const [hidden, setHidden] = useState(selectedTrackId === undefined);
    const [currentTrack, setcurrentTrack] = useState<any>(
        tracks.findIndex((track: any) => track._id === selectedTrackId)
    );
    const [isRandom, setIsRandom] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [isFavorite, setIsFavorite] = useState(selectedTrackId === undefined);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(1);
    const [trackInfo, setTrackInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    const [currentPage, setCurrentPage] = useState('/');
    const [tracksPlaying, setTracksPlaying] = useState<any>(tracks);

    useEffect(() => {
        setCurrentPage(window.location.pathname);
    }, [selectedTrackId]);

    useEffect(() => {
        let newTracks: any = [];
        if (currentPage === '/favorite' && favoriteTracks.length > 0) {
            for (const trackF of favoriteTracks) {
                const newTrack = tracks.findIndex(
                    (track: any) => trackF._id === track._id
                );
                newTracks.push(tracks[newTrack]);
            }
        } else if (
            currentPage === '/playlist/' &&
            selectedPlaylist.tracks.length > 0
        ) {
            newTracks = selectedPlaylist.tracks;
        } else {
            newTracks = tracks;
        }
        setTracksPlaying(newTracks);
    }, [currentPage, selectedTrackId, favoriteTracks, tracks]);

    useEffect(() => {
        if (selectedTrackId !== undefined) {
            const trackPlay = tracksPlaying.findIndex(
                (track: any) => track._id === selectedTrackId
            );
            setcurrentTrack(trackPlay);
            setIsFavorite(checkIsFavorite(tracksPlaying[trackPlay]?._id));
            setLastPlaying(tracksPlaying[trackPlay]?._id);
            setHidden(false);
        }
    }, [selectedTrackId, tracksPlaying]);

    const setLastPlaying = (trackId: string | any) => {
        axios.patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
    };

    const setSelectedTrack = (trackId: string) => {
        updateTrackContextState({ selectedTrackId: trackId });
    };

    const newFavoriteTrack = (trackID: string) => {
        const trackIndex = tracksPlaying.findIndex(
            (track: any) => track._id === trackID
        );
        return tracksPlaying[trackIndex];
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
        const newFavoriteTracks = favoriteTracks.concat(
            newFavoriteTrack(trackID)
        );
        updateFavoriteTracksContextState({
            favoriteTracks: newFavoriteTracks
        });
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
        const newFavoriteTracks = favoriteTracks.filter(
            (track) => track._id !== trackID
        );
        updateFavoriteTracksContextState({
            favoriteTracks: newFavoriteTracks
        });
    };

    const updateTimeHandler = (e: any) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setTrackInfo({ ...trackInfo, currentTime, duration });
    };

    const getTime = (time: any) => {
        const minute = Math.floor(time / 60);
        const second = ('0' + Math.floor(time % 60)).slice(-2);
        return `${minute}:${second}`;
    };

    const togglePlayPauseIcon = () => {
        if (isPlaying) return faPause;
        return faPlay;
    };

    const playTrackHandler = () => {
        if (isPlaying) {
            setIsPlaying(!isPlaying);
        } else {
            setIsPlaying(!isPlaying);
            setLastPlaying(tracksPlaying[currentTrack]._id);
        }
    };

    const repeatclasName = () => {
        if (isRepeat) return 'repeat-font-active';
        return 'repeat-font';
    };

    const playRepeatHandler = () => {
        setIsRepeat(!isRepeat);
    };

    const randomclassName = () => {
        if (isRandom) return 'random-font-active';
        return 'random-font';
    };

    const runSongName = () => {
        if (isPlaying) return 'song-name-active';
        return 'song-name';
    };

    const playRandomHandler = () => {
        setIsRandom(!isRandom);
    };

    const heartClassName = () => {
        if (isFavorite) return 'favorite-font-active';
        return 'favorite-font';
    };

    const favoriteHandler = () => {
        if (isFavorite) {
            removeTrackFromFavorite(tracksPlaying[currentTrack]._id);
            setIsFavorite(!isFavorite);
        } else {
            addTrackToFavorite(tracksPlaying[currentTrack]._id);
            setIsFavorite(!isFavorite);
        }
    };

    const setFeaturePlaying = (currentIndex: number) => {
        let nextTrack = (currentIndex + 1) % tracksPlaying.length;

        if (isRepeat) {
            nextTrack = currentIndex;
            if (audioRef.current !== null) {
                if (isPlaying) audioRef.current.play();
            }
        }

        if (isRandom) {
            nextTrack = Math.floor(Math.random() * tracksPlaying.length);
        }
        setSelectedTrack(tracksPlaying[nextTrack]._id);
    };

    const trackEndHandler = () => {
        const currentIndex = tracksPlaying.findIndex(
            (track: any) => track._id === tracksPlaying[currentTrack]._id
        );
        setFeaturePlaying(currentIndex);
    };

    const dragHandler = (e: any) => {
        if (audioRef.current !== null) {
            audioRef.current.currentTime = e.target.value;
        }
    };

    const skipTrackHandler = async (direction: any) => {
        const currentIndex = tracksPlaying.findIndex(
            (track: any) => track._id === selectedTrackId
        );

        if (direction === 'forward-step-btn') {
            setFeaturePlaying(currentIndex);
        } else if (direction === 'backward-step-btn') {
            let backTrack = tracksPlaying[tracksPlaying.length - 1]._id;

            if (currentIndex - 1 === -1) {
                setSelectedTrack(backTrack);
            } else {
                backTrack =
                    tracksPlaying[(currentIndex - 1) % tracksPlaying.length]
                        ._id;
                setSelectedTrack(backTrack);
            }
            setIsFavorite(checkIsFavorite(backTrack));
            setLastPlaying(backTrack);
        }
    };

    useEffect(() => {
        if (currentTrack !== undefined && audioRef.current !== null) {
            if (isPlaying) {
                audioRef?.current?.play();
            } else {
                audioRef?.current?.pause();
            }
            audioRef.current.volume = volume;
        }
    }, [currentTrack, isPlaying, volume]);
    if (!hidden) {
        return (
            <div className="playingbar-wrapper">
                <div className="playingbar-form">
                    <div className="playing-widget d-flex align-items-center">
                        <div className="widget-container">
                            <img
                                src={tracksPlaying[currentTrack]?.themeUrl}
                                alt=""
                                className="track-playingbar-img"
                            />
                        </div>
                        <div className="song-info d-flex flex-column align-items-center text-white">
                            <div className="song-name-wrapper  d-flex align-items-center">
                                <span className={runSongName()}>
                                    {tracksPlaying[currentTrack]?.title}
                                </span>
                            </div>
                            <div className="song-artist d-flex align-items-center">
                                <span className="song-artist">
                                    {
                                        tracksPlaying[currentTrack]?.artists[0]
                                            ?.name
                                    }
                                </span>
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
                                            skipTrackHandler(
                                                'backward-step-btn'
                                            )
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
                                max={1}
                                step={0.01}
                                className="volume"
                                value={volume}
                                onChange={(e) => setVolume(+e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <audio
                    onLoadedMetadata={updateTimeHandler}
                    onTimeUpdate={updateTimeHandler}
                    onEnded={trackEndHandler}
                    ref={audioRef}
                    src={tracksPlaying[currentTrack]?.trackUrl}
                />
            </div>
        );
    } else {
        return (
            <div className="playingbar-wrapper">
                <div className="playingbar-form"></div>
            </div>
        );
    }
};

export default PlayingBar;
