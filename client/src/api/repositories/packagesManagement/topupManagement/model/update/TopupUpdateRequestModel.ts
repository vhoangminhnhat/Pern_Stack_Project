import {
  RoamingCategoryInfo,
  RoamingPackagesMore,
} from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";

export class TopupUpdateRequestModel {
  id?: string;
  name?: string;
  code?: string;
  cover?: string;
  description?: string;
  categories?: Array<{ label?: string; value?: string }> | [] | string[];
  durationDay?: number;
  price?: string;
  storage?: number;
  discountRate?: string;
  internalCallTotalHour?: number;
  externalCallTotalHour?: number;
  more?: RoamingPackagesMore[];
  order?: number;
  type?: number;
  capacityUnit?: string;
  durationUnit?: string;
  simType?: number;
}
