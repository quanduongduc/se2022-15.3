import app from '../app';
import _request from 'supertest';
import { config } from '../configs';

jest.setTimeout(300000);
export const request = _request(app);
export const jsonHeaders = { 'Content-Type': 'application/json' };
export const connectTestDB = async () => {
    try {
        const connectionString = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@localhost:${config.DB_PORT}/${config.DB_NAME}`;

        const connectRes = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log(
            `MongoDB is connected successfully on host : ${connectRes.connection.host}`
        );
    } catch (error) {if (error instanceof Error) {
        console.log(`MongoDB connection false`);
        console.log(`Error: ${error.message}`);
        process.exit(1);
        }
    }
}