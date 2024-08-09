import { Router } from "express";
import { createHotels, deleteHotels, getHotelDetails, getHotels, updateHotels } from "../../handlers/hotels";

const hotelRouter = Router();

//Get hotel list
hotelRouter.get("/list", getHotels);

//Get hotel details
hotelRouter.get("details/:hotelId", getHotelDetails);

//Create hotels
hotelRouter.post("/create-hotels", createHotels);

//Update hotel info
hotelRouter.put("/update-hotels/:hotelId", updateHotels);

//Delete hotel
hotelRouter.delete("/delete-hotels/:hotelId", deleteHotels)

export default hotelRouter;