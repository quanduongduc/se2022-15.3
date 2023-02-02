import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import {
    FavoriteTracksContextState,
    IFavoriteTracksContext
} from '../types/type';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
const USER_URL = '/user';

const defaultFavoriteTracksContextState: FavoriteTracksContextState = {
    favoriteTracks: []
};

export const FavoriteTracksContext = createContext<IFavoriteTracksContext>({
    favoriteTracksContextState: defaultFavoriteTracksContextState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateFavoriteTracksContextState: () => {}
});

export const useFavoriteTracksContext = () => useContext(FavoriteTracksContext);

const FavoriteTracksContextProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const [favoriteTracksContextState, setFavoriteTracksContextState] =
        useState(defaultFavoriteTracksContextState);

    const updateFavoriteTracksContextState = (
        updatedObj: Partial<FavoriteTracksContextState>
    ) => {
        setFavoriteTracksContextState((previousTrackContextState) => ({
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
                    const userFavoriteTracksResponse =
                        userResponse[userIndexResponse].favouriteTracks;
                    if (
                        favoriteTracksContextState.favoriteTracks !==
                        userFavoriteTracksResponse
                    ) {
                        updateFavoriteTracksContextState({
                            favoriteTracks: userFavoriteTracksResponse
                        });
                    }
                }
            });
    }, [auth]);

    const favoriteTracksContextProviderData = {
        favoriteTracksContextState,
        updateFavoriteTracksContextState
    };

    return (
        <FavoriteTracksContext.Provider
            value={favoriteTracksContextProviderData}
        >
            {children}
        </FavoriteTracksContext.Provider>
    );
};

export default FavoriteTracksContextProvider;
