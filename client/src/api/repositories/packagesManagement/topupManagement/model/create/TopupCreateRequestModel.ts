import {
  RoamingCategoryInfo,
  RoamingPackagesMore,
} from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";

export class TopupCreateRequestModel {
  id?: string;
  name?: string;
  code?: string;
  cover?: string;
  description?: string;
  durationDay?: number;
  price?: string;
  storage?: number;
  discountRate?: string;
  internalCallTotalHour?: number;
  externalCallTotalHour?: number;
  more?: RoamingPackagesMore[];
  order?: number;
  type?: number;
  simType?: number;
  capacityUnit?: string;
  durationUnit?: string;
  categories?: Array<{ label?: string; value?: string }> | [] | string[];
}
