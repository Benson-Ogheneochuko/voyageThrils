import express from 'express';
import { currencyRouter } from "./routes/currencyRoutes";
import { AppError } from './handleErrors/AppErrors';
import { appErrorHandler } from './handleErrors/AppErrorHandlers';
import cors from 'cors';
export const app = express();
app.use(express.json());
app.use(cors({
    origin: /http:\/\/localhost:\d+/ // Regex to match any localhost origin
}));
app.get('/', (req, res) => {
    res.status(200).send('Currency converter reporting for duty');
});
const currencyUrl = '/v1/api/converter';
app.use(currencyUrl, currencyRouter);
app.all('*', (req, res, next) => {
    const err = new AppError(500, `can't find route ${req.originalUrl}`);
    next(err);
});
app.use(appErrorHandler);
