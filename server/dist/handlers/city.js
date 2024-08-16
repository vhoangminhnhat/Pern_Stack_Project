"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityList = getCityList;
const axios_1 = __importDefault(require("axios"));
const http = axios_1.default.create({
    baseURL: "https://vapi.vnappmob.com/api",
});
function getCityList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const data = yield http.get("/province", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.results) {
                return res.status(200).json({
                    data: (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.results,
                    message: "Get city list successfully",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    code: 500,
                    message: "Internal server error",
                },
                message: "Get city list failed",
            });
        }
    });
}
