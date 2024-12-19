import { ADDRESS_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { AdministrativeUnitResponseModel } from "./AdministrativeUnitResponseModel";

export interface IAdministrativeUnitRepository {
  getList(params: {
    page: number;
    pagination: number;
  }): Promise<BaseApiResponseModel<AdministrativeUnitResponseModel[]>>;
}

class AdministrativeUnitImpl implements IAdministrativeUnitRepository {
  async getList(params: {
    page: number;
    pagination: number;
  }): Promise<BaseApiResponseModel<AdministrativeUnitResponseModel[]>> {
    return await client?.get(ADDRESS_PATH?.UNITS, params);
  }
}

export const defaultAdminUnits = new AdministrativeUnitImpl();
