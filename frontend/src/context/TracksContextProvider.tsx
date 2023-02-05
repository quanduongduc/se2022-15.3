import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import axios from '../api/axios';
import { TracksContextState, ITracksContext } from '../types/type';
const TRACKS_URL = '/track';

const defaultTracksContextState: TracksContextState = {
    tracks: []
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TracksContext = createContext<ITracksContext>({
    tracksContextState: defaultTracksContextState
});

export const useTracksContext = () => useContext(TracksContext);

const TracksContextProvider = ({ children }: { children: ReactNode }) => {
    const [tracksContextState, setracksContextState] = useState(
        defaultTracksContextState
    );
    useEffect(() => {
        axios
            .get(TRACKS_URL, {
                withCredentials: true
            })
            .then(async (response) => {
                const userTracksReponse = response?.data?.tracks;
                await delay(3000);
                setracksContextState({
                    tracks: userTracksReponse
                });
            });
    }, []);

    const tracksContextProviderData = {
        tracksContextState
    };

    return (
        <TracksContext.Provider value={tracksContextProviderData}>
            {children}
        </TracksContext.Provider>
    );
};

export default TracksContextProvider;
