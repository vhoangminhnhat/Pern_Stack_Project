import { FormInstance } from "antd";
import { TopupCreateRequestModel } from "api/repositories/packagesManagement/topupManagement/model/create/TopupCreateRequestModel";
import { TopupDetailResponseModel } from "api/repositories/packagesManagement/topupManagement/model/detail/TopupDetailReponseModel";
import { TopupRequestModel } from "api/repositories/packagesManagement/topupManagement/model/TopupRequestModel";
import { TopupUpdateRequestModel } from "api/repositories/packagesManagement/topupManagement/model/update/TopupUpdateRequestModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { Dispatch, SetStateAction } from "react";

export interface ITopUpAction {
  data: {
    detailModal: boolean;
    detailInfo: TopupDetailResponseModel;
    setDetailInfo: Dispatch<SetStateAction<TopupDetailResponseModel>>;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    actionForm: FormInstance<any>;
    modalLoading: boolean;
    handleActions: (
      body: TopupUpdateRequestModel | TopupCreateRequestModel,
      action: "update" | "create"
    ) => Promise<void>;
    capacityUnit: string;
    setCapacityUnit: Dispatch<SetStateAction<string>>;
    durationUnit: SelectOps;
    setDurationUnit: Dispatch<SetStateAction<SelectOps>>;
    orderSorted: string | boolean;
    setOrderSorted: Dispatch<SetStateAction<string | boolean>>;
  };
}

export interface IB2BDataModal {
  data: {
    visible: boolean;
    onCancel: () => void;
    getListData: (params: TopupRequestModel) => Promise<void>;
  };
}
