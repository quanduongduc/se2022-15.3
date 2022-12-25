import { Router } from 'express';
import { auth } from '../middlewares';
import { login, register } from '../controllers';

const authRoute = Router();

authRoute.get('/', auth);
authRoute.post('/register', register);
authRoute.post('/login', login);

export { authRoute };
