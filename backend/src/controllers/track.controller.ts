import { NextFunction, Request, Response } from 'express';
import {
    getObjectSignedUrl,
    HttpException,
    HttpStatus,
    uploadToS3
} from '../utils';
import { Track } from '../models';
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
            console.log(artistIds);

            const audioUploadResult = await uploadToS3(audio);
            const themeUploadResult = await uploadToS3(theme);

            const track = new Track({
                title: title,
                storageName: audioUploadResult?.key,
                duration: duration,
                artists: artistIds,
                theme: themeUploadResult?.key,
                description: description
            });
            await track.save();
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
                    const getTrackUrlPromise = getObjectSignedUrl(
                        track.storageName
                    );
                    const getThemeUrlPromise = getObjectSignedUrl(track.theme);
                    const [trackUrl, themeUrl] = await Promise.all([
                        getTrackUrlPromise,
                        getThemeUrlPromise
                    ]);
                    return {
                        ...track.toJSON(),
                        trackUrl,
                        themeUrl
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
                    const getTrackUrlPromise = getObjectSignedUrl(
                        track.storageName
                    );
                    const getThemeUrlPromise = getObjectSignedUrl(track.theme);
                    const [trackUrl, themeUrl] = await Promise.all([
                        getTrackUrlPromise,
                        getThemeUrlPromise
                    ]);
                    return {
                        ...track.toJSON(),
                        trackUrl,
                        themeUrl
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
                next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'Track not found')
                );
            }
            const trackUrl = await getObjectSignedUrl(track.storageName);
            const themeUrl = await getObjectSignedUrl(track.theme);

            this.res(res, {
                message: 'Get track successfully',
                track: {
                    ...track.toJSON(),
                    trackUrl,
                    themeUrl
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

    public deleteTrackById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const deletedTrack = await this.deleteById(id);
            if (!deletedTrack) {
                next(
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
