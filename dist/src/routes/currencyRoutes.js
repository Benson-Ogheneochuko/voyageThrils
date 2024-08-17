import { Router } from 'express';
import { supportedCodesController } from '../controllers/supportedCodesController.js';
import { convertController } from '../controllers/convertController.js';
export const currencyRouter = Router();
const supportedCodesRoute = '/supported-currencies';
currencyRouter.route(supportedCodesRoute)
    .get(supportedCodesController);
// convert currency pair
const convertPair = '/convert-pair';
currencyRouter.route(convertPair)
    .post(convertController);
