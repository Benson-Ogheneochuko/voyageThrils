import { Router } from 'express';
import { supportedCodesController } from '../controllers/supportedCodesController';
import { convertController } from '../controllers/convertController';
export const currencyRouter = Router();
const supportedCodesRoute = '/supported-currencies';
currencyRouter.route(supportedCodesRoute)
    .get(supportedCodesController);
// convert currency pair
const convertPair = '/convert-pair';
currencyRouter.route(convertPair)
    .post(convertController);
