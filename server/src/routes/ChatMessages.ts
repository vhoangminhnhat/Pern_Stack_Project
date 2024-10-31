import express from "express";
import {
  chatMessages,
  sendMessages,
} from "../controllers/chatMessages/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const chatRouter = express.Router();

chatRouter.get("/messages/:id", chatMessages as any);

chatRouter.post(
  "/messages/send/:id",
  protectedRoutes as any,
  sendMessages as any
);

export default chatRouter;
