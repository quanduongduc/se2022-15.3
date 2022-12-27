import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Account from '../pages/tsx/Account';
import Home from '../pages/tsx/Home';
import LoginPage from '../pages/tsx/LoginPage';
import PasswordReset from '../pages/tsx/PasswordResetPage';
import RegisterPage from '../pages/tsx/RegisterPage';

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
