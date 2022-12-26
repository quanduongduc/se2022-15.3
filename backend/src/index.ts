import 'module-alias/register';
import { Application } from 'express';
import { getApp } from './app';
import { connectDB, config } from './configs';

const app: Application = getApp();
const PORT = config.PORT || 8000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
