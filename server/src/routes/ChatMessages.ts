import express from "express";
import multer from "multer";
import {
  aiConversation,
  listConversations,
} from "../controllers/chatMessages/index.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const chatRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

chatRouter.get(
  "/conversations",
  protectedRoutes as any,
  listConversations as any
);

chatRouter.post(
  "/ai-conversation",
  protectedRoutes as any,
  upload.single("file"),
  aiConversation as any
);

export default chatRouter;
