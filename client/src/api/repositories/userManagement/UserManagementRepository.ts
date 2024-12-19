import { USER_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { UserManagementRequestModel } from "./model/UserManagementRequest";
import { UserManagementResponseModel } from "./model/UserManagementResponse";
import { UserManagementCreateRequest } from "./model/createAction/UserManagementCreateRequest";
import { ResetPasswordRequest } from "./model/resetPassword/ResetPasswordRequest";
import { UserManagementUpdateRequest } from "./model/updateAction/UserManagementUpdateRequest";

export type UserManagementRepository = {
  getUserList(
    params: UserManagementRequestModel
  ): Promise<BaseApiResponseModel<UserManagementResponseModel[]>>;

  updateUser(
    body: UserManagementUpdateRequest
  ): Promise<BaseApiResponseModel<UserManagementResponseModel>>;

  createUser(
    body: UserManagementCreateRequest
  ): Promise<BaseApiResponseModel<UserManagementResponseModel>>;

  resetPassword(body: ResetPasswordRequest): Promise<BaseApiResponseModel<any>>;
};

class UserManagementImpl implements UserManagementRepository {
  async getUserList(
    params: UserManagementRequestModel
  ): Promise<BaseApiResponseModel<UserManagementResponseModel[]>> {
    return await client.get(USER_MANAGEMENT?.USER_LIST, params);
  }

  async updateUser(
    body: UserManagementUpdateRequest
  ): Promise<BaseApiResponseModel<UserManagementResponseModel>> {
    return await client.put(USER_MANAGEMENT?.UPDATE_USER, body);
  }

  async createUser(
    body: UserManagementCreateRequest
  ): Promise<BaseApiResponseModel<UserManagementResponseModel>> {
    return await client.post(USER_MANAGEMENT?.CREATE_USER, body);
  }

  async resetPassword(body: ResetPasswordRequest) {
    return await client.put(USER_MANAGEMENT?.RESET_PASSWORD, body);
  }
}

export const defaultUserManagementRepository = new UserManagementImpl();
