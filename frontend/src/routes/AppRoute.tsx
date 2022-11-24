import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from '../App';
import RandomPage from '../pages/RandomPage';
import RegisterPage from '../pages/Register';
import SigninPage from '../pages/Signin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/random',
        element: <RandomPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/signin',
        element: <SigninPage />
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
