import { Router } from "express";
import { getCityList } from "../../handlers/city";

const cityRouter = Router();

cityRouter.get("/list", getCityList);

export default cityRouter