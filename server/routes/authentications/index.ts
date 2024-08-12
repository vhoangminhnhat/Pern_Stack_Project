import { Router } from "express";
import { Login, Register } from "../../handlers/authentications";

const authRouters = Router();

//Login
authRouters.post("/login", Login);
authRouters.post("/register", Register);

export default authRouters;
