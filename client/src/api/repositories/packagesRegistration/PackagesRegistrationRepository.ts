import { PACKAGES_REGISTRAION } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { GetPackagesByPhoneRequestModel } from "./model/getPackagesByPhone/GetPackagesByPhoneRequestModel";
import { GetPackagesByPhoneResponseModel } from "./model/getPackagesByPhone/GetPackagesByPhoneResponseModel";
import { TopupRequestModel } from "../packagesManagement/topupManagement/model/TopupRequestModel";

export interface IPackagesRegisteationRepository {
  getPackageByPhone(
    phone: string,
    params: GetPackagesByPhoneRequestModel
  ): Promise<BaseApiResponseModel<GetPackagesByPhoneResponseModel>>;
}

class PackagesRegistrationImpl implements IPackagesRegisteationRepository {
  async getPackageByPhone(
    phone: string,
    params: GetPackagesByPhoneRequestModel
  ): Promise<BaseApiResponseModel<GetPackagesByPhoneResponseModel>> {
    return await client?.get(
      `${PACKAGES_REGISTRAION?.PACKAGES_BY_PHONE}/${phone}/packages`,
      params
    );
  }
}

export const defaultPackagesRegistraionRepository =
  new PackagesRegistrationImpl();
