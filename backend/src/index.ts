import 'module-alias/register';
import { Application } from 'express';
import { connectDB } from '@configs/database';
import config from '@configs/config';
import { getApp } from './app';

const app: Application = getApp();
const PORT = config.PORT || 8000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
