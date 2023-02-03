import { Router } from 'express';
import { auth, userInfoValidator, authRequire } from '../middlewares';
import { login, register, registerAdmin,logout } from '../controllers';

const authRoute = Router();

authRoute.get('/', authRequire, auth);
authRoute.post('/register', userInfoValidator, register);
authRoute.post('/login', login);
authRoute.post('/register/admin', userInfoValidator, registerAdmin);
authRoute.post('/logout',logout)
export { authRoute };
