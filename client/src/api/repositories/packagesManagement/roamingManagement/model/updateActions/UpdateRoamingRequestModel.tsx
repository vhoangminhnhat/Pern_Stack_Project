import {RoamingPackagesMore} from '../RoamingManagementResponseModel';
export class UpdateRoamingRequestModel {
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
