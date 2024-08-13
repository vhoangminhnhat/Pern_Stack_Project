import { Router } from "express";

const userRouters = Router();

userRouters.get("/list");
userRouters.put("/update-user");
userRouters.post("/create-user");
userRouters.delete("/delete-user");

export default userRouters