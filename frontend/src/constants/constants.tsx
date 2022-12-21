export const API_URL: string =
    process.env.NODE_ENV == 'production'
        ? '/api/v1'
        : 'http://localhost:5000/api/v1';
