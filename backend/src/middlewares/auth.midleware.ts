import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils';
import { HttpException } from '../utils';
import * as jwt from 'jsonwebtoken';
import { config } from '../configs';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return next(
                new HttpException(HttpStatus.BAD_REQUEST, 'Authenticate fail')
            );
        }
        console.log(accessToken);

        const user = jwt.verify(accessToken, config.JWT_SECRET);
        if (!user) {
            res.clearCookie('accessToken');
            return next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Login session expired, please login again'
                )
            );
        }
        res.json({
            message: 'Authenticate successfully',
            user: user
        });
        req.body.user = user;
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
