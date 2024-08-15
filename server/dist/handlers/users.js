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
exports.getUsers = getUsers;
exports.CreateUser = CreateUser;
exports.UpdateUser = UpdateUser;
const lodash_1 = require("lodash");
const db_1 = require("../db");
const heplers_1 = require("../utils/heplers");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, phone } = req.params;
            const data = yield db_1.pool.query("SELECT * FROM users");
            let result = [];
            if (email && !phone) {
                result = data.rows.filter((item) => item.email === email);
                return res.status(200).json({
                    data: result,
                    message: "Get user list successfully",
                });
            }
            if (!email && phone) {
                result = data.rows.filter((item) => item.phone === phone);
                return res.status(200).json({
                    data: result,
                    message: "Get uset list successfully",
                });
            }
            if (email && phone) {
                result = data.rows.filter((item) => item.email === email && item.phone === phone);
                return res.status(200).json({
                    data: result,
                    message: "Get user list successfully",
                });
            }
            if (!email && !phone) {
                return res.status(200).json({
                    data: data.rows,
                    message: "Get user list successfully",
                });
            }
            if (email === undefined || phone === undefined) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "Email and phone must not be undefined",
                    },
                    message: "Get user list failed",
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Error encountered",
            });
        }
    });
}
function CreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, name, phone, roles, address, description } = req.body;
            const userId = `id-${(0, heplers_1.generateId)(7)}${phone}`;
            if (!email && phone) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "Email is required",
                    },
                    message: "Create user failed",
                });
            }
            if (!phone && email) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "Phone is required",
                    },
                    message: "Create user failed",
                });
            }
            if (!phone && !email) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "Phone and email are required",
                    },
                    message: "Create user failed",
                });
            }
            if (phone && email) {
                const checkData = yield db_1.pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
                if (!(0, lodash_1.isEmpty)(checkData.rows)) {
                    return res.status(400).json({
                        error: {
                            code: 400,
                            message: "This user is existed",
                        },
                        message: "Create user failed",
                    });
                }
                else {
                    const data = yield db_1.pool.query("INSERT INTO users (userId, email, phone, name, address, description) values ($1, $2, $3, $4, $5, $6)", [userId, email, phone, name, address, description]);
                    return res.status(200).json({
                        data: data.rows[0],
                        message: "Create user successfully",
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Error encountered",
            });
        }
    });
}
function UpdateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, name, email, phone, address, description } = req.body;
            if (!userId || userId === undefined) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "User Id is required in update action",
                    },
                    message: "Update user failed",
                });
            }
            if (userId) {
                const checkData = yield db_1.pool.query("SELECT * FROM users WHERE userId = $1", [userId]);
                if ((0, lodash_1.isEmpty)(checkData.rows)) {
                    return res.status(400).json({
                        error: {
                            code: 400,
                            message: "User Id is not match with any existed users",
                        },
                        message: "Update user failed",
                    });
                }
                else {
                    const data = yield db_1.pool.query("INSERT INTO users (userId, email, phone, name, address, description) values ($1, $2, $3, $4, $5, $6)", [userId, email, phone, name, address, description]);
                    return res.status(200).json({
                        data: data.rows[0],
                        message: "Update user successfully",
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                error: {
                    code: 400,
                    message: "Error encountered",
                },
                message: "Update user failed",
            });
        }
    });
}
