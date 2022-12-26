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
        if (!userName || !password || !firstName || !lastName) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'SomeThing is missing, please try again'
                )
            );
        }
        const isValidUserName = validator.isLength(userName, {
            min: 8,
            max: 32
        });
        if (!isValidUserName) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Invalid userName')
            );
        }
        const isValidPassword = validator.isStrongPassword(password, {});
        if (!isValidPassword) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Invalid password')
            );
        }
        const isValidName =
            validator.isAlpha(firstName) && validator.isAlpha(lastName);
        if (!isValidName) {
            return next(
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
