import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { IPlaylistContext, PlaylistContextState } from '../types/type';

const USER_URL = '/user';

const defaultPlaylistContextState: PlaylistContextState = {
    playlists: [],
    selectedPlaylistId: null,
    selectedPlaylist: null
};

export const PlaylistContext = createContext<IPlaylistContext>({
    playlistContextState: defaultPlaylistContextState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updatePlaylistContextState: () => {}
});

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
    const [playlistContextState, setPlaylistContextState] = useState(
        defaultPlaylistContextState
    );

    const updatePlaylistContextState = (
        updatedObj: Partial<PlaylistContextState>
    ) => {
        setPlaylistContextState((previousPlaylistContextState) => ({
            ...previousPlaylistContextState,
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
                    const userPlaylistResponse =
                        userResponse[userIndexResponse].playlists;
                    updatePlaylistContextState({
                        playlists: userPlaylistResponse
                    });
                }
            });
    }, [auth]);

    const playlistContextProviderData = {
        playlistContextState,
        updatePlaylistContextState
    };

    return (
        <PlaylistContext.Provider value={playlistContextProviderData}>
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContextProvider;
