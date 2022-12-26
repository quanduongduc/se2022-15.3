import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../utils';
import validator from 'validator';

export const userInfoValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password, firstName, lastName, gender } = req.body;
        const isValidUserName = validator.isLength(userName, {
            min: 8,
            max: 32
        });
        if (!isValidUserName) {
            next(new HttpException(HttpStatus.BAD_REQUEST, 'Invalid userName'));
        }
        const isValidPassword = validator.isStrongPassword(password, {});
        if (!isValidPassword) {
            next(new HttpException(HttpStatus.BAD_REQUEST, 'Invalid password'));
        }
        const isValidName =
            validator.isAlpha(firstName) && validator.isAlpha(lastName);
        if (!isValidName) {
            next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'Invalid firstName or lastName'
                )
            );
        }
        const isValidGender = validator.isIn(gender, ['male', 'female']);
        if (!isValidGender) {
            req.body.gender = 'undefined';
        }
        next();
    } catch (error) {
        console.log(error);

        next(
            new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Intenal Server Error'
            )
        );
    }
};
