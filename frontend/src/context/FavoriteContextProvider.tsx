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
        if (auth?.user) {
            updateFavoriteTracksContextState({
                favoriteTracks: auth?.user?.favouriteTracks
            });
        }
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
