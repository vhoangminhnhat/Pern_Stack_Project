"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const heplers_1 = require("../utils/heplers");
const JWT_SECRET = (0, heplers_1.generateId)(35);
const checkJwt = (req, res, next) => {
    const token = req.headers["auth"];
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(403).send("Forbidden");
        return;
    }
    const { userId, username } = jwtPayload;
    const newToken = jsonwebtoken_1.default.sign({ userId, username }, JWT_SECRET, {
        expiresIn: "1d",
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
exports.checkJwt = checkJwt;
