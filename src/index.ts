import express, { NextFunction, Request, Response } from 'express';
// import { currencyRouter } from "./services/convertService";
import { currencyRouter } from "./routes/currencyRoutes"
import { AppError } from './handleErrors/AppErrors';
import { appErrorHandler } from './handleErrors/AppErrorHandlers';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(cors({
    origin: /http:\/\/localhost:\d+/  // Regex to match any localhost origin
}));

app.get('/', (req, res) => {
  res.status(200).send('Currency converter reporting for duty');
})

const currencyUrl = '/v1/api/converter';
app.use(currencyUrl, currencyRouter);

app.all('*', (req: Request, res: Response, next: NextFunction)=>{
  const err = new AppError( 500, `can't find route ${req.originalUrl}`)
})
app.use(appErrorHandler)