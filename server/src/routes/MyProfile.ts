import express from "express";
import { getProfile, updateProfile } from "../controllers/myProfile/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const myProfileRouter = express.Router();

myProfileRouter.get("/me", protectedRoutes as any, getProfile as any);
myProfileRouter.put("/update-profile", protectedRoutes as any, updateProfile as any);

export default myProfileRouter;
