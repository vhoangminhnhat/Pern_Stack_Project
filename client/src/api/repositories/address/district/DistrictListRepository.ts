import { ADDRESS_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { DistrictCreateRequestModel } from "./model/actions/create/DistrictCreateRequestModel";
import { DistrictUpdateRequestModel } from "./model/actions/update/DistrictUpdateRequestModel";
import { DistrictDetailResponseModel } from "./model/detail/DistrictDetailResponseModel";
import { DistrictListRequestModel } from "./model/DistrictListRequestModel";
import { DistrictListResponseModel } from "./model/DistrictListResponseModel";

export interface IDistrictListRepository {
  getList(
    params: DistrictListRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel[]>>;

  getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<DistrictDetailResponseModel>>;

  updateDistrict(
    body: DistrictUpdateRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel>>;

  createDistrict(
    body: DistrictCreateRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel>>;

  deleteDistrict(params: {
    id: string;
  }): Promise<BaseApiResponseModel<DistrictListResponseModel>>;
}

class DistrictListImpl implements IDistrictListRepository {
  async getList(
    params: DistrictListRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel[]>> {
    return await client?.get(ADDRESS_PATH?.DISTRICT_LIST, params);
  }

  async getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<DistrictDetailResponseModel>> {
    return await client?.get(ADDRESS_PATH?.DISTRICT_DETAIL, params);
  }

  async updateDistrict(
    body: DistrictUpdateRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel>> {
    return await client?.put(ADDRESS_PATH?.UPDATE_DISTRICT, body);
  }

  async createDistrict(
    body: DistrictCreateRequestModel
  ): Promise<BaseApiResponseModel<DistrictListResponseModel>> {
    return await client?.post(ADDRESS_PATH?.CREATE_DISTRICT, body);
  }

  async deleteDistrict(params: {
    id: string;
  }): Promise<BaseApiResponseModel<DistrictListResponseModel>> {
    return await client?.delete(ADDRESS_PATH?.DELETE_DISTRICT, params);
  }
}

export const defaultDistrictListRepository = new DistrictListImpl();
