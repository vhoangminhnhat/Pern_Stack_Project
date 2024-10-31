import { Request, Response } from "express";
import prisma from "../../../database/db.js";
import { ErrorModel } from "../../dtos/baseApiResponseModel/BaseApiResponseModel.js";
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
    const { id: recievedId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    let conversation = await prisma.conversations.findFirst({
      where: {
        participantsId: {
          hasEvery: [recievedId, senderId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversations.create({
        data: {
          participantsId: {
            set: [recievedId, senderId],
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

export const chatMessages = async (req: Request, res: Response) => {};
