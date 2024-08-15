"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotels_1 = require("../../handlers/hotels");
const hotelRouter = (0, express_1.Router)();
//Get hotel list
hotelRouter.get("/list", hotels_1.getHotels);
//Get hotel details
hotelRouter.get("/details/:hotelId", hotels_1.getHotelDetails);
//Create hotels
hotelRouter.post("/create-hotels", hotels_1.createHotels);
//Update hotel info
hotelRouter.put("/update-hotels/:hotelId", hotels_1.updateHotels);
//Delete hotel
hotelRouter.delete("/delete-hotels/:hotelId", hotels_1.deleteHotels);
exports.default = hotelRouter;
