import { FormInstance } from "antd";
import { ResetPasswordRequest } from "api/repositories/userManagement/model/resetPassword/ResetPasswordRequest";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { Dispatch, SetStateAction } from "react";

export interface IUserManagementResetPass {
  data: {
    detailInfo: UserManagementResponseModel;
    setDetailInfo: Dispatch<
      SetStateAction<IUserManagementResetPass["data"]["detailInfo"]>
    >;
    modalLoading: boolean;
    setModalLoading: Dispatch<SetStateAction<boolean>>;
    formDetail: FormInstance<any>;
    resetModal: boolean;
    setResetModal: Dispatch<SetStateAction<boolean>>;
    handleDetailAction: (
      info: ResetPasswordRequest,
      action: "reset-pass"
    ) => Promise<void>;
  };
}
