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
}

export interface ITrackContext {
    trackContextState: TrackContextState;
    updateTrackContextState: (updatedObj: Partial<TrackContextState>) => void;
}

export enum TrackReducerActionType {
    SetUserId = 'SetUserId',
    SetLastPlayingTrack = 'SetLastPlayingTrack'
}

export type TrackReducerAction =
    | {
          type: TrackReducerActionType.SetUserId;
          payload: Pick<TrackContextState, 'selectedUserId'>;
      }
    | {
          type: TrackReducerActionType.SetLastPlayingTrack;
          payload: Pick<TrackContextState, 'selectedTrackId'>;
      };

export interface FavoriteTracksContextState {
    favoriteTracks: any[];
}

export interface IFavoriteTracksContext {
    favoriteTracksContextState: FavoriteTracksContextState;
}
