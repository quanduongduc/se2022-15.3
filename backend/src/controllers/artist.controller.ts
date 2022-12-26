import { NextFunction, Request, Response } from 'express';
import { generateToken, HttpException, HttpStatus } from '../utils';
import { Role, User } from '../models';
import { BaseController } from './base.controller';

class UserController extends BaseController {
    constructor() {
        super(User);
    }
}

export const userController = new UserController();
