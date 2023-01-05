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
    '/:playlistId/add-track/:trackId',
    authRequire,
    playlistController.addPlaylistTrack
);
playlistRoute.patch(
    '/:playlistId/remove-track/:trackId',
    authRequire,
    playlistController.removePlaylistTrack
);

export { playlistRoute };
