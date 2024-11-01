import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import { UserResponseModel } from "../user/model/UserResponseModel";
import { SignUpRequestModel } from "./model/SignUpRequestModel";
import { SignUpResponseModel } from "./model/SignUpResponseModel";
import client from "api/client/client";
import { authenPaths } from "api/ApiPaths";

export interface IAuthenticationRepository {
  login(
    body: LoginRequestModel
  ): Promise<BaseApiResponseModel<UserResponseModel>>;
  signUp(
    body: SignUpRequestModel
  ): Promise<BaseApiResponseModel<SignUpResponseModel>>;
}

class AuthenticationImpl implements IAuthenticationRepository {
  async login(
    body: LoginRequestModel
  ): Promise<BaseApiResponseModel<UserResponseModel>> {
    return client.post(authenPaths?.LOGIN, body);
  }

  async signUp(
    body: SignUpRequestModel
  ): Promise<BaseApiResponseModel<SignUpResponseModel>> {
    return client.post(authenPaths?.SIGNUP, body);
  }
}

export const defaultAuthenRepository = new AuthenticationImpl();
