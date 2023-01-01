import { corsOptions } from 'configs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response, Router } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares';
import {
    artistRoute,
    authRoute,
    playlistRoute,
    trackRoute,
    userRoute
} from './routes';

dotenv.config();

export const getApp = (): Application => {
    const app: Application = express();
    const routes = Router();

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use(helmet());
    app.use(cors(corsOptions));

    app.get('/', (req: Request, res: Response) => {
        res.send('Healthy');
    });

    app.get('/api/random', (req: Request, res: Response) => {
        const randomNumber: number = Math.floor(Math.random() * 100000);
        return res.json({
            name: String(randomNumber)
        });
    });

    routes.use('/api/user', userRoute);
    routes.use('/api/auth', authRoute);
    routes.use('/api/track', trackRoute);
    routes.use('/api/artist', artistRoute);
    routes.use('/api/playlist', playlistRoute);
    app.use(routes);

    app.use(errorHandler);
    return app;
};
