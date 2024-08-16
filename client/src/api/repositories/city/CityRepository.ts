import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";
import { CityResponseModel } from "./model/CityResponseModel";
import client from "api/client";
import { AuthenPath } from "api/ApiPath";

export interface ICityRepository {
  getList(): Promise<BaseApiResponseModel<CityResponseModel[]>>;
}

class CityRepositoryImpl implements ICityRepository {
  async getList(): Promise<BaseApiResponseModel<CityResponseModel[]>> {
    return await client?.get(AuthenPath?.CITY_LIST);
  }
}

export const defaultCityRepository = new CityRepositoryImpl();
