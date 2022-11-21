import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from "cors";
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy')
})

app.get('/api/random', (req: Request, res: Response) => {
  const randomNumber: number = Math.floor(Math.random() * 100000)
  return res.json({
    name : String(randomNumber)
  })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})