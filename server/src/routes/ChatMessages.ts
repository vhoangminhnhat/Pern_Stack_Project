import express from "express";
import {
  aiChatMessage,
  aiConversation,
  listConversations,
} from "../controllers/chatMessages/index.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const chatRouter = express.Router();

chatRouter.get(
  "/conversations",
  protectedRoutes as any,
  listConversations as any
);

chatRouter.post("/ai", protectedRoutes as any, aiChatMessage as any);

chatRouter.post(
  "/ai-conversation",
  protectedRoutes as any,
  aiConversation as any
);

export default chatRouter;
