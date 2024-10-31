import express from "express";
import {
  chatMessages,
  sendMessages,
} from "../controllers/chatMessages/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import { getAppApiBase } from "../utils/helpers.js";

const chatRouter = express.Router();

chatRouter.get(getAppApiBase("/messages/:id"), chatMessages as any);

chatRouter.post(
  getAppApiBase("/messages/send/:id"),
  protectedRoutes as any,
  sendMessages as any
);

export default chatRouter;
