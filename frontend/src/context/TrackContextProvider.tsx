import {
    createContext,
    useContext,
    ReactNode,
    useReducer,
    useEffect
} from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { trackReducer } from '../reducers/trackReducer';
import {
    ITrackContext,
    TrackContextState,
    TrackReducerActionType
} from '../types/type';
const USER_URL = 'user';

const defaultTrackContextState: TrackContextState = {
    selectedUserId: undefined,
    selectedTrackId: undefined,
    isFavorite: false
};

export const TrackContext = createContext<ITrackContext>({
    trackContextState: defaultTrackContextState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatchTrackAction: () => {}
});

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }: { children: ReactNode }) => {
    const [trackContextState, dispatchTrackAction] = useReducer(
        trackReducer,
        defaultTrackContextState
    );

    const { auth } = useAuth();

    useEffect(() => {
        const userId = auth?.user?._id;
        if (userId) {
            dispatchTrackAction({
                type: TrackReducerActionType.SetUserId,
                payload: { selectedUserId: userId }
            });
        }
    }, [auth]);

    useEffect(() => {
        axios.get(USER_URL, { withCredentials: true }).then((response) => {
            const userResponse = response?.data?.users;
            if (auth?.user) {
                const userIndexResponse = userResponse.findIndex(
                    (user: any) => user._id === auth?.user._id
                );
                const isTrackFavorite = userResponse[
                    userIndexResponse
                ].favouriteTracks.includes(
                    userResponse[userIndexResponse].lastPlay
                );

                dispatchTrackAction({
                    type: TrackReducerActionType.SetCurrentPlayingTrack,
                    payload: {
                        selectedTrackId:
                            userResponse[userIndexResponse].lastPlay._id,
                        isFavorite: isTrackFavorite
                    }
                });
            }
        });
    }, [auth]);

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
