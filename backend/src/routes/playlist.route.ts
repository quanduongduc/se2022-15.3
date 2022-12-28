import { Router } from 'express';
import { authRequire, objectIdValidator } from '../middlewares';
import { playlistController } from '../controllers';

const playlistRoute = Router();

playlistRoute.get('/', authRequire, playlistController.findAllPlaylist);
playlistRoute.post('/create', authRequire, playlistController.createPlaylist);
playlistRoute.get(
    '/search',
    authRequire,
    playlistController.findPlaylistByTitle
);
playlistRoute.get(
    '/:id',
    authRequire,
    objectIdValidator,
    playlistController.findPlaylistById
);
playlistRoute.delete(
    '/delete/:id',
    authRequire,
    objectIdValidator,
    playlistController.deletePlaylistById
);
playlistRoute.patch(
    '/add-track/:id',
    authRequire,
    playlistController.addPlaylistTrack
);
playlistRoute.patch(
    '/remove-track/:id',
    authRequire,
    playlistController.removePlaylistTrack
);

export { playlistRoute };
