import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { ApiVersion } from '@configs/ApiVersion';
dotenv.config();

export const getApp = (): Application => {
    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(helmet());
    app.use(cors());

    app.get('/', (req: Request, res: Response) => {
        res.send('Healthy');
    });

    app.get(`${ApiVersion}/random`, (req: Request, res: Response) => {
        const randomNumber: number = Math.floor(Math.random() * 100000);
        return res.json({
            name: String(randomNumber)
        });
    });

    return app;
};
