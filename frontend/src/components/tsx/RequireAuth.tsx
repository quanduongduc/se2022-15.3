import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // eslint-disable-next-line no-constant-condition
    return auth?.user?.role?.name === 'user' ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
