import { Router } from 'express';
import { userController } from '../controllers';

const userRoute = Router();

userRoute.get('/', userController.findAllUser);
userRoute.get('/search', userController.findUserByName);
userRoute.get('/:id', userController.findUserById);

export { userRoute };
