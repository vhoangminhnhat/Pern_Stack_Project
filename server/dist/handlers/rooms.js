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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRooms = GetRooms;
const db_1 = require("../db");
function GetRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, hotelRef, name } = req.params;
            if (!code && !hotelRef && !name) {
                const data = yield db_1.pool.query("SELECT * FROM rooms");
                return res.status(200).json({
                    data: data.rows,
                    message: "Get room list successfully",
                });
            }
            if (code && hotelRef && name) {
                const filteredData = yield db_1.pool.query("SELECT * FROM rooms WHERE code = $1 AND hotelRef = $2 AND name = $3", [code, hotelRef, name]);
                return res.status(200).json({
                    data: filteredData.rows,
                    message: "Get room list successfully",
                });
            }
            if (code && !hotelRef && !name) {
                const codeData = yield db_1.pool.query("SELECT * FROM rooms WHERE code = $1");
                return res.status(200).json({
                    data: codeData.rows,
                    message: "Get room list successdully",
                });
            }
            ;
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                error: {
                    code: 500,
                    message: "Internal server error",
                },
                message: "Internal server error",
            });
        }
    });
}
