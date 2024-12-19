import {
  RoamingPackagesCountryInfo,
  RoamingPackagesMore,
} from '../../roamingManagement/model/RoamingManagementResponseModel';

export class TopupCategoryResponseModel {
  id?: string;
  name?: string;
  code?: string;
  durationDay?: number | null;
  status?: number | null;
}

export class TopupCountryInfo extends RoamingPackagesCountryInfo {
  active?: string;
  capital?: string;
  code?: string;
  cover?: string;
  ensign?: string;
  id?: string;
  name?: string;
  order?: string | number;
  region?: string;
  roamingPartner?: {
    id?: string;
    name?: string;
    code?: string;
    active?: string;
    type?: string;
    handSet?: string;
    transferredAccountDataInterchangeGroup?: string;
    codeMobileDevice?: string;
  };
}

export class TopupSupplierResponseModel {}

export class TopupResponseModel {
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
}
