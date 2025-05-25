import express from "express";
import {
  aiChatMessage,
  chatMessages,
  getUserConversations,
  sendMessages,
} from "../controllers/chatMessages/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import { getAppApiBase } from "../utils/helpers.js";

const chatRouter = express.Router();

chatRouter.get(
  getAppApiBase("user-conversations"),
  protectedRoutes as any,
  getUserConversations as any
);

chatRouter.get(
  getAppApiBase("messages/:id"),
  protectedRoutes as any,
  chatMessages as any
);

chatRouter.post(
  getAppApiBase("messages/send/:id"),
  protectedRoutes as any,
  sendMessages as any
);

chatRouter.post(
  getAppApiBase("ai"),
  protectedRoutes as any,
  aiChatMessage as any
);

export default chatRouter;
