import { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';
type Context = {
    auth: any;
    setAuth: any;
};
const AUTH_URL = '/auth';
const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: { children: any }) => {
    const [auth, setAuth] = useState({});
    console.log(auth);

    useEffect(() => {
        axios
            .get(AUTH_URL, { withCredentials: true })
            .then((res) => {
                const user = res?.data?.user;
                setAuth({ user });
            })
            .catch(function (err) {
                if (err.response) {
                    console.log(err.response);
                }
            });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
