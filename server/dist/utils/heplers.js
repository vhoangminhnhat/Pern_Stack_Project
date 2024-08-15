"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGeneration = exports.generateId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateId = (length) => Array.from({ length }, () => {
    const characters = "abcefghjklmnopqrstuvwxyz0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
}).join("");
exports.generateId = generateId;
const tokenGeneration = (id) => {
    const payload = {
        user: id,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWTSECRET, { expiresIn: "24h" });
};
exports.tokenGeneration = tokenGeneration;
