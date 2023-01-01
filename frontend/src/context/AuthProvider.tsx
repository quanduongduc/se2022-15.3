import { createContext, useState } from 'react';
type Context = {
    auth: any;
    setAuth: any;
};

const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }: { children: any }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
