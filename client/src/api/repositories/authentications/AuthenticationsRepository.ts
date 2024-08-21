import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";
import { LoginRequestModel } from "./model/login/LoginRequestModel";
import client from "api/client";
import { AuthenPath } from "api/ApiPath";

export interface IAuthenticationsRepository {
  login(body: LoginRequestModel): Promise<BaseApiResponseModel<any>>;
}

class AuthenticationsImpl implements IAuthenticationsRepository {
  async login(body: LoginRequestModel): Promise<BaseApiResponseModel<any>> {
    return await client?.post(AuthenPath?.LOGIN, body);
  }
}

export const defaultAuthenticationsRepository = new AuthenticationsImpl();
