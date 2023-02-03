import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils';
import { HttpException } from '../utils';
import * as jwt from 'jsonwebtoken';
import { config } from '../configs';
import { userController } from '../controllers';

export const authRequire = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return next(
                new HttpException(
                    HttpStatus.UNAUTHORIZED_ERROR,
                    'Authenticate fail'
                )
            );
        }
        const verifiedUser: any = jwt.verify(accessToken, config.JWT_SECRET);

        if (!verifiedUser) {
            res.clearCookie('accessToken');
            return next(
                new HttpException(
                    HttpStatus.UNAUTHORIZED_ERROR,
                    'Authenticate fail'
                )
            );
        }
        const user = await userController.findById(
            verifiedUser._id,
            '-password'
        );
        if (!user) {
            res.clearCookie('accessToken');
            return next(
                new HttpException(
                    HttpStatus.UNAUTHORIZED_ERROR,
                    'Authenticate fail'
                )
            );
        }
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

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.body;
        const userExisted = await userController.findById(
            user._id,
            '-password'
        );
        if (!userExisted) {
            res.clearCookie('accessToken');
            return next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Authenticate fail : user not found'
                )
            );
        }
        res.json({
            message: 'Authenticate successfully',
            user: userExisted
        });
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
