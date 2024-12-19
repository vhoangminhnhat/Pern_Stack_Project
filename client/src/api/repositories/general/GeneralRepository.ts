import { GENERAL } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import apiConfig from "api/client";
import { GeneralResponseModel } from "./models/GeneralResponseModel";

export type GeneralRepository = {
  getGeneralData(): Promise<BaseApiResponseModel<GeneralResponseModel[]>>;
};

class GeneralImpl implements GeneralRepository {
  async getGeneralData(): Promise<
    BaseApiResponseModel<GeneralResponseModel[]>
  > {
    return await apiConfig.get(GENERAL.GENERAL_DATA);
  }
}

export const defaultGeneralRepository = new GeneralImpl();
