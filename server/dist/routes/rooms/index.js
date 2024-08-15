"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomRouters = (0, express_1.Router)();
roomRouters.get("/list");
roomRouters.put("/update-room");
roomRouters.post("/create-room");
roomRouters.delete("/delete-room");
exports.default = roomRouters;
