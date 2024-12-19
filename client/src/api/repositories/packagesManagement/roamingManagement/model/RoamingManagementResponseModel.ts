export class RoamingPackagesMore {
  name?: string;
  items?:
    | string[]
    | Array<{
        country: string;
        items: Array<{partner: string; handSet: string}>;
      }>;
}

export class RoamingPackagesCountryInfo {
  id?: string;
  name?: string;
  code?: string;
  capital?: string;
  region?: string;
  cover?: string;
  ensign?: string;
  order?: string | number;
  active?: string;
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

export class RoamingCategoryInfo {
  id?: string;
  name?: string;
  code?: string;
  durationDay?: string | null;
  status?: string | null;
}

export class RoamingManagementResponseModel {
  countries?: Array<RoamingPackagesCountryInfo> | [];
  categories?: Array<RoamingCategoryInfo> | [];
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  code?: string;
  cover?: string;
  description?: string;
  discountRate?: number;
  durationDay?: string | number;
  price?: string;
  more?: Array<RoamingPackagesMore>;
  shortDescription?: string | null | string[];
  storage?: number;
  type?: number;
  order?: number | null;
  status?: number;
  simType?: number;
  internalCallTotalHour?: number;
  externalCallTotalHour?: number;
}
export class DeleteResponseModel {
  passedDelete: PassedDelete[];
  failedDelete: FailedDelete[];
  message: string;
}
export interface FailedDelete {
  code:             string;
  descriptionError: string;
}

export interface PassedDelete {
  code:               string;
  descriptionSuccess: string;
}
export class PartnerRoamingModel{
createdAt?: Date;
updatedAt?: Date;
id?:        string;
name?:      string;
code?:      string;
capital?:   string;
region?:    string;
cover?:     null;
ensign?:    string;
order?:     number;
active?:    number;
}