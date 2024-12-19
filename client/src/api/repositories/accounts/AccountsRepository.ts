import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { UserInfoResponseModel } from "./model/UserInfoResponse";

export interface IAccountsRepository {
  getUser(): Promise<BaseApiResponseModel<UserInfoResponseModel>>;
}

class AccountsImpl implements IAccountsRepository {
  async getUser(): Promise<BaseApiResponseModel<UserInfoResponseModel>> {
    return await client?.get(API_PATH.USER_INFO);
  }
}

export const defaultAccountsRepository = new AccountsImpl();
