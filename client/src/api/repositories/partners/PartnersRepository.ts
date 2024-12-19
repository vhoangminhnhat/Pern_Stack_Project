import { API_PATH } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import apiConfig from "api/client";
import { PartnersResponse } from "./model/PartnersResponse";

export type PartnersRepository = {
  getPartnerList(): Promise<BaseApiResponseModel<PartnersResponse[]>>;
};

class PartnersImpl implements PartnersRepository {
  async getPartnerList(): Promise<BaseApiResponseModel<PartnersResponse[]>> {
    return await apiConfig.get(API_PATH.PARTNER_LIST);
  }
}

export const defaultPartnersRepository = new PartnersImpl();
