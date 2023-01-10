import { userController } from './user.controller';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils';
import { HttpException } from '../utils';
import * as jwt from 'jsonwebtoken';
import { config } from '../configs';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password } = req.body;

        const user: any = await userController.findOne({
            userName: userName
        });

        if (!user) {
            return next(
                new HttpException(
                    HttpStatus.NOT_IMPLEMENTED,
                    'User or Password is incorrect'
                )
            );
        }
        const isMatchedPassword = await bcrypt.compare(
            password,
            user?.password
        );
        if (!isMatchedPassword) {
            return next(
                new HttpException(
                    HttpStatus.NOT_IMPLEMENTED,
                    'User or Password is incorrect'
                )
            );
        }

        const milSecondOfMonth = 2592000000;

        const token = jwt.sign(user.toJSON(), config.JWT_SECRET);
        res.cookie('accessToken', token, {
            maxAge: milSecondOfMonth,
            httpOnly: true
        });
        res.json({
            message: 'Login successfully',
            accessToken: token
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

export const register = userController.createUser;

export const registerAdmin = userController.createAdminUser;
