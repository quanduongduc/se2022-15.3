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
    isFavorite: boolean;
}

export interface ITrackContext {
    trackContextState: TrackContextState;
    dispatchTrackAction: Dispatch<TrackReducerAction>;
}

export enum TrackReducerActionType {
    IsFavorite = 'IsFavorite',
    SetUserId = 'SetUserId',
    SetCurrentPlayingTrack = 'SetCurrentPlayingTrack'
}

export type TrackReducerAction =
    | { type: TrackReducerActionType.IsFavorite; payload: boolean }
    | {
          type: TrackReducerActionType.SetUserId;
          payload: Pick<TrackContextState, 'selectedUserId'>;
      }
    | {
          type: TrackReducerActionType.SetCurrentPlayingTrack;
          payload: Pick<TrackContextState, 'selectedTrackId' | 'isFavorite'>;
      };

export interface FavoriteTracksContextState {
    favoriteTracks: any[];
}

export interface IFavoriteTracksContext {
    favoriteTracksContextState: FavoriteTracksContextState;
}
