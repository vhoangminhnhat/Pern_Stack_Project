import { profilePaths } from "api/ApiPaths";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client/client";
import { UserResponseModel } from "./model/UserResponseModel";

export interface IUserRespository {
  getProfile(): Promise<BaseApiResponseModel<UserResponseModel>>;
}

class UserImpl implements IUserRespository {
  async getProfile(): Promise<BaseApiResponseModel<UserResponseModel>> {
    return client.get(profilePaths?.PROFILE);
  }
}

export const defaultUserRespository = new UserImpl();
