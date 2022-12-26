import { Router } from 'express';
import { trackController } from '../controllers';
import multer from 'multer';
import { audioFilter, authRequire, imageFilter } from '../middlewares';
import {
    deletePermissionRequire,
    createPermissionRequire,
    updatePermissionRequire
} from '../middlewares';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadOption = upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);
const trackRoute = Router();

trackRoute.post(
    '/create',
    authRequire,
    createPermissionRequire,
    uploadOption,
    audioFilter,
    imageFilter,
    trackController.createTrack
);
trackRoute.get('/search', trackController.findTrackByTitle);
trackRoute.get('/:id', trackController.findTrackById);
trackRoute.delete(
    '/delete/:id',
    authRequire,
    deletePermissionRequire,
    trackController.deleteTrackById
);

export { trackRoute };
