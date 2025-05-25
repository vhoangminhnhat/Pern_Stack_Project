import axios from "axios";
import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { ChatMessageRequestModel } from "../../dtos/chatMessage/ChatMessageRequestModel.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export interface IChatMessageInfo extends IGetUserInfo {
  body: ChatMessageRequestModel;
}

export class ChatMessageController {
  private static async getOrCreateAIUser() {
    const aiUser = await prisma.user.findFirst({
      where: {
        username: "ai-assistant",
      },
    });

    if (aiUser) {
      return aiUser;
    }

    return await prisma.user.create({
      data: {
        username: "ai-assistant",
        fullName: "AI Assistant",
        password: "ai-assistant-password", // This won't be used for login
        gender: "male",
        profileAvatar:
          "https://api.dicebear.com/7.x/bottts/svg?seed=ai-assistant",
      },
    });
  }

  static async aiChatMessage(req: Request, res: Response) {
    const { message } = req.body;
    if (!message) {
      return getBaseErrorResponse(
        { code: 400, message: "Message is required" },
        res
      );
    }
    try {
      const ollamaRes = await axios.post(
        "http://127.0.0.1:11434/api/generate",
        {
          model: "deepseek-r1:1.5b",
          messages: [{ role: "user", content: message }],
        }
      );

      const aiResponseContent = (ollamaRes.data.response || "")
        .replace(/<think>.*?<\/think>/gs, "")
        .trim();
      return res.status(200).json({
        data: {
          data: aiResponseContent,
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

  static async aiConversation(req: IChatMessageInfo, res: Response) {
    try {
      const { message } = req.body;
      const senderId = req.user.id;

      if (!message) {
        return getBaseErrorResponse(
          { code: 400, message: "Message is required" },
          res
        );
      }

      const aiUser = await ChatMessageController.getOrCreateAIUser();

      let conversation = await prisma.conversations.findFirst({
        where: {
          participantsId: {
            hasEvery: [aiUser.id, senderId],
          },
        },
      });

      if (!conversation) {
        conversation = await prisma.conversations.create({
          data: {
            participantsId: {
              set: [aiUser.id, senderId],
            },
          },
        });
      }

      // Create user message
      const userMessage = await prisma.messages.create({
        data: {
          body: message,
          senderId: senderId,
          conversationsId: conversation.id,
        },
      });

      const ollamaRes = await axios.post(
        "http://127.0.0.1:11434/api/generate",
        {
          model: "deepseek-r1:1.5b",
          prompt: message,
          stream: false,
        }
      );

      const aiResponseContent = (ollamaRes.data.response || "")
        .replace(/<think>.*?<\/think>/gs, "")
        .trim();
      const aiMessage = await prisma.messages.create({
        data: {
          body: aiResponseContent,
          senderId: aiUser.id,
          conversationsId: conversation.id,
        },
      });

      return res.status(200).json({
        data: {
          userMessage: {
            ...userMessage,
            isAI: false,
          },
          aiMessage: {
            ...aiMessage,
            isAI: true,
          },
        },
        message: "Chat message sent successfully",
      });
    } catch (err) {
      console.error("Error in aiConversation:", err);
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

  static async listConversations(req: IGetUserInfo, res: Response) {
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
        pagination: {
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

export const { aiChatMessage, aiConversation, listConversations } =
  ChatMessageController;
