var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
export const router = express.Router();
const key = process.env.APP_EXCHANGERATE_API_COM;
const baseUrl = process.env.APP_EXCHANGERATE_BASEURL;
const exhangeUrl = `${baseUrl}/pair`;
export const convertService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ base = 'USD', target = 'NGN' }) {
    try {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${key}` },
        };
        const response = yield fetch(`${exhangeUrl}/${base}/${target}`, options);
        if (!response.ok) {
            // throw new Error('Http error! status: '+ response['error-type'])
            console.log(response);
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error('Error converting currency: ', error);
        throw error;
    }
});
export const convertController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { base, target } = req.body;
        const result = yield convertService({ base, target });
        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'error getting conversion rates'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Request successful',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
router
    .route('/')
    .post(convertController)
    .get(convertController);
