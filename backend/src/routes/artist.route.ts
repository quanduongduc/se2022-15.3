import { Router } from 'express';
import {
    authRequire,
    createPermissionRequire,
    deletePermissionRequire,
    objectIdValidator
} from '../middlewares';
import { artistController } from '../controllers';

const artistRoute = Router();

artistRoute.get('/', authRequire, artistController.findAllArtist);
artistRoute.post(
    '/register',
    authRequire,
    createPermissionRequire,
    artistController.createArtist
);
artistRoute.get('/search', authRequire, artistController.findArtistByName);
artistRoute.get(
    '/:id',
    authRequire,
    objectIdValidator,
    artistController.findArtistById
);
artistRoute.delete(
    '/:id',
    deletePermissionRequire,
    objectIdValidator,
    artistController.deleteArtistById
);

export { artistRoute };
