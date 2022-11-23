import config from './config';
import mongoose, { ConnectOptions } from 'mongoose';

export const connectDB = async () => {
    try {
        const connectionString = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
        const connectRes = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log(
            `MongoDB is connected successfully on host : ${connectRes.connection.host}`
        );
    } catch (error) {
        if (error instanceof Error) {
            console.log(`MongoDB connection false`);
            console.log(`Error: ${error.message}`);
            process.exit(1);
        }
    }
};
