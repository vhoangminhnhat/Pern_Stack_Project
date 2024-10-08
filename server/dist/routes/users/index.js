"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../handlers/users");
const userRouters = (0, express_1.Router)();
userRouters.get("/list", users_1.getUsers);
userRouters.put("/update-user", users_1.UpdateUser);
userRouters.post("/create-user", users_1.CreateUser);
userRouters.delete("/delete-user");
exports.default = userRouters;
