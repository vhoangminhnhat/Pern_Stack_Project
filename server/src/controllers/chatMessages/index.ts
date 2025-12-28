import axios from "axios";
import { Response } from "express";
import { PDFExtract } from "pdf.js-extract";
import * as XLSX from "xlsx";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import {
  AiConversationRequestModel,
  ChatMessageRequestModel,
} from "../../dtos/chatMessage/ChatMessageRequestModel.js";
import { IGetUserInfo } from "../../middlewares/protectedRoutes.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export class ChatMessageController {
  private static async getOrCreateAIUser() {
    const aiUser = await prisma.user.findFirst({
      where: {
        username: "AI Assistant",
      },
    });

    if (aiUser) {
      return aiUser;
    }

    return await prisma.user.create({
      data: {
        username: "AI Assistant",
        fullName: "AI Assistant",
        password: "ai_password",
        gender: "male",
        profileAvatar:
          "https://api.dicebear.com/7.x/bottts/svg?seed=ai-assistant",
      },
    });
  }

  static async aiConversation(
    req: IGetUserInfo & AiConversationRequestModel,
    res: Response
  ) {
    try {
      const { message } = req.body as ChatMessageRequestModel;
      const file = req.file;
      const senderId = req.user.id;

      if (!message && !file) {
        return getBaseErrorResponse(
          { code: 400, message: "Message or file is required" },
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

      const userMessage = await prisma.messages.create({
        data: {
          body: message || "Please analyze this document",
          senderId: senderId,
          fileName: file?.originalname || null,
          conversationsId: conversation.id,
        },
      });

      let prompt =
        message ||
        "Please analyze the above document in an academic style and search for additional relevant references in English or Vietnamese";
      let fileContent = "";

      if (file) {
        if (file.mimetype === "application/pdf") {
          try {
            const pdfExtract = new PDFExtract();
            const options = {};
            const data = await pdfExtract.extractBuffer(file.buffer, options);
            fileContent = data.pages
              .map((page) => page.content.map((item) => item.str).join(" "))
              .join("\n");

            prompt = `${prompt}\n\nDocument: ${file.originalname}\n\nContent:\n${fileContent}`;
          } catch (error) {
            console.error("Error parsing PDF:", error);
            return getBaseErrorResponse(
              {
                code: 400,
                message:
                  "Failed to parse PDF file. Please ensure it's a valid PDF.",
              },
              res
            );
          }
        } else if (
          file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const workbook = XLSX.read(file.buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          fileContent = JSON.stringify(data, null, 2);
          prompt = `${prompt}\n\nDocument: ${file.originalname}\n\nContent:\n${fileContent}`;
        }

        if (prompt.length > 12000) {
          prompt = prompt.substring(0, 12000) + "...\n[Content truncated]";
        }
      }

      try {
        const ollamaResponse = await axios.post(
          "http://127.0.0.1:11434/v1/chat/completions",
          {
            model: "deepseek-r1:1.5b",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          },
          {
            timeout: 120000,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let aiResponseContent =
          ollamaResponse.data.choices?.[0]?.message?.content || "";
        aiResponseContent = aiResponseContent
          .replace(/<think>.*?<\/think>/gis, "")
          ?.trim();

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
      } catch (ollamaError: any) {
        console.error("Ollama/DeepSeek service error:", ollamaError);
        if (
          ollamaError.code === "ECONNREFUSED" ||
          ollamaError.code === "ETIMEDOUT"
        ) {
          return getBaseErrorResponse(
            {
              code: 503,
              message:
                "Ollama/DeepSeek service is not available. Please ensure Ollama is running on port 11434 and the DeepSeek model is pulled.",
            },
            res
          );
        }

        if (ollamaError.code === "ECONNABORTED") {
          return getBaseErrorResponse(
            {
              code: 504,
              message:
                "Request to Ollama/DeepSeek service timed out. The model might be taking too long to respond.",
            },
            res
          );
        }

        // For other errors
        return getBaseErrorResponse(
          {
            code: 500,
            message:
              ollamaError.response?.data?.error ||
              "Failed to generate response from DeepSeek. Please try again.",
          },
          res
        );
      }
    } catch (error) {
      console.error("Error in aiConversation:", error);
      return getBaseErrorResponse(
        { code: 500, message: "Internal server error" },
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

export const { aiConversation, listConversations } = ChatMessageController;
