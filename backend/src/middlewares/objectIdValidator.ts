import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { HttpException, HttpStatus } from '../utils';

export const objectIdValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const isValid = Types.ObjectId.isValid(id);
        if (!isValid) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'id invalid')
            );
        }
        next();
    } catch (error) {
        next(
            new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Internal server error'
            )
        );
    }
};
