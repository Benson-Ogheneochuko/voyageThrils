var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { convertService } from "../services/convertService.js";
import { asyncErrorHandler } from "../handleErrors/AppErrorHandlers.js";
export const convertController = asyncErrorHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { base, target } = req.body;
    let result = yield convertService({ base, target });
    if (!result) {
        return res.status(500).json({
            success: false,
            message: "error getting conversion rates"
        });
    }
    const { time_last_update_utc, time_next_update_utc, base_code, target_code, conversion_rate } = result;
    const filteredResult = {
        time_last_update_utc,
        time_next_update_utc,
        base_code,
        target_code,
        conversion_rate
    };
    res.status(200).json({
        success: true,
        message: "Request successful",
        data: filteredResult
    });
}));
