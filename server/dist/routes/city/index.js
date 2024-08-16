"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_1 = require("../../handlers/city");
const cityRouter = (0, express_1.Router)();
cityRouter.get("/list", city_1.getCityList);
exports.default = cityRouter;
