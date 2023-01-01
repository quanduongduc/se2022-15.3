export const corsOptions = {
    origin: [
        'http://localhost:80/*',
        'http://localhost:3000/*',
        'https://spotifake.site/*'
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
