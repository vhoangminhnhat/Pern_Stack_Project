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

  sendChatMessage(
    body: ChatMessageRequestModel
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>>;

  sendFileMessage(
    formData: FormData
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>>;
}

class ChatRepository implements IChatRepository {
  async listConversations(params: {
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<ConversationResponseModel[]>> {
    return await client.get(CHAT_MESSAGE.CONVERSATIONS, { params });
  }

  async getMessages(
    conversationId: string
  ): Promise<BaseApiResponseModel<ChatMessageResponseModel[]>> {
    return await client.get(`${CHAT_MESSAGE.MESSAGES}/${conversationId}`);
  }

  async sendChatMessage(
    body: ChatMessageRequestModel
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>> {
    try {
      return await client.post(CHAT_MESSAGE.AI_CONVERSATION, body);
    } catch (error: any) {
      if (error?.response?.data?.error?.message) {
        throw new Error(error.response.data.error.message);
      }
      throw new Error("Failed to send message. Please try again.");
    }
  }

  async sendFileMessage(
    formData: FormData
  ): Promise<BaseApiResponseModel<SendMessageResponseModel>> {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds timeout for file uploads
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    };

    try {
      return await client.post(CHAT_MESSAGE.AI_CONVERSATION, formData, config);
    } catch (error: any) {
      if (error?.response?.status === 413) {
        throw new Error(
          "File size is too large. Please upload a smaller file."
        );
      }
      if (error?.message?.includes("timeout")) {
        throw new Error(
          "Request timeout. The file might be too large or the server is taking too long to respond."
        );
      }
      if (error?.response?.data?.error?.message) {
        throw new Error(error.response.data.error.message);
      }
      throw new Error("Failed to send message. Please try again.");
    }
  }
}

export const chatRepository = new ChatRepository();
