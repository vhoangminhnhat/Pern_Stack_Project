import { CHAT_MESSAGE } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ChatMessageRequestModel } from "./models/ChatMessageRequestModel";
import { ChatMessageResponseModel } from "./models/ChatMessageResponseModel";
import { ConversationResponseModel } from "./models/conversation/ConversationResponseModel";
import { SendMessageResponseModel } from "./models/sendMessage/SendMessageResponseModel";

export interface IChatRepository {
  listConversations(params: {
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<ConversationResponseModel[]>>;

  getMessages(
    conversationId: string
  ): Promise<BaseApiResponseModel<ChatMessageResponseModel[]>>;

  sendMessage(
    body: ChatMessageRequestModel
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>>;
}

class ChatImpl implements IChatRepository {
  async listConversations(params: {
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<ConversationResponseModel[]>> {
    return await client.get(CHAT_MESSAGE?.CONVERSATIONS, params);
  }

  async getMessages(
    conversationId: string
  ): Promise<BaseApiResponseModel<ChatMessageResponseModel[]>> {
    return await client.get(`${CHAT_MESSAGE.MESSAGES}/${conversationId}`);
  }

  async sendMessage(
    body: ChatMessageRequestModel
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>> {
    return await client.post(CHAT_MESSAGE?.AI_CONVERSATION, body);
  }
}

export const chatRepository: IChatRepository = new ChatImpl();
