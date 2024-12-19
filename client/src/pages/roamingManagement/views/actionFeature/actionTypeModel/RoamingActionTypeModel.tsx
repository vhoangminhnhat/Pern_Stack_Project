import { FormInstance } from "antd";
import { CreateRoamingRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/createActions/CreateRoamingRequestModel";
import { RoamingDetailResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/detail/RoamingDetailResponseModel";
import { UpdateRoamingRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/updateActions/UpdateRoamingRequestModel";
import { Dispatch, SetStateAction } from "react";

export interface IRoamingActionType {
  data: {
    modalLoading: boolean;
    detailInfo: RoamingDetailResponseModel;
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    setDetailInfo: Dispatch<SetStateAction<CreateRoamingRequestModel>>;
    actionForm: FormInstance<any>;
    handleActions: (
      body: CreateRoamingRequestModel | UpdateRoamingRequestModel,
      action: "update" | "create"
    ) => Promise<void>;
    onDataChange?: (data: CreateRoamingRequestModel[]) => void;
  };
}

export interface IUpdateCreate extends IRoamingActionType {
  data: {
    modalLoading: boolean;
    detailInfo: RoamingDetailResponseModel;
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    setDetailInfo: Dispatch<SetStateAction<CreateRoamingRequestModel>>;
    actionForm: FormInstance<any>;
    handleActions: (
      body: CreateRoamingRequestModel | UpdateRoamingRequestModel,
      action: "update" | "create"
    ) => Promise<void>;
  };
}
