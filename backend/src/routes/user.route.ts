import { Router } from 'express';
import { authRequire } from '../middlewares';
import { userController } from '../controllers';

const userRoute = Router();

userRoute.get('/', userController.findAllUser);
userRoute.get('/search', userController.findUserByName);
userRoute.get('/:id', userController.findUserById);
userRoute.post(
    '/tracking/lastPlay/:id',
    authRequire,
    userController.lastPlayTracking
);
export { userRoute };
