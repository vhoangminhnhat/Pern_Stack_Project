import { $Enums, User } from "@prisma/client";

export class UserResponseModel {
  constructor(
    public id: string,
    public conversationId?: string[],
    public createdAt?: Date,
    public fullName?: string,
    public gender?: $Enums.Gender,
    public password?: string,
    public updatedAt?: Date,
    public username?: string,
    public profileAvatar?: string
  ) {}
}
