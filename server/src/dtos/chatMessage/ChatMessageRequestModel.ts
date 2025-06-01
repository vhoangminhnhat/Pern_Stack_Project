export class ChatMessageRequestModel {
  message?: string;
}

export class AiConversationRequestModel {
  body?: ChatMessageRequestModel;
  file?: Express.Multer.File;
}
