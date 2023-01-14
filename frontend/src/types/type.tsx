import { Dispatch } from 'react';

export interface TracksContextState {
    tracks: any[];
}

export interface ITracksContext {
    tracksContextState: TracksContextState;
}

export interface PlaylistContextState {
    playlists: any[];
    selectedPlaylistId: string | null;
    selectedPlaylist: any | null;
}

export interface IPlaylistContext {
    playlistContextState: PlaylistContextState;
    updatePlaylistContextState: (
        updatedObj: Partial<PlaylistContextState>
    ) => void;
}

export interface TrackContextState {
    selectedUserId?: string;
    selectedTrackId?: string;
    selectedTrack: any | null;
    isPlaying: boolean;
    isFavourite: boolean;
}

export interface ITrackContext {
    trackContextState: TrackContextState;
    dispatchTrackAction: Dispatch<TrackReducerAction>;
}

export enum TrackReducerActionType {
    ToggleIsPlaying = 'ToggleIsPlaying'
}

export type TrackReducerAction = {
    type: TrackReducerActionType.ToggleIsPlaying;
    payload: boolean;
};

export interface FavoriteTracksContextState {
    favoriteTracks: any[];
}

export interface IFavoriteTracksContext {
    favoriteTracksContextState: FavoriteTracksContextState;
}
