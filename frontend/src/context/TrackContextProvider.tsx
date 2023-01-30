import {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState
} from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { ITrackContext, TrackContextState } from '../types/type';
const USER_URL = '/user';

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
        axios
            .get(USER_URL, {
                withCredentials: true
            })
            .then((response) => {
                const userResponse = response?.data?.users;
                if (auth?.user) {
                    const userIndexResponse = userResponse.findIndex(
                        (user: any) => user._id === auth?.user._id
                    );
                    if (userResponse[userIndexResponse].lastPlay) {
                        const userTrackResponse =
                            userResponse[userIndexResponse].lastPlay._id;
                        if (
                            trackContextState.selectedTrackId !==
                            userTrackResponse
                        ) {
                            updateTrackContextState({
                                selectedTrackId: userTrackResponse
                            });
                        }
                    }
                }
            });
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
