/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, ReactNode, useReducer } from 'react';
import { trackReducer } from '../reducers/trackReducer';
import { ITrackContext, TrackContextState } from '../types/type';

const defaultTrackContextState: TrackContextState = {
    selectedUserId: undefined,
    selectedTrackId: undefined,
    selectedTrack: null,
    isPlaying: false,
    isFavourite: false
};

export const TrackContext = createContext<ITrackContext>({
    trackContextState: defaultTrackContextState,
    dispatchTrackAction: () => {}
});

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }: { children: ReactNode }) => {
    const [trackContextState, dispatchTrackAction] = useReducer(
        trackReducer,
        defaultTrackContextState
    );

    const trackContextProviderData = {
        trackContextState,
        dispatchTrackAction
    };

    return (
        <TrackContext.Provider value={trackContextProviderData}>
            {children}
        </TrackContext.Provider>
    );
};

export default TrackContextProvider;
