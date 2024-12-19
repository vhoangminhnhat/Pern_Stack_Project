import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ChangePasswordRequestModel } from "./model/ChangePasswordRequestModel";

export interface IChangePasswordRepository {
  changePassword(
    body: ChangePasswordRequestModel
  ): Promise<BaseApiResponseModel<any>>;
}

class ChangePasswordImpl implements IChangePasswordRepository {
  async changePassword(
    body: ChangePasswordRequestModel
  ): Promise<BaseApiResponseModel<any>> {
    return await client?.put(API_PATH?.CHANGE_PASS, body);
  }
}

export const defaultChangePasswordRepository = new ChangePasswordImpl();
