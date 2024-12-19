import { ADDRESS_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { WardCreateRequestModel } from "./model/actions/create/WardCreateRequestModel";
import { WardUpdateResponseModel } from "./model/actions/update/WardUpdateRequestModel";
import { WardDetailResponseModel } from "./model/detail/WardDetailResponseModel";
import { WardListRequestModel } from "./model/WardListRequestModel";
import { WardListResponseModel } from "./model/WardListResponseModel";

export interface IWardListRepository {
  getList(
    params: WardListRequestModel
  ): Promise<BaseApiResponseModel<WardListResponseModel[]>>;

  getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<WardDetailResponseModel>>;

  updateWard(
    body: WardUpdateResponseModel
  ): Promise<BaseApiResponseModel<WardListResponseModel>>;

  createWard(
    body: WardCreateRequestModel
  ): Promise<BaseApiResponseModel<WardDetailResponseModel>>;

  deleteWard(params: {
    id: string;
  }): Promise<BaseApiResponseModel<WardDetailResponseModel>>;
}

class WardListImpl implements IWardListRepository {
  async getList(
    params: WardListRequestModel
  ): Promise<BaseApiResponseModel<WardListResponseModel[]>> {
    return await client?.get(ADDRESS_PATH?.WARD_LIST, params);
  }

  async getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<WardDetailResponseModel>> {
    return await client?.get(ADDRESS_PATH?.WARD_DETAIL, params);
  }

  async updateWard(
    body: WardUpdateResponseModel
  ): Promise<BaseApiResponseModel<WardListResponseModel>> {
    return await client?.put(ADDRESS_PATH?.UPDATE_WARD, body);
  }

  async createWard(
    body: WardCreateRequestModel
  ): Promise<BaseApiResponseModel<WardDetailResponseModel>> {
    return await client?.post(ADDRESS_PATH?.CREATE_WARD, body);
  }

  async deleteWard(params: {
    id: string;
  }): Promise<BaseApiResponseModel<WardDetailResponseModel>> {
    return await client?.delete(ADDRESS_PATH?.DELETE_WARD, params);
  }
}

export const defaultWardListRepository = new WardListImpl();
