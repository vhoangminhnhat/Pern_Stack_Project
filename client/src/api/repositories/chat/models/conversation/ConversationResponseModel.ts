import { ChatMessageResponseModel } from "../ChatMessageResponseModel";

export class ConversationResponseModel {
  id?: string;
  messages?: ChatMessageResponseModel[];
  participants?: {
    id?: string;
    username?: string;
    fullName?: string;
    profileAvatar?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
