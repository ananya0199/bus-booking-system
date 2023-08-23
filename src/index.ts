import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db';
import routes from './routes/routes';
import { config } from './config/config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json())
app.get('/user', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const startServer = () =>{
  app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
}
const server = async () =>{
  await connectDb()
  startServer();
}
server();