import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { UserResponseModel } from "./models/UserResponseModel";

export interface IMyProfileRepository {
  getProfile(): Promise<BaseApiResponseModel<UserResponseModel>>;
  updateProfile(
    data: Partial<UserResponseModel>
  ): Promise<BaseApiResponseModel<UserResponseModel>>;
}

class MyProfileImpl implements IMyProfileRepository {
  async getProfile(): Promise<BaseApiResponseModel<UserResponseModel>> {
    return await client?.get(API_PATH.USER_INFO);
  }

  async updateProfile(
    data: Partial<UserResponseModel>
  ): Promise<BaseApiResponseModel<UserResponseModel>> {
    return await client?.put(API_PATH.USER_INFO, data);
  }
}

export const myProfileRepository = new MyProfileImpl();
