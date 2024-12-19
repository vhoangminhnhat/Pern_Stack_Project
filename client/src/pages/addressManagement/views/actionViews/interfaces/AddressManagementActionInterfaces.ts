import { FormInstance } from "antd";
import { AdministrativeRegionsResponseModel } from "api/repositories/address/administrativeRegions/AdministrativeRegionsResponseModel";
import { AdministrativeUnitResponseModel } from "api/repositories/address/administrativeUnit/AdministrativeUnitResponseModel";
import { DistrictCreateRequestModel } from "api/repositories/address/district/model/actions/create/DistrictCreateRequestModel";
import { DistrictUpdateRequestModel } from "api/repositories/address/district/model/actions/update/DistrictUpdateRequestModel";
import { DistrictDetailResponseModel } from "api/repositories/address/district/model/detail/DistrictDetailResponseModel";
import { DistrictListRequestModel } from "api/repositories/address/district/model/DistrictListRequestModel";
import { DistrictListResponseModel } from "api/repositories/address/district/model/DistrictListResponseModel";
import { ProvinceCreateRequestModel } from "api/repositories/address/province/model/actions/create/ProvinceCreateRequestModel";
import { ProvinceUpdateRequestModel } from "api/repositories/address/province/model/actions/update/ProvinceUpdateRequestModel";
import { ProvinceDetailResponseModel } from "api/repositories/address/province/model/detail/ProvinceDetailResponseModel";
import { ProvinceListResponseModel } from "api/repositories/address/province/model/ProvinceListResponseModel";
import { WardCreateRequestModel } from "api/repositories/address/ward/model/actions/create/WardCreateRequestModel";
import { WardUpdateResponseModel } from "api/repositories/address/ward/model/actions/update/WardUpdateRequestModel";
import { WardDetailResponseModel } from "api/repositories/address/ward/model/detail/WardDetailResponseModel";
import { Dispatch, SetStateAction } from "react";

export type MixinProvince = ProvinceCreateRequestModel &
  ProvinceUpdateRequestModel;
export type MixinDistrict = DistrictCreateRequestModel &
  DistrictUpdateRequestModel;
export type MixinWards = WardCreateRequestModel & WardUpdateResponseModel;

export interface IAddressManagementActions {
  data: {
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    detailInfo: any;
    setDetailInfo: Dispatch<
      SetStateAction<
        | ProvinceDetailResponseModel
        | DistrictDetailResponseModel
        | WardDetailResponseModel
      >
    >;
    handleActions?: (
      body: MixinProvince | MixinDistrict | MixinWards,
      action: string,
      dataType: string
    ) => Promise<void>;
    dataType: string;
    actionForm: FormInstance<any>;
    modalLoading: boolean;
    regions: AdministrativeRegionsResponseModel[];
    units: AdministrativeUnitResponseModel[];
    province: ProvinceListResponseModel[];
    district: DistrictListResponseModel[];
    fetchList: (
      params: DistrictListRequestModel,
      dataType: "province" | "district" | "ward",
      action: string
    ) => Promise<void>;
  };
}
