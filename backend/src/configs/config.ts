import dotenv from 'dotenv';
dotenv.config();

interface ENV {
    PORT: number | undefined;
    DB_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_NAME: string | undefined;
    DB_PORT: string | undefined;
    JWT_SECRET: string | undefined;
    AWS_BUCKET_NAME: string | undefined;
    AWS_BUCKET_REGION: string | undefined;
    AWS_SECRET_KEY: string | undefined;
    AWS_ACCESS_KEY: string | undefined;
    ADMIN_PERMISSION_KEY: string | undefined;
}

interface Config {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
    JWT_SECRET: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_SECRET_KEY: string;
    AWS_ACCESS_KEY: string;
    ADMIN_PERMISSION_KEY: string;
}

const getConfig = (): ENV => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
        AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        ADMIN_PERMISSION_KEY: process.env.ADMIN_PERMISSION_KEY
    };
};

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export { sanitizedConfig };
