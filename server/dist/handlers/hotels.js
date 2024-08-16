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
exports.getHotels = getHotels;
exports.getHotelDetails = getHotelDetails;
exports.createHotels = createHotels;
exports.updateHotels = updateHotels;
exports.deleteHotels = deleteHotels;
const db_1 = require("../db");
const heplers_1 = require("../utils/heplers");
const lodash_1 = require("lodash");
function getHotels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, city } = req.params;
            const data = yield db_1.pool.query("SELECT * from hotel_list");
            let result = [];
            if (!name && !city) {
                return res.status(200).json({
                    data: data.rows,
                    message: "Get hotel list successfully",
                });
            }
            if (name && city) {
                result = data.rows.filter((item) => item.name === name && item.city === city);
            }
            if (name && !city) {
                result = data.rows.filter((item) => item.name === name);
            }
            if (!name && city) {
                result = data.rows.filter((item) => item.city === city);
            }
            return res.status(200).json({
                data: result,
                message: "Get hotel list successfully",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    code: 500,
                    message: "Internal server error",
                },
                message: "Create hotel failed",
            });
        }
    });
}
function getHotelDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { hotelId } = req.query;
            const data = yield db_1.pool.query("SELECT * FROM hotel_list WHERE id = $1", [hotelId]);
            res.status(200).json({
                data: {
                    data: data.rows[0],
                },
                message: "Get hotel detail successfully",
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Get hotel detail info failed",
            });
        }
    });
}
function createHotels(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { address, code, description, name } = req.body;
            let hotelId = `${(0, heplers_1.generateId)(15)}${code}`;
            if (!code) {
                return res.status(400).json({
                    data: {},
                    error: {
                        code: 400,
                        message: "Code is required",
                    },
                    message: "Create hotel failed",
                });
            }
            if (code) {
                const checkCode = yield db_1.pool.query("SELECT * FROM hotel_list WHERE code = $1");
                if (!(0, lodash_1.isEmpty)(checkCode.rows)) {
                    return res.status(400).json({
                        error: {
                            code: 400,
                            message: "This code is existed",
                        },
                        message: "Create hotel failed",
                    });
                }
                else {
                    yield db_1.pool.query("INSERT INTO hotel_list (id, name, code, address, description) VALUES ($1, $2, $3, $4, $5)", [hotelId, name, code, address, description]);
                    return res.status(200).json({
                        data: {
                            id: hotelId,
                            name,
                            code,
                            address,
                            description,
                        },
                        message: "Create hotel successfully",
                    });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                data: {},
                error: {
                    code: 500,
                    message: "Internal server error",
                },
                message: "Create hotel failed",
            });
        }
    });
}
function updateHotels(req, res) {
    console.log(req.body);
    res.status(200).json({
        data: {
            id: "sdfdfdf",
            name: "Hotel A",
            code: "hotel-A",
        },
    });
}
function deleteHotels(req, res) {
    res.status(200).json({
        status: "success",
        message: "Delete successfully",
    });
}
