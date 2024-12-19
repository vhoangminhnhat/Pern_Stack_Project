import { FormInstance } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { GetPackagesByPhoneRequestModel } from "api/repositories/packagesRegistration/model/getPackagesByPhone/GetPackagesByPhoneRequestModel";
import { GetPackagesByPhoneResponseModel } from "api/repositories/packagesRegistration/model/getPackagesByPhone/GetPackagesByPhoneResponseModel";
import { Dispatch, SetStateAction } from "react";

export interface IPackgesAvailableList {
  data: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    featureLoading: boolean;
    defaultPackageList: TopupResponseModel[];
    fetchPackagesList: (
      phone: string,
      params: GetPackagesByPhoneRequestModel,
      type: "paging" | "noPaging"
    ) => Promise<void>;
    filterForm: FormInstance<any>;
    handleSearch: (value: GetPackagesByPhoneRequestModel) => Promise<void>;
    handleTableChange: (pagination?: DefaultPagingModel | any) => Promise<void>;
    page: number;
    pageSize: number;
    packageList: GetPackagesByPhoneResponseModel;
    setPackageList: Dispatch<SetStateAction<GetPackagesByPhoneResponseModel>>;
    selectedRowDatas: Array<TopupResponseModel>;
    setSelectedRowDatas: Dispatch<
      SetStateAction<IPackgesAvailableList["data"]["selectedRowDatas"]>
    >;
    totalPackage: number;
    setPage: Dispatch<SetStateAction<number>>;
    setParamsExport: Dispatch<SetStateAction<GetPackagesByPhoneRequestModel>>;
    columns: ColumnsType<TopupResponseModel>;
    onCheckRecord: (e: any, record: any) => void;
    onRoamingRegistration: (value: any) => Promise<void>;
  };
}

export interface IRoamingRegistrationList {
  data: {};
}
