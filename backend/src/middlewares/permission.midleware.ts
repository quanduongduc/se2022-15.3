import { Request, Response, NextFunction } from 'express';
import { HttpStatus, HttpException } from '../utils';

export const deletePermissionRequire = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = req.body;
        const hasDeletePermission = user.role.trackPermission.delete;
        if (!hasDeletePermission) {
            return next(
                new HttpException(HttpStatus.FORBIDDEN, 'Permission Denied')
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

export const createPermissionRequire = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = req.body;
        const hasDeletePermission = user.role.trackPermission.create;
        if (!hasDeletePermission) {
            return next(
                new HttpException(HttpStatus.FORBIDDEN, 'Permission Denied')
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

export const updatePermissionRequire = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = req.body;
        const hasDeletePermission = user.role.trackPermission.update;
        if (!hasDeletePermission) {
            return next(
                new HttpException(HttpStatus.FORBIDDEN, 'Permission Denied')
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
