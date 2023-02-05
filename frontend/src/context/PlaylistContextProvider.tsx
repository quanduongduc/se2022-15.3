import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import useAuth from '../hooks/useAuth';
import { IPlaylistContext, PlaylistContextState } from '../types/type';

const defaultPlaylistContextState: PlaylistContextState = {
    playlists: [],
    selectedPlaylistId: null,
    selectedPlaylist: null,
    playlistTracks: []
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
        if (auth?.user) {
            updatePlaylistContextState({
                playlists: auth?.user?.playlists
            });
        }
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
