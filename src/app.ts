import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});