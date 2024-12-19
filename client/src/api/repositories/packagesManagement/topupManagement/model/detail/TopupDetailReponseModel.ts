import {RoamingPackagesMore} from 'api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel';
import { TopupCategoryResponseModel } from '../TopupResponseModel';

export class TopupPackageDetailModel {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string | null;
  code?: string | null;
  cover?: string | null;
  description?: string | null;
  shortDescription?: Array<string> | null;
  durationDay?: number | null;
  price?: string | null;
  storage?: number | null;
  discountRate?: string | null;
  internalCallTotalHour?: number | null;
  externalCallTotalHour?: number | null;
  more?: Array<RoamingPackagesMore> | [];
  order?: number;
  type?: number;
  status?: number;
  simType?: number;
}

export class TopupDetailResponseModel {
  package?: TopupPackageDetailModel;
  categories?: Array<TopupCategoryResponseModel> | []
}
