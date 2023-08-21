import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db';

dotenv.config();

const app: Express = express();
// const port = process.env.PORT;
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log('DB connected successfully');

  const server = async () => {
    await connectDb()

    // startServer();
}
server();

});