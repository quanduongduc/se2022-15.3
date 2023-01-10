import { createContext, useContext, ReactNode, useState } from 'react';
import { ITrackContext, TrackContextState } from '../types/type';

const defaultTrackContextState: TrackContextState = {
    selectedTrackId: undefined,
    selectedTrack: null,
    isPlaying: false
};

export const TrackContext = createContext<ITrackContext>({
    trackContextState: defaultTrackContextState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateTrackContextState: () => {}
});

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }: { children: ReactNode }) => {
    const [trackContextState, setTrackContextState] = useState(
        defaultTrackContextState
    );

    const updateTrackContextState = (
        updatedObj: Partial<TrackContextState>
    ) => {
        setTrackContextState((previousTrackContextState) => ({
            ...previousTrackContextState,
            ...updatedObj
        }));
    };

    const trackContextProviderData = {
        trackContextState,
        updateTrackContextState
    };

    return (
        <TrackContext.Provider value={trackContextProviderData}>
            {children}
        </TrackContext.Provider>
    );
};

export default TrackContextProvider;
