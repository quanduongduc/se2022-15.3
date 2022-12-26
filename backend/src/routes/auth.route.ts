import { Router } from 'express';
import { auth, userInfoValidator } from '../middlewares';
import { login, register } from '../controllers';

const authRoute = Router();

authRoute.get('/', auth);
authRoute.post('/register', userInfoValidator, register);
authRoute.post('/login', login);

export { authRoute };
