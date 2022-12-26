import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils';
import { HttpException } from '../utils';

export const audioFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const audio = files.audio[0];
        console.log(audio);
        if (!audio) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'No file found in request'
                )
            );
        }
        const acceptedMineTypes = ['audio/mpeg']; // only .mp3 type, may add more in the future

        const isValidType = acceptedMineTypes.includes(audio.mimetype);
        if (!isValidType) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Invalid File Type')
            );
        }
        next();
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

export const imageFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const image = files.image[0];
        console.log(image);
        if (!image) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'No file found in request'
                )
            );
        }
        const acceptedMineTypes = [
            'image/png',
            'image/jpeg',
            'image/svg+xml',
            'image/gif'
        ]; // only .mp3 type, may add more in the future

        const isValidType = image.mimetype in acceptedMineTypes;
        if (!isValidType) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Invalid File Type')
            );
        }
        next();
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
