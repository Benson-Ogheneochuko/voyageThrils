import express from 'express';
import { convertController } from './currencyConverter';
export const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send('Currency converter reporting for duty');
});
const currencyUrl = '/v1/api/converter';
app.use(currencyUrl, convertController);
