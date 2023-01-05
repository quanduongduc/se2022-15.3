export const API_URL: string =
    process.env.NODE_ENV == 'production' ? '/api' : 'http://localhost:5000/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'salyr-accessToken';
