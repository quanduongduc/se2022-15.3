import express, { Application, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { authRoute, userRoute, trackRoute } from './routes';
import { errorHandler } from './middlewares';
import cookieParser from 'cookie-parser';

dotenv.config();

export const getApp = (): Application => {
    const app: Application = express();
    const routes = Router();

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use(helmet());
    app.use(cors());

    app.get('/', (req: Request, res: Response) => {
        res.send('Healthy');
    });

    app.get('/api/random', (req: Request, res: Response) => {
        const randomNumber: number = Math.floor(Math.random() * 100000);
        return res.json({
            name: String(randomNumber)
        });
    });

    routes.use('/api/users', userRoute);
    routes.use('/api/auth', authRoute);
    routes.use('/api/track', trackRoute);
    app.use(routes);

    app.use(errorHandler);
    return app;
};
