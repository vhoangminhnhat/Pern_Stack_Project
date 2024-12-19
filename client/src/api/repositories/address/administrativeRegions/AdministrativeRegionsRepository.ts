import { ADDRESS_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { AdministrativeRegionsResponseModel } from "./AdministrativeRegionsResponseModel";

export interface IAdministrativeRegionsRepository {
  getList(params: {
    page: number;
    pagination: number;
  }): Promise<BaseApiResponseModel<AdministrativeRegionsResponseModel[]>>;
}

class AdministrativeRegionsImpl implements IAdministrativeRegionsRepository {
  async getList(params: {
    page: number;
    pagination: number;
  }): Promise<BaseApiResponseModel<AdministrativeRegionsResponseModel[]>> {
    return await client?.get(ADDRESS_PATH?.REGIONS, params);
  }
}

export const defaultAdminRegions = new AdministrativeRegionsImpl();
