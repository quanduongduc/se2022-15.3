import { login, register, registerAdmin, logout } from './auth.controller';
import { userController } from './user.controller';
import { trackController } from './track.controller';
import { artistController } from './artist.controller';
import { playlistController } from './playlist.controller';

export {
    userController,
    trackController,
    login,
    register,
    registerAdmin,
    artistController,
    playlistController,
    logout
};
