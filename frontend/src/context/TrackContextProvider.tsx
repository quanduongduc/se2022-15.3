import {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState
} from 'react';
import useAuth from '../hooks/useAuth';
import { ITrackContext, TrackContextState } from '../types/type';

const defaultTrackContextState: TrackContextState = {
    selectedTrackId: undefined
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

    const { auth } = useAuth();
    useEffect(() => {
        if (auth?.user?.lastPlay) {
            updateTrackContextState({
                selectedTrackId: auth?.user?.lastPlay._id
            });
            console.log(auth?.user?.lastPlay._id);
        }
    }, [auth]);

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
