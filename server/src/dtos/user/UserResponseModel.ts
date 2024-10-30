import { $Enums, User } from "@prisma/client";

export class UserResponseModel implements User {
  constructor(
    public conversationId: string[],
    public createdAt: Date,
    public fullName: string,
    public gender: $Enums.Gender,
    public id: string,
    public password: string,
    public updatedAt: Date,
    public username: string,
    public profileAvatar: string
  ) {}
}
