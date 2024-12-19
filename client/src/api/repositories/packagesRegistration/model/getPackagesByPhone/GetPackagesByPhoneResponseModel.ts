import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { BasePackagesResponseModel } from "./BasePackagesResponseModel";

export class GetPackagesByPhoneResponseModel {
  basePackage?: BasePackagesResponseModel;
  items?: Array<TopupResponseModel> | [];
}
