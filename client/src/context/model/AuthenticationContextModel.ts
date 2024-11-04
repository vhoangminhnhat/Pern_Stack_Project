import { UserResponseModel } from "api/repositories/user/model/UserResponseModel";

export class AuthenticationContextModel {
  user?: UserResponseModel;
  getUser?: () => Promise<void>;
  isAuthenticated?: () => boolean;
}
