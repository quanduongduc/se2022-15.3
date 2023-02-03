import app from './app';
import { config, connectDB } from './configs';

const PORT = config.PORT || 8000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
