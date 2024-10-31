import { Messages } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import {
  BaseApiResponseModel,
  ErrorModel,
} from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
import { ChatMessageRequestModel } from "../../dtos/chatMessage/ChatMessageRequestModel.js";
import { UserResponseModel } from "../../dtos/user/UserResponseModel.js";
import { getBaseErrorResponse } from "../../utils/helpers.js";

export interface IChatMessageInfo extends Request {
  params: {
    id: string;
  };
  body: ChatMessageRequestModel;
  user: UserResponseModel;
}

export const sendMessages = async (req: IChatMessageInfo, res: Response) => {
  try {
    const { id: recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    let conversation = await prisma.conversations.findFirst({
      where: {
        participantsId: {
          hasEvery: [recieverId, senderId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversations.create({
        data: {
          participantsId: {
            set: [recieverId, senderId],
          },
        },
      });
    }

    //Create a new message data
    let newMessage = await prisma.messages.create({
      data: {
        body: message as string,
        senderId,
        conversationsId: conversation.id,
      },
    });
    if (newMessage) {
      //Update the conversation by parsing the newMessage data in messages
      conversation = await prisma.conversations.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }
  } catch (error) {
    getBaseErrorResponse(error as unknown as ErrorModel, res);
  }
};

export const chatMessages = async (
  req: Request<UserResponseModel>,
  res: Response<BaseApiResponseModel<Messages[]>>
) => {
  try {
    const { id: userToMessId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversations.findFirst({
      where: {
        participantsId: {
          hasEvery: [userToMessId, senderId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!conversation) {
      return res.status(200).json({
        data: [],
        message: "Get chat message successfully",
      });
    }
    return res.status(200).json({
      data: conversation.messages,
      message: "Get chat message successfully",
    });
  } catch (error) {
    getBaseErrorResponse(error as unknown as ErrorModel, res);
  }
};
