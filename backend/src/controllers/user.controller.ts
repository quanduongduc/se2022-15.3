import { NextFunction, Request, Response } from 'express';
import { generateToken, HttpException, HttpStatus } from '../utils';
import { Role, User } from '../models';
import { BaseController } from './base.controller';
import * as bcrypt from 'bcrypt';
import { config } from '../configs';
import { trackController } from './track.controller';

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

            const milSecondOfMonth = 2592000000;

            res.cookie('accessToken', token, {
                maxAge: milSecondOfMonth,
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

    public createAdminUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { admin_permission_key } = req.headers;
            const hasPermission =
                admin_permission_key === config.ADMIN_PERMISSION_KEY;
            if (!hasPermission) {
                return next(
                    new HttpException(HttpStatus.FORBIDDEN, 'Permission Denied')
                );
            }
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
            const role = new Role({
                name: 'admin',
                trackPermission: {
                    create: true,
                    delete: true,
                    read: true,
                    update: true
                }
            });
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

            const milSecondOfMonth = 2592000000;

            res.cookie('accessToken', token, {
                maxAge: milSecondOfMonth,
                httpOnly: true
            });
            this.res(res, {
                message: 'Register new admin user successfully',
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
            if (!user) {
                next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'User not found')
                );
            }
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

    public lastPlayTracking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const user: any = await this.updateById(req.body.user.id, {
                lastPlay: id
            });
            if (!user) {
                next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'User not found')
                );
            }
            this.res(res, {
                message: 'get user successfully',
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
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

    public addFavouriteTrack = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const track: any = await trackController.findById(id);
            if (!track) {
                next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'Track not found')
                );
            }
            const user: any = await this.updateById(req.body.user.id, {
                $push: { favouriteTracks: track._id }
            });
            if (!user) {
                next(
                    new HttpException(HttpStatus.BAD_REQUEST, 'User not found')
                );
            }
            this.res(res, {
                message: 'add track to favourite successfully',
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
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
