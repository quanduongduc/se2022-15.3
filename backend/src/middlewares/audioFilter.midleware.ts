import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils';
import { HttpException } from '../utils';

export const audioFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const audio: Express.Multer.File | undefined = req.file;
        if (!audio) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'No file found in request'
                )
            );
        }
        const acceptedMineTypes = ['audio/mpeg']; // only .mp3 type, may add more in the future

        const isValidType = audio?.mimetype in acceptedMineTypes;
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
