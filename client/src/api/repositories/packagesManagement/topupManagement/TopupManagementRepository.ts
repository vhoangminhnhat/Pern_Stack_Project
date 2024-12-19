import { TOPUP_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { TopupCreateRequestModel } from "./model/create/TopupCreateRequestModel";
import { TopupDeleteResponseModel } from "./model/delete/TopupDeleteResponseModel";
import { TopupDetailResponseModel } from "./model/detail/TopupDetailReponseModel";
import { AddPackageFromB2BResponseModel } from "./model/listFromB2B/addPackageFromB2B/AddPackageFromB2BResponseModel";
import { ListFromB2BRequestModel } from "./model/listFromB2B/ListFromB2BRequestModel";
import { ListFromB2BResponseModel } from "./model/listFromB2B/ListFromB2BResponseModel";
import { TopupRequestModel } from "./model/TopupRequestModel";
import { TopupResponseModel } from "./model/TopupResponseModel";
import { TopupUpdateRequestModel } from "./model/update/TopupUpdateRequestModel";

export interface ITopupManagementRepository {
  getList(
    params: TopupRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel[]>>;
  detailTopup(
    code: string
  ): Promise<BaseApiResponseModel<TopupDetailResponseModel>>;
  updateTopup(
    body: TopupUpdateRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel>>;
  createTopup(
    body: TopupCreateRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel>>;
  deleteTopup(
    body: [{ code: string }]
  ): Promise<BaseApiResponseModel<TopupDeleteResponseModel>>;
  getListFromB2B(
    params: ListFromB2BRequestModel
  ): Promise<BaseApiResponseModel<ListFromB2BResponseModel[]>>;
  importListFromB2B(
    list: ListFromB2BResponseModel[]
  ): Promise<BaseApiResponseModel<AddPackageFromB2BResponseModel>>;
}

class TopupManagementImpl implements ITopupManagementRepository {
  async getList(
    params: TopupRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel[]>> {
    return await client?.get(TOPUP_MANAGEMENT?.LIST, params);
  }
  async detailTopup(
    code: string
  ): Promise<BaseApiResponseModel<TopupDetailResponseModel>> {
    return await client?.get(`${TOPUP_MANAGEMENT?.DETAIL}/${code}`);
  }
  async updateTopup(
    body: TopupUpdateRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel>> {
    return await client?.put(TOPUP_MANAGEMENT?.UPDATE, body);
  }
  async createTopup(
    body: TopupCreateRequestModel
  ): Promise<BaseApiResponseModel<TopupResponseModel>> {
    return await client?.post(TOPUP_MANAGEMENT?.CREATE, body);
  }
  async deleteTopup(
    body: [{ code: string }]
  ): Promise<BaseApiResponseModel<TopupDeleteResponseModel>> {
    return await client?.delete(TOPUP_MANAGEMENT?.DELETE, {
      data: { code: body?.[0]?.code },
    });
  }
  async getListFromB2B(
    params: ListFromB2BRequestModel
  ): Promise<BaseApiResponseModel<ListFromB2BResponseModel[]>> {
    return await client?.get(TOPUP_MANAGEMENT?.LIST_B2B, params);
  }
  async importListFromB2B(
    list: ListFromB2BResponseModel[]
  ): Promise<BaseApiResponseModel<AddPackageFromB2BResponseModel>> {
    return await client?.post(TOPUP_MANAGEMENT?.IMPORT_FROM_B2B, {
      data: list,
    });
  }
}

export const defaultTopupManagementRepository = new TopupManagementImpl();
