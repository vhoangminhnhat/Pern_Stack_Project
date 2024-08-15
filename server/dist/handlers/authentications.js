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
exports.Login = Login;
exports.Register = Register;
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = require("lodash");
const db_1 = require("../db");
const heplers_1 = require("../utils/heplers");
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, userName } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                message: "Login failed",
                error: {
                    code: 400,
                    message: "Invalid login information",
                },
            });
        }
        if (userName && password) {
            try {
                const data = yield db_1.pool.query("SELECT * from users WHERE userName = $1", [
                    userName,
                ]);
                if ((0, lodash_1.isEmpty)(data.rows)) {
                    return res.status(400).json({
                        message: "Login failed",
                        error: {
                            code: 400,
                            message: "User name not existed",
                        },
                    });
                }
                const validPassword = bcrypt_1.default.compare(password, data.rows[0].password);
                if (!validPassword) {
                    return res.status(400).json({
                        message: "Login failed",
                        error: {
                            code: 400,
                            message: "Password is invalid",
                        },
                    });
                }
                const token = (0, heplers_1.tokenGeneration)(data.rows[0].userId);
                return res.status(200).json({
                    message: "Login successfully",
                    data: {
                        jwt: token,
                        user: data.rows[0],
                    },
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({
                    message: "Login failed",
                    error: {
                        code: 400,
                        message: "Error encoutered",
                    },
                });
            }
        }
    });
}
function Register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, phone, userName } = req.body;
            const data = yield db_1.pool.query("SELECT * from users WHERE phone = $1", [
                phone,
            ]);
            if (!(0, lodash_1.isEmpty)(data.rows)) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        message: "User already existed",
                    },
                    message: "Sign up failed",
                });
            }
            const genSalt = yield bcrypt_1.default.genSalt(10);
            const encryptedPassword = yield bcrypt_1.default.hash(password, genSalt);
            const newUser = yield db_1.pool.query("INSERT INTO users (userName, password, email, phone) values ($1, $2, $3, $4) RETURNING *", [userName, encryptedPassword, email, phone]);
            return res.status(200).json({
                message: "Sign up successfully",
                data: {
                    user: newUser.rows[0],
                },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Sign up failed",
                error: {
                    code: 400,
                    message: "Error encountered",
                },
            });
        }
    });
}
