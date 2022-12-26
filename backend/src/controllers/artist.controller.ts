import { NextFunction, Request, Response } from 'express';
import { generateToken, HttpException, HttpStatus } from '../utils';
import { Artist } from '../models';
import { BaseController } from './base.controller';

class ArtistController extends BaseController {
    constructor() {
        super(Artist);
    }
}

export const artistController = new ArtistController();
