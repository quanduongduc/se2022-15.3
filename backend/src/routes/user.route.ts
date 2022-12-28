import { Router } from 'express';
import { authRequire, objectIdValidator } from '../middlewares';
import { userController } from '../controllers';

const userRoute = Router();

userRoute.get('/', userController.findAllUser);
userRoute.get('/search', userController.findUserByName);
userRoute.get('/:id', objectIdValidator, userController.findUserById);
userRoute.patch(
    '/tracking/lastPlay/:id',
    authRequire,
    objectIdValidator,
    userController.lastPlayTracking
);
userRoute.patch(
    '/addFavourite/:id',
    authRequire,
    objectIdValidator,
    userController.addFavouriteTrack
);

userRoute.patch(
    '/removeFavourite/:id',
    authRequire,
    objectIdValidator,
    userController.removeFavouriteTrack
);
export { userRoute };
