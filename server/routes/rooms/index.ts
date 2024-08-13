import { Router } from "express";

const roomRouters = Router();

roomRouters.get("/list");
roomRouters.put("/update-room");
roomRouters.post("/create-room");
roomRouters.delete("/delete-room");

export default roomRouters