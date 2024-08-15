import { HotelPath } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";
import client from "api/client";
import { CreateHotelRequestModel } from "./model/create/CreateHotelRequestModel";
import { HotelsResponseModel } from "./model/HotelResponseModel";
import { HotelsRequestModel } from "./model/HotelsRequestModel";

export interface IHotelsRepository {
  getList(
    params: HotelsRequestModel
  ): Promise<BaseApiResponseModel<HotelsResponseModel[]>>;

  createHotel(
    body: CreateHotelRequestModel
  ): Promise<BaseApiResponseModel<HotelsResponseModel>>;

  getDetail(id: string): Promise<BaseApiResponseModel<HotelsResponseModel>>;
}

class HotelsRepositoryImpl implements IHotelsRepository {
  async getList(
    params: HotelsRequestModel
  ): Promise<BaseApiResponseModel<HotelsResponseModel[]>> {
    return await client.get(HotelPath.LIST, params);
  }

  async createHotel(
    body: CreateHotelRequestModel
  ): Promise<BaseApiResponseModel<HotelsResponseModel>> {
    return await client?.post(HotelPath.CREATE, body);
  }

  async getDetail(
    id: string
  ): Promise<BaseApiResponseModel<HotelsResponseModel>> {
    return await client.get(`${HotelPath.DETAILS}/${id}`);
  }
}

export const defaultHotelsRepository = new HotelsRepositoryImpl();
