import {RoamingPackagesMore} from 'api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel';
import {
  TopupCategoryResponseModel,
  TopupCountryInfo,
  TopupResponseModel,
} from '../../TopupResponseModel';

export class ErrorData implements TopupResponseModel {
  countries?: Array<TopupCountryInfo> | [];
  categories?: Array<TopupCategoryResponseModel> | [];
  suppliers?: Array<unknown> | [];
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
  descriptionError?: string;
}

export class AddPackageFromB2BResponseModel {
  passedData: TopupResponseModel[] | [];
  errData: Array<ErrorData> | [];
}
