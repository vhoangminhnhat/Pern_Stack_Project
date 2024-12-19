import {
  RoamingCategoryInfo,
  RoamingPackagesMore,
} from '../RoamingManagementResponseModel';

export class RoamingDetailPackage {
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
}

export class RoamingDetailResponseModel {
  package?: RoamingDetailPackage;
  categories?: Array<RoamingCategoryInfo>;
}
