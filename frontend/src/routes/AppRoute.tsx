import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/tsx/Home';
import LoginPage from '../pages/login/LoginPage';
import PasswordReset from '../pages/password-reset/PasswordResetPage';
import RegisterPage from '../pages/register/RegisterPage';
import RequireAuth from '../components/tsx/RequireAuth';
import Search from '../components/tsx/Search';
import Collection from '../components/tsx/Collection';
import Playlist from '../components/tsx/Playlist';
import Favorite from '../components/tsx/Favorite';
import PlaylistCreate from '../components/tsx/PlaylistCreate';

const AppRoute = (): ReactElement => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/password-reset" element={<PasswordReset />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/playlist" element={<Playlist />} />
                    <Route
                        path="playlist/create"
                        element={<PlaylistCreate />}
                    />
                    <Route path="/favorite" element={<Favorite />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoute;
