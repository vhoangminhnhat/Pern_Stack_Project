import { Router } from "express";
import { CreateUser, getUsers, UpdateUser } from "../../handlers/users";

const userRouters = Router();

userRouters.get("/list", getUsers);
userRouters.put("/update-user", UpdateUser);
userRouters.post("/create-user", CreateUser);
userRouters.delete("/delete-user");

export default userRouters