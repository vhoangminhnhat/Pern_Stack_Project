export class UserResponseModel {
  constructor(
    public id: string,
    public token?: string,
    public conversationId?: string[],
    public createdAt?: Date,
    public fullName?: string,
    public gender?: "male" | "female",
    public password?: string,
    public updatedAt?: Date,
    public username?: string,
    public profileAvatar?: string,
    public code?: string | null,
    public birthDay?: Date | null,
    public placeOfOrigin?: string | null,
    public identifyCard?: string | null,
    public dateOfIssue?: Date | null,
    public placeOfIssue?: string | null,
    public religion?: string | null
  ) {}
}
