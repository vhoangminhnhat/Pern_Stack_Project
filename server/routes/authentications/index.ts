import { Router } from "express";
import { Login } from "../../handlers/authentications";

const authRouters = Router();

//Login
authRouters.post('/login', Login);
authRouters.post('/register', )