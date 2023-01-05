export const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
