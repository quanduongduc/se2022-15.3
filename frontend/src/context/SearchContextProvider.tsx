import { createContext, useContext, useState, ReactNode } from 'react';
import { ISearchTracksContext, SearchTracksContextState } from '../types/type';

const defaultSearchTracksContextState: SearchTracksContextState = {
    searchTracks: []
};

export const SearchTracksContext = createContext<ISearchTracksContext>({
    searchTracksContextState: defaultSearchTracksContextState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateSearchTracksContextState: () => {}
});

export const useSearchTracksContext = () => useContext(SearchTracksContext);

const SearchTracksContextProvider = ({ children }: { children: ReactNode }) => {
    const [searchTracksContextState, setSearchTracksContextState] = useState(
        defaultSearchTracksContextState
    );

    const updateSearchTracksContextState = (
        updatedObj: Partial<ISearchTracksContext>
    ) => {
        setSearchTracksContextState((previousSearchTrackContextState) => ({
            ...previousSearchTrackContextState,
            ...updatedObj
        }));
    };

    const searchTracksContextProviderData = {
        searchTracksContextState,
        updateSearchTracksContextState
    };

    return (
        <SearchTracksContext.Provider value={searchTracksContextProviderData}>
            {children}
        </SearchTracksContext.Provider>
    );
};

export default SearchTracksContextProvider;
