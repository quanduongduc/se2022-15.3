import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../utils';
import { Artist } from '../models';
import { BaseController } from './base.controller';

class ArtistController extends BaseController {
    constructor() {
        super(Artist);
    }

    public createArtist = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { name, location, gender } = req.body;
            const existedArtist: unknown = await this.findOne({
                name: name
            });
            if (existedArtist) {
                return next(
                    new HttpException(
                        HttpStatus.NOT_IMPLEMENTED,
                        'Artist is already existed'
                    )
                );
            }
            const artist = {
                name,
                location,
                gender
            };
            const artistDocument: any = await this.create(artist);

            this.res(res, {
                message: 'Register new artist successfully',
                artist: artistDocument.toJSON()
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

    public findAllArtist = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const artists: any = await this.findAll();
            this.res(res, {
                message: 'Get artist successfully',
                artists: artists
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

    public findArtistById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const artist: any = await this.findById(id);
            if (!artist) {
                return next(
                    new HttpException(HttpStatus.NOT_FOUND, 'Artist not found')
                );
            }
            this.res(res, {
                message: 'get artist successfully',
                artist: artist.toJSON()
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

    public deleteArtistById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const artist: any = await this.deleteById(id);
            if (!artist) {
                return next(
                    new HttpException(HttpStatus.NOT_FOUND, 'Artist not found')
                );
            }
            this.res(res, {
                message: 'delete artist successfully',
                artist: artist.toJSON()
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

    public findArtistByName = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { name } = req.query;
            const nameRegex = new RegExp(name as string, 'i');

            const artists = await this.findMany(
                {
                    name: nameRegex
                },
                '-password',
                {},
                10
            );

            this.res(res, {
                message: 'get artists successfully',
                artists: artists
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

export const artistController = new ArtistController();
