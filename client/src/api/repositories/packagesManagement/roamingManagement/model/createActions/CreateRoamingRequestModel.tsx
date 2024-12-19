import {
  RoamingCategoryInfo,
  RoamingPackagesMore,
} from '../RoamingManagementResponseModel';
export class CreateRoamingRequestModel {
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
  categories?: Array<RoamingCategoryInfo> | [];
  country?: Array<Country> | [];
  countries?:Array<Country> | [];
}
export interface Country {
  id?: string;
  name?: string;
  code?: string;
  capital?: string;
  region?: string;
  cover?: string;
  ensign?: string;
  order?: string;
  active?: string;
  roamingPartner?: RoamingPartner;
}
export interface RoamingPartner {
  id?: string;
  name?: string;
  code?: string;
  active?: string;
  type?: string;
  handSet?: string;
  transferredAccountDataInterchangeGroup?: string;
  codeMobileDevice?: string;
}
