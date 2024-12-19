import {AdministrativeRegionsResponseModel} from 'api/repositories/address/administrativeRegions/AdministrativeRegionsResponseModel';
import {AdministrativeUnitResponseModel} from 'api/repositories/address/administrativeUnit/AdministrativeUnitResponseModel';

export class ProvinceDetailResponseModel {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  code?: string;
  name?: string;
  nameEn?: string;
  fullName?: string;
  fullNameEn?: string;
  codeName?: string;
  order?: number;
  administrativeUnitId?: AdministrativeUnitResponseModel;
  administrativeRegionId?: AdministrativeRegionsResponseModel;
}
