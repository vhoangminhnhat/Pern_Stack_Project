import express from "express";
import { getProfile } from "../controllers/myProfile/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const myProfileRouter = express.Router();

myProfileRouter.get("/me", protectedRoutes as any, getProfile as any);

export default myProfileRouter;
