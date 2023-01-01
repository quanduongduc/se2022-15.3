import { NextFunction, Request, Response } from 'express';
import { Track } from '../models';
import {
    getObjectSignedUrl,
    HttpException,
    HttpStatus,
    uploadToS3
} from '../utils';
import { BaseController } from './base.controller';

class TrackController extends BaseController {
    constructor() {
        super(Track);
    }

    public createTrack = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const audio = files.audio[0];
            const theme = files.image[0];
            const { title, artistIds, description, duration } = req.body;

            const audioUploadResult = await uploadToS3(audio);
            const themeUploadResult = await uploadToS3(theme);

            const track = await this.create({
                title: title,
                storageName: audioUploadResult?.key,
                duration: duration,
                artists: artistIds,
                theme: themeUploadResult?.key,
                description: description
            });
            this.res(res, {
                message: 'Track add successfully',
                track: track
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

    public findTrackByTitle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title } = req.query;
            const titleRegex = new RegExp(title as string, 'i');

            const tracks: any = await this.findMany(
                {
                    title: titleRegex
                },
                '',
                {},
                10,
                'artists'
            );

            const tracksWithUrl = await Promise.all(
                tracks?.map(async (track: any) => {
                    const urls = await this.generateTrackUrls(
                        track.storageName,
                        track.theme
                    );
                    return {
                        ...track.toJSON(),
                        ...urls
                    };
                })
            );

            this.res(res, {
                message: 'get tracks successfully',
                tracks: tracksWithUrl
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

    public findAllTrack = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const tracks: any = await this.findAll();

            const tracksWithUrl = await Promise.all(
                tracks?.map(async (track: any) => {
                    const urls = await this.generateTrackUrls(
                        track.storageName,
                        track.theme
                    );
                    return {
                        ...track.toJSON(),
                        ...urls
                    };
                })
            );

            this.res(res, {
                message: 'Get tracks successfully',
                tracks: tracksWithUrl
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

    public findTrackById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const track: any = await this.findById(id);

            if (!track) {
                return next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'Track not found')
                );
            }
            const urls = await this.generateTrackUrls(
                track.storageName,
                track.theme
            );

            this.res(res, {
                message: 'Get track successfully',
                track: {
                    ...track.toJSON(),
                    ...urls
                }
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

    private generateTrackUrls = async (
        audioStorageName: string,
        themeStorageName: string
    ) => {
        try {
            const trackUrlPromise = getObjectSignedUrl(audioStorageName);
            const themeUrlPromise = getObjectSignedUrl(themeStorageName);
            const [trackUrl, themeUrl] = await Promise.all([
                trackUrlPromise,
                themeUrlPromise
            ]);
            return {
                trackUrl,
                themeUrl
            };
        } catch (error) {
            console.log(error);
        }
    };

    public deleteTrackById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const deletedTrack = await this.deleteById(id);
            if (!deletedTrack) {
                return next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'Track not found')
                );
            }
            this.res(res, {
                message: 'delete track sucessfully',
                deletedTrack: deletedTrack
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

export const trackController = new TrackController();
