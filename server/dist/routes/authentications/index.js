"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentications_1 = require("../../handlers/authentications");
const authRouters = (0, express_1.Router)();
//Login
authRouters.post("/login", authentications_1.Login);
authRouters.post("/register", authentications_1.Register);
exports.default = authRouters;
