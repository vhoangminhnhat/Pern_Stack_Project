import { FormInstance } from "antd";
import { PartnersResponse } from "api/repositories/partners/model/PartnersResponse";
import { RolesListResponse } from "api/repositories/rolesList/model/RolesListResponse";
import { UserManagementCreateRequest } from "api/repositories/userManagement/model/createAction/UserManagementCreateRequest";
import { UserManagementUpdateRequest } from "api/repositories/userManagement/model/updateAction/UserManagementUpdateRequest";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { Dispatch, SetStateAction } from "react";

export interface IUserManagementDetail {
  data: {
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    detailInfo: UserManagementResponseModel | any;
    setDetailInfo: Dispatch<SetStateAction<UserManagementResponseModel | {}>>;
    modalLoading: boolean;
    formDetail: FormInstance<any>;
    handleDetailAction: (
      info: UserManagementUpdateRequest | UserManagementCreateRequest,
      action: string
    ) => Promise<void>;
    partnerList: PartnersResponse[];
    roleList: RolesListResponse[];
  };
}
