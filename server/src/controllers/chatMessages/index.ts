import axios from "axios";
import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { ChatMessageRequestModel } from "../../dtos/chatMessage/ChatMessageRequestModel.js";
import { UserResponseModel } from "../../dtos/user/UserResponseModel.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export interface IChatMessageInfo extends Request {
  params: {
    id: string;
  };
  body: ChatMessageRequestModel;
  user: UserResponseModel;
}

export class ChatMessageController {
  async aiChatMessage(req: Request, res: Response) {
    const { message } = req.body;
    if (!message) {
      return getBaseErrorResponse(
        { code: 400, message: "Message is required" },
        res
      );
    }
    try {
      const ollamaRes = await axios.post("http://localhost:11434/api/chat", {
        model: "deepseek-coder:1.5b",
        messages: [{ role: "user", content: message }],
      });
      return res.status(200).json({
        data: {
          data: ollamaRes.data.message?.content || ollamaRes.data,
        },
        message: "Get message successfully",
      });
    } catch (err) {
      return getBaseErrorResponse(
        {
          code: 500,
          message: err instanceof Error ? err.message : "Ollama error",
        },
        res
      );
    }
  }

  async aiConversation(req: IChatMessageInfo, res: Response) {
    try {
      const { message } = req.body;
      const senderId = req.user.id;

      if (!message) {
        return getBaseErrorResponse(
          { code: 400, message: "Message is required" },
          res
        );
      }

      // Find or create conversation with AI
      let conversation = await prisma.conversations.findFirst({
        where: {
          participantsId: {
            hasEvery: [process.env.AI_USER_ID!, senderId!],
          },
        },
      });

      if (!conversation) {
        conversation = await prisma.conversations.create({
          data: {
            participantsId: {
              set: [process.env.AI_USER_ID!, senderId!],
            },
          },
        });
      }

      // Create user message
      const userMessage = await prisma.messages.create({
        data: {
          body: message,
          senderId: senderId!,
          conversationsId: conversation.id,
        },
      });

      // Get AI response from Ollama
      const ollamaRes = await axios.post("http://localhost:11434/api/chat", {
        model: "deepseek-coder:1.5b",
        messages: [{ role: "user", content: message }],
      });

      // Create AI message
      const aiMessage = await prisma.messages.create({
        data: {
          body: ollamaRes.data.message?.content || ollamaRes.data,
          senderId: process.env.AI_USER_ID!,
          conversationsId: conversation.id,
        },
      });

      return res.status(200).json({
        data: {
          userMessage,
          aiMessage,
        },
        message: "Chat message sent successfully",
      });
    } catch (err) {
      return getBaseErrorResponse(
        {
          code: 500,
          message:
            err instanceof Error
              ? err.message
              : "Failed to process chat message",
        },
        res
      );
    }
  }

  async listConversations(req: IGetUserInfo, res: Response) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query as {
        page?: number;
        limit?: number;
      };

      const conversations = await prisma.conversations.findMany({
        where: {
          participantsId: {
            has: userId,
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          participants: {
            select: {
              id: true,
              username: true,
              fullName: true,
              profileAvatar: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });

      const total = await prisma.conversations.count({
        where: {
          participantsId: {
            has: userId,
          },
        },
      });

      return res.status(200).json({
        data: conversations,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
        message: "Get conversations successfully",
      });
    } catch (error) {
      getBaseErrorResponse(error as unknown as ErrorModel, res);
    }
  }
}

const chatMessageController = new ChatMessageController();
export const { aiChatMessage, aiConversation, listConversations } =
  chatMessageController;
