import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../utils';
import validator from 'validator';

const UNICODE_LETTER_REGEX = /^\p{L}+$/u;

export const userInfoValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password, firstName, lastName, gender } = req.body;
        if (!userName || !password || !firstName || !lastName || !gender) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'SomeThing is missing, please try again'
                )
            );
        }

        const isValidUserNameLength = validator.isLength(userName, {
            min: 8,
            max: 32
        });
        if (!isValidUserNameLength) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'UserName’s length must be 8 to 32 characters'
                )
            );
        }

        const isValidUserName = validator.isAlphanumeric(userName, 'en-US', {
            ignore: '_.'
        });
        if (!isValidUserName) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'UserName contain invalid characters'
                )
            );
        }
        const isValidPassword = validator.isStrongPassword(password, {});
        if (!isValidPassword) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Invalid password')
            );
        }

        const isValidNameCharacters =
            UNICODE_LETTER_REGEX.test(firstName) &&
            UNICODE_LETTER_REGEX.test(lastName);
        if (!isValidNameCharacters) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'firstName or lastName contain invalid characters'
                )
            );
        }
        const isValidNameLength =
            validator.isLength(firstName, {
                min: 1,
                max: 32
            }) &&
            validator.isLength(lastName, {
                min: 1,
                max: 32
            });
        if (!isValidNameLength) {
            return next(
                new HttpException(
                    HttpStatus.BAD_REQUEST,
                    'firstName or lastName has invalid length'
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
