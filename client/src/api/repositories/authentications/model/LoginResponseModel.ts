export class LoginResponseModel {
  constructor(
    public id: string,
    public conversationId?: string[],
    public createdAt?: Date,
    public fullName?: string,
    public gender?: string,
    public password?: string,
    public updatedAt?: Date,
    public username?: string,
    public profileAvatar?: string
  ) {}
}
