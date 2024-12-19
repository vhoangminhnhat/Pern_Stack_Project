import { FormInstance } from "antd";
import { PathConfigCreateRequestModel } from "api/repositories/pathConfig/model/createAction/PathConfigCreateRequestModel";
import { PathConfigDetailResponseModel } from "api/repositories/pathConfig/model/detail/PathConfigDetailResponseModel";
import { PathConfigUpdateRequestModel } from "api/repositories/pathConfig/model/updateAction/PathConfigUpdateRequestModel";
import { Dispatch, SetStateAction } from "react";

export type PathConfigActionsType = {
  data: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    detail: PathConfigDetailResponseModel;
    setDetail: Dispatch<SetStateAction<PathConfigDetailResponseModel>>;
    actionForm: FormInstance<any>;
    handleActions: (
      body: PathConfigUpdateRequestModel | PathConfigCreateRequestModel,
      id: string,
      action: string
    ) => Promise<void>;
    loading: boolean;
  };
};
