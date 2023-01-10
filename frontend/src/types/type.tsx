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
    selectedTrackId?: string;
    selectedTrack: any | null;
    isPlaying: boolean;
}

export interface ITrackContext {
    trackContextState: TrackContextState;
    updateTrackContextState: (updatedObj: Partial<TrackContextState>) => void;
}
