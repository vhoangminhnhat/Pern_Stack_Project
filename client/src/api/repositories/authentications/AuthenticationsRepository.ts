import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { LoginRequestModel } from "./model/LoginRequestModel";
import { LoginResponseModel } from "./model/LoginResponseModel";

export interface IAuthenticationsRepository {
  login(
    body: LoginRequestModel
  ): Promise<BaseApiResponseModel<LoginResponseModel>>;
}

class AuthenticationsImpl implements IAuthenticationsRepository {
  async login(
    body: LoginRequestModel
  ): Promise<BaseApiResponseModel<LoginResponseModel>> {
    return await client?.post(API_PATH?.LOGIN, body);
  }
}

export const defaultAuthenticationsRepository = new AuthenticationsImpl();
