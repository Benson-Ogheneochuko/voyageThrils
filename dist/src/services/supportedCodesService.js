var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const key = process.env.APP_EXCHANGERATE_API_COM;
const baseUrl = process.env.APP_EXCHANGERATE_BASEURL;
const supportedCodesUrl = `${baseUrl}/codes`;
export const supportedCodesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            method: "GET",
            headers: { Authorization: `Bearer ${key}` }
        };
        const response = yield fetch(supportedCodesUrl, options);
        if (!response.ok) {
            throw new Error('Http error! status: ' + response);
        }
        const data = yield response.json();
        return data['supported_codes'];
    }
    catch (error) {
        console.error(error);
    }
});
