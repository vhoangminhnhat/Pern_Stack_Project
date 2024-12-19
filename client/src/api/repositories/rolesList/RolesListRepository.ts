import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { RolesListResponse } from "./model/RolesListResponse";

export type RolesListRepository = {
  getRolesList(params: {
    limit: 1000;
  }): Promise<BaseApiResponseModel<RolesListResponse[]>>;
};

class RolesListImpl implements RolesListRepository {
  async getRolesList(params: {
    limit: 1000;
  }): Promise<BaseApiResponseModel<RolesListResponse[]>> {
    return await client.get(API_PATH?.ROLE_LIST, params);
  }
}

export const defaultRolesListRepository = new RolesListImpl();
