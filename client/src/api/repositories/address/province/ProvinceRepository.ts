import { ADDRESS_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ProvinceCreateRequestModel } from "./model/actions/create/ProvinceCreateRequestModel";
import { ProvinceUpdateRequestModel } from "./model/actions/update/ProvinceUpdateRequestModel";
import { ProvinceDetailResponseModel } from "./model/detail/ProvinceDetailResponseModel";
import { ProvinceListRequestModel } from "./model/ProvinceListRequestModel";
import { ProvinceListResponseModel } from "./model/ProvinceListResponseModel";

export interface IProvinceListRepository {
  getList(
    params: ProvinceListRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel[]>>;

  getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<ProvinceDetailResponseModel>>;

  updateProvince(
    body: ProvinceUpdateRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel>>;

  createProvince(
    body: ProvinceCreateRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel>>;

  deleteProvince(params: {
    id: string;
  }): Promise<BaseApiResponseModel<ProvinceListResponseModel>>;
}

class ProvinceListImpl implements IProvinceListRepository {
  async getList(
    params: ProvinceListRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel[]>> {
    return await client?.get(ADDRESS_PATH?.PROVINCE_LIST, params);
  }

  async getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<ProvinceDetailResponseModel>> {
    return await client?.get(ADDRESS_PATH?.PROVINCE_DETAIL, params);
  }

  async updateProvince(
    body: ProvinceUpdateRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel>> {
    return await client?.put(ADDRESS_PATH?.UPDATE_PROVINCE, body);
  }

  async createProvince(
    body: ProvinceCreateRequestModel
  ): Promise<BaseApiResponseModel<ProvinceListResponseModel>> {
    return await client?.post(ADDRESS_PATH?.CREATE_PROVINCE, body);
  }

  async deleteProvince(params: {
    id: string;
  }): Promise<BaseApiResponseModel<ProvinceListResponseModel>> {
    return await client?.delete(ADDRESS_PATH?.DELETE_PROVINCE, params);
  }
}

export const defaultProvinceListRepository = new ProvinceListImpl();
