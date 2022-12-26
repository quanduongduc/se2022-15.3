import { NextFunction, Request, Response } from 'express';
import { generateToken, HttpException, HttpStatus } from '../utils';
import { Track } from '../models';
import { BaseController } from './base.controller';
import * as bcrypt from 'bcrypt';

class TrackController extends BaseController {
    constructor() {
        super(Track);
    }

    public createTrack(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Some error Occour please try again'
                )
            );
        }
    }
}

export const userController = new TrackController();
