import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import axios from '../api/axios';
import { IPlaylistContext, PlaylistContextState } from '../types/type';

const PLAYLIST_URL = '/playlist';

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

    useEffect(() => {
        axios
            .get(PLAYLIST_URL, {
                withCredentials: true
            })
            .then((response) => {
                const userPlaylistResponse = response?.data?.playlists;
                updatePlaylistContextState({
                    playlists: userPlaylistResponse
                });
            });
    }, []);

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
