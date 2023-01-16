import {
    TrackContextState,
    TrackReducerAction,
    TrackReducerActionType
} from '../types/type';

export const trackReducer = (
    state: TrackContextState,
    { type, payload }: TrackReducerAction
) => {
    switch (type) {
        case TrackReducerActionType.IsFavorite:
            return {
                ...state,
                isFavorite: payload
            };
        case TrackReducerActionType.SetUserId:
            // eslint-disable-next-line no-case-declarations
            const { selectedUserId } = payload;
            return {
                ...state,
                selectedUserId
            };
        case TrackReducerActionType.SetCurrentPlayingTrack:
            // eslint-disable-next-line no-case-declarations
            const { selectedTrackId, isFavorite } = payload;
            return {
                ...state,
                selectedTrackId,
                isFavorite
            };
    }
};
