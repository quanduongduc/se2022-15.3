import { NextFunction, Request, Response } from 'express';
import { trackController, userController } from '../controllers';
import { Playlist } from '../models';
import { HttpException, HttpStatus } from '../utils';
import { BaseController } from './base.controller';

class PlaylistController extends BaseController {
    constructor() {
        super(Playlist);
    }

    public createPlaylist = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title } = req.body;
            const userId = req.body.user._id;
            console.log(req.body);

            const playlist: any = await this.create({ title });
            await userController.updateById(userId, {
                $addToSet: { playlists: playlist._id }
            });
            this.res(res, {
                message: 'create playlist successfully',
                playlist: playlist
            });
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public findPlaylistByTitle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title } = req.query;
            const titleRegex = new RegExp(title as string, 'i');

            const playlists: any = await this.findMany(
                {
                    title: titleRegex
                },
                '',
                {},
                10,
                'artists'
            );

            this.res(res, {
                message: 'get playlist successfully',
                playlists: playlists
            });
        } catch (error) {
            console.log(error);

            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public findAllPlaylist = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const playlists: any = await this.findAll();

            this.res(res, {
                message: 'Get playlists successfully',
                playlists: playlists
            });
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public findPlaylistById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const playlist: any = await this.findById(id);

            if (!playlist) {
                return next(
                    new HttpException(
                        HttpStatus.BAD_REQUEST,
                        'playlist not found'
                    )
                );
            }

            this.res(res, {
                message: 'Get playlist successfully',
                playlist: playlist.toJSON()
            });
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public deletePlaylistById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const deletedPlaylist = await this.deleteById(id);
            if (!deletedPlaylist) {
                return next(
                    new HttpException(
                        HttpStatus.BAD_REQUEST,
                        'playlist not found'
                    )
                );
            }
            this.res(res, {
                message: 'delete playlist sucessfully',
                deletedPlaylist: deletedPlaylist
            });
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public addPlaylistTrack = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const track: any = await trackController.findById(id);
            if (!track) {
                return next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'Track not found')
                );
            }
            const playlist: any = await this.updateById(req.body.user.id, {
                $addToSet: { tracks: track._id }
            });
            if (!playlist) {
                return next(
                    new HttpException(
                        HttpStatus.BAD_REQUEST,
                        'playlist not found'
                    )
                );
            }
            this.res(res, {
                message: 'add track from playlist successfully',
                playlist: playlist.toJSON()
            });
        } catch (error) {
            console.log(error);

            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };

    public removePlaylistTrack = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const track: any = await trackController.findById(id);
            if (!track) {
                return next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'track not found')
                );
            }
            const playlist: any = await this.updateById(req.body.user.id, {
                $pull: { tracks: track._id }
            });
            if (!track) {
                return next(
                    new HttpException(
                        HttpStatus.BAD_REQUEST,
                        'playlist not found'
                    )
                );
            }
            this.res(res, {
                message: 'remove track to playlist successfully',
                playlist: playlist.toJSON()
            });
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    };
}

export const playlistController = new PlaylistController();
