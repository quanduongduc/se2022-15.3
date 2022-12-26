import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
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
