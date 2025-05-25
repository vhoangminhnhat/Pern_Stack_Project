import { z } from "zod";

export const CreateConversationDto = z.object({
  participantId: z.string(),
});

export const SendMessageDto = z.object({
  conversationId: z.string(),
  body: z.string(),
});

export const ListConversationsDto = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
});

export type CreateConversationDtoType = z.infer<typeof CreateConversationDto>;
export type SendMessageDtoType = z.infer<typeof SendMessageDto>;
export type ListConversationsDtoType = z.infer<typeof ListConversationsDto>;
