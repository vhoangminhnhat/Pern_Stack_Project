import express from "express";
import {
  chatMessages,
  getUserConversations,
  sendMessages,
} from "../controllers/chatMessages/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const chatRouter = express.Router();

chatRouter.get(
  "/user-conversations",
  protectedRoutes as any,
  getUserConversations as any
);

chatRouter.get("/messages/:id", protectedRoutes as any, chatMessages as any);

chatRouter.post(
  "/messages/send/:id",
  protectedRoutes as any,
  sendMessages as any
);

export default chatRouter;
