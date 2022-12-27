import { Router } from 'express';
import {
    authRequire,
    createPermissionRequire,
    deletePermissionRequire
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
artistRoute.get('/:id', authRequire, artistController.findArtistById);
artistRoute.delete(
    '/:id',
    deletePermissionRequire,
    artistController.deleteArtistById
);

export { artistRoute };
