import { ROAMING_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { CreateRoamingRequestModel } from "./model/createActions/CreateRoamingRequestModel";
import { RoamingDetailResponseModel } from "./model/detail/RoamingDetailResponseModel";
import { RoamingManagementRequestModel } from "./model/RoamingManagementRequestModel";
import {
  DeleteResponseModel,
  PartnerRoamingModel,
  RoamingManagementResponseModel,
} from "./model/RoamingManagementResponseModel";

export interface IRoamingManagementRepository {
  getList(
    params: RoamingManagementRequestModel
  ): Promise<BaseApiResponseModel<RoamingManagementResponseModel[]>>;
  getDetail(
    code: string
  ): Promise<BaseApiResponseModel<RoamingDetailResponseModel>>;
  delete(data: {
    data: { code: string }[];
  }): Promise<BaseApiResponseModel<DeleteResponseModel>>;
  update(
    body: CreateRoamingRequestModel
  ): Promise<BaseApiResponseModel<CreateRoamingRequestModel>>;
  create(
    body: CreateRoamingRequestModel
  ): Promise<BaseApiResponseModel<CreateRoamingRequestModel>>;
  getPartnerRoaming(): Promise<BaseApiResponseModel<PartnerRoamingModel[]>>;
}

class RoamingManagementImpl implements IRoamingManagementRepository {
  async getList(
    params: RoamingManagementRequestModel
  ): Promise<BaseApiResponseModel<RoamingManagementResponseModel[]>> {
    return await client?.get(ROAMING_MANAGEMENT?.LIST, params);
  }
  async getDetail(
    code: string
  ): Promise<BaseApiResponseModel<RoamingDetailResponseModel>> {
    return await client?.get(`${ROAMING_MANAGEMENT?.DETAIL}/${code}`);
  }
  async create(
    body: CreateRoamingRequestModel
  ): Promise<BaseApiResponseModel<CreateRoamingRequestModel>> {
    return await client?.post(ROAMING_MANAGEMENT?.CREATE, body);
  }
  async delete(data: {
    data: { code: string }[];
  }): Promise<BaseApiResponseModel<DeleteResponseModel>> {
    return await client?.delete(ROAMING_MANAGEMENT?.DELETE, data);
  }
  async update(
    body: CreateRoamingRequestModel
  ): Promise<BaseApiResponseModel<CreateRoamingRequestModel>> {
    return await client?.put(ROAMING_MANAGEMENT?.UPDATE, body);
  }
  async getPartnerRoaming(): Promise<
    BaseApiResponseModel<PartnerRoamingModel[]>
  > {
    return await client?.get(ROAMING_MANAGEMENT?.PARTNER_LIST_ROAMING);
  }
}

export const defaultRoamingManagementRepository = new RoamingManagementImpl();
