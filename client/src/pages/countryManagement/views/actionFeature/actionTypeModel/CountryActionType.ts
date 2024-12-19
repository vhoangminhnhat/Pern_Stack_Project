import { FormInstance } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { CreateCountryRequestModel } from "api/repositories/countryManagement/model/createActions/CreateCountryRequestModel";
import { CountryDetailResponseModel } from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import { UpdateCountryRequestModel } from "api/repositories/countryManagement/model/updateActions/UpdateCountryRequestModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { Dispatch, SetStateAction } from "react";

export interface ICountryActionType {
  data: {
    modalLoading: boolean;
    detailInfo: CountryDetailResponseModel;
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    setDetailInfo: Dispatch<SetStateAction<CountryDetailResponseModel>>;
    actionForm: FormInstance<any>;
    importFile: IImportFiles;
    regionList: SelectOps[];
    setImportFile: Dispatch<SetStateAction<IImportFiles>>;
    handleActions: (
      body: CreateCountryRequestModel | UpdateCountryRequestModel,
      code: string,
      action: "update" | "create"
    ) => Promise<void>;
  };
}

export interface IUpdateCreate extends ICountryActionType {
  data: {
    modalLoading: boolean;
    detailInfo: CountryDetailResponseModel;
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    setDetailInfo: Dispatch<SetStateAction<CountryDetailResponseModel>>;
    actionForm: FormInstance<any>;
    importFile: IImportFiles;
    setImportFile: Dispatch<SetStateAction<IImportFiles>>;
    handleActions: (
      body: CreateCountryRequestModel | UpdateCountryRequestModel,
      code: string,
      action: "update" | "create"
    ) => Promise<void>;
    regionList: SelectOps[];
    handleUploadChange: (
      type: "coverFiles" | "ensignFiles"
    ) => (info: UploadChangeParam) => void;
  };
}

export interface IImportFiles {
  coverFiles: UploadFile[];
  ensignFiles: UploadFile[];
}
