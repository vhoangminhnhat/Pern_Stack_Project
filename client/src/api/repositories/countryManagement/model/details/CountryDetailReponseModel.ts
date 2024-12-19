import {CountryListResponseModel} from '../CountryListResponseModel';

export class RoamingPartnerModel {
  id?: string;
  name?: string | null;
  code?: string | null;
  active?: number;
  type?: string | null;
}

export class MobileDataInfoModel {
  id?: string;
  name?: string | null;
  code?: string | null;
  status?: string | null;
  type?: string | null;
  price?: string;
  handSet?: string | null;
  transferredAccountDataInterchangeGroup?: string | null;
  codeMobileDevice?: string | null;
}

export class CountryDetailResponseModel extends CountryListResponseModel {
  id?: string;
  code?: string;
  active?: number;
  capital?: string;
  cover?: string;
  createdAt?: string;
  ensign?: string;
  name?: string;
  order?: number;
  region?: string;
  updatedAt?: string;
  roamingPartner?: Array<RoamingPartnerModel> | [];
  mobileData?: Array<MobileDataInfoModel> | [];
}
