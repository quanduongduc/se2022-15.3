import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Account from '../pages/tsx/Account';
import Home from '../pages/tsx/Home';
import LoginPage from '../pages/login/LoginPage';
import PasswordReset from '../pages/password-reset/PasswordResetPage';
import RegisterPage from '../pages/register/RegisterPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/password-reset',
        element: <PasswordReset />
    },
    {
        path: '/account',
        element: <Account />
    }
]);

const AppRoute = (): ReactElement => {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
};

export default AppRoute;
