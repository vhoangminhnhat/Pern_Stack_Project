import { TravelSimListRequestModel } from "./model/TravelSimListRequestModel";
import { BaseApiResponseModel } from "../../baseApiResponseModel/BaseApiResponseModel";
import { TravelSimResponseModel } from "./model/TravelSimResponseModel";
import { TravelSimDetailRequestModel } from "./model/TravelSimDetailRequestModel";
import { TRAVEL_SIM } from "api/ApiPath";
import client from "api/client";
import { TravelSimConfirmRequestModel } from "./model/travelSimConfirm/TravelSimConfirmRequestModel";
import { NationListResponseModel } from "./model/nationList/NationListResponseModel";
import { UpdateProfileStatusRequestModel } from "./model/updateProfileStatus/UpdateProfileStatusRequestModel";
import { SimConnectingRequestModel } from "./model/simConnecting/SimConnectingRequestModel";

export interface ITravelSimRepository {
  getList(
    params: TravelSimListRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel[]>>;
  getTravelSimDetail(
    params: TravelSimDetailRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>>;
  getOcrInfo(
    form: FormData
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>>;
  confirmInfo(
    body: TravelSimConfirmRequestModel
  ): Promise<BaseApiResponseModel<{ code: number; message: string }>>;
  updateInfo(
    body: TravelSimDetailRequestModel
  ): Promise<BaseApiResponseModel<TravelSimDetailRequestModel>>;
  getNationList(): Promise<BaseApiResponseModel<NationListResponseModel[]>>;
  updateProfileStatus(
    body: UpdateProfileStatusRequestModel
  ): Promise<BaseApiResponseModel<{ code: number; message: string }>>;
  simConnecting(
    body: SimConnectingRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>>;
  createProfile(
    form: FormData,
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>>;
  confirmInfoV2(
    body: TravelSimConfirmRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>>;
}

class TravelSimImpl implements ITravelSimRepository {
  async getList(
    params: TravelSimListRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel[]>> {
    return await client?.get(TRAVEL_SIM?.LIST, params);
  }

  async getTravelSimDetail(
    params: TravelSimDetailRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>> {
    return await client?.get(TRAVEL_SIM?.DETAIL, params);
  }

  async getOcrInfo(
    form: FormData
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>> {
    return await client?.post(TRAVEL_SIM?.ADD, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async confirmInfo(
    body: TravelSimConfirmRequestModel
  ): Promise<BaseApiResponseModel<{ code: number; message: string }>> {
    return await client?.post(TRAVEL_SIM?.CONFIRM, body);
  }

  async updateInfo(
    body: TravelSimDetailRequestModel
  ): Promise<BaseApiResponseModel<TravelSimDetailRequestModel>> {
    return await client?.post(TRAVEL_SIM?.UPDATE, body);
  }

  async getNationList(): Promise<
    BaseApiResponseModel<NationListResponseModel[]>
  > {
    return await client?.get(TRAVEL_SIM?.NATION_LIST);
  }

  async updateProfileStatus(
    body: UpdateProfileStatusRequestModel
  ): Promise<BaseApiResponseModel<{ code: number; message: string }>> {
    return await client?.put(TRAVEL_SIM?.UPDATE_STATUS, body);
  }

  async simConnecting(
    body: SimConnectingRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>> {
    return await client?.post(TRAVEL_SIM?.CONNECT_SIM, body);
  }

  async createProfile(
    form: FormData,
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>> {
    return await client?.post(TRAVEL_SIM?.CREATE_PROFILE, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async confirmInfoV2(
    body: TravelSimConfirmRequestModel
  ): Promise<BaseApiResponseModel<TravelSimResponseModel>> {
    return await client?.post(TRAVEL_SIM?.CONFIRM_PROFILE_V2, body);
  }
}

export const defaultTravelSimRepository = new TravelSimImpl();
