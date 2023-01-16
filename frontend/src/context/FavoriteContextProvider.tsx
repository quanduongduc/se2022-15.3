import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import {
    FavoriteTracksContextState,
    IFavoriteTracksContext
} from '../types/type';
const USER_URL = '/user';

const defaultFavoriteTracksContextState: FavoriteTracksContextState = {
    favoriteTracks: []
};

export const FavoriteTracksContext = createContext<IFavoriteTracksContext>({
    favoriteTracksContextState: defaultFavoriteTracksContextState
});

export const useFavoriteTracksContext = () => useContext(FavoriteTracksContext);

const FavoriteTracksContextProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const [favoriteTracksContextState, setFavoriteTracksContextState] =
        useState(defaultFavoriteTracksContextState);

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
                    setFavoriteTracksContextState({
                        favoriteTracks: userFavoriteTracksResponse
                    });
                }
            });
    }, [auth]);

    const favoriteTracksContextProviderData = {
        favoriteTracksContextState
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
