import { ChatMessageResponseModel } from "../ChatMessageResponseModel";

export class SendMessageResponseModel {
  userMessage?: ChatMessageResponseModel;
  aiMessage?: ChatMessageResponseModel;
}
