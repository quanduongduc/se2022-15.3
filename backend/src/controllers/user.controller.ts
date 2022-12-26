import { NextFunction, Request, Response } from 'express';
import { generateToken, HttpException, HttpStatus } from '../utils';
import { Role, User } from '../models';
import { BaseController } from './base.controller';
import * as bcrypt from 'bcrypt';

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userName, password, firstName, lastName, gender } =
                req.body;
            const existedUser: unknown = await this.findOne({
                userName: userName
            });
            if (existedUser) {
                return next(
                    new HttpException(
                        HttpStatus.NOT_IMPLEMENTED,
                        'User is already existed'
                    )
                );
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const role = new Role();
            const user = {
                userName,
                password: hashedPassword,
                firstName,
                lastName,
                gender,
                role
            };
            const userDocument: any = await this.create(user);
            const token = generateToken(userDocument.toJSON());

            const secondOfMonth = 2592000;

            res.cookie('accessToken', token, {
                maxAge: secondOfMonth,
                httpOnly: true
            });
            this.res(res, {
                message: 'Register new user successfully',
                accessToken: token
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

    public findAllUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const users = await this.findAll('-password');

            this.res(res, {
                message: 'get users successfully',
                users: users
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

    public findUserByName = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { firstName, lastName } = req.query;
            const firstNameRegex = new RegExp(firstName as string, 'i');
            const lastNameRegex = new RegExp(lastName as string, 'i');

            const users = await this.findMany(
                {
                    $or: [
                        {
                            firstName: firstNameRegex
                        },
                        {
                            lastName: lastNameRegex
                        }
                    ]
                },
                '-password',
                {},
                10
            );
            console.log(users);

            this.res(res, {
                message: 'get users successfully',
                users: users
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

    public findUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.findById(req.params.id, '-password');
            this.res(res, {
                message: 'get user successfully',
                user: user
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

export const userController = new UserController();
