import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/tsx/Home';
import LoginPage from '../pages/login/LoginPage';
import PasswordReset from '../pages/password-reset/PasswordResetPage';
import RegisterPage from '../pages/register/RegisterPage';
import RequireAuth from '../components/tsx/RequireAuth';

const AppRoute = (): ReactElement => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password-reset" element={<PasswordReset />} />

            <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default AppRoute;
