import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/tsx/Home';
import LoginPage from '../pages/login/LoginPage';
import PasswordReset from '../pages/password-reset/PasswordResetPage';
import RegisterPage from '../pages/register/RegisterPage';
import RequireAuth from '../components/tsx/RequireAuth';
import Search from '../components/tsx/Search';
import Playlist from '../components/tsx/Playlist';
import Favorite from '../components/tsx/Favorite';
import PlaylistCreate from '../components/tsx/PlaylistCreate';
import PlaylistView from '../components/tsx/PlaylistView';
import App from '../App';
import Tracks from '../components/tsx/Tracks';
import PageNotFound from '../pages/page-not-found/PageNotFound';

const AppRoute = (): ReactElement => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/password-reset" element={<PasswordReset />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<App />}>
                        <Route path="" element={<Home />} />
                        <Route path="search" element={<Search />} />
                        <Route path="tracks" element={<Tracks />} />
                        <Route path="playlist/" element={<Playlist />}>
                            <Route path="" element={<PlaylistView />} />
                            <Route path="create" element={<PlaylistCreate />} />
                        </Route>
                        <Route path="favorite" element={<Favorite />} />
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
};

export default AppRoute;
