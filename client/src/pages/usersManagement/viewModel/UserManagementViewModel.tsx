import { FileSearchOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { PartnersResponse } from "api/repositories/partners/model/PartnersResponse";
import { defaultPartnersRepository } from "api/repositories/partners/PartnersRepository";
import { RolesListResponse } from "api/repositories/rolesList/model/RolesListResponse";
import { defaultRolesListRepository } from "api/repositories/rolesList/RolesListRepository";
import { UserManagementCreateRequest } from "api/repositories/userManagement/model/createAction/UserManagementCreateRequest";
import { ResetPasswordRequest } from "api/repositories/userManagement/model/resetPassword/ResetPasswordRequest";
import { UserManagementUpdateRequest } from "api/repositories/userManagement/model/updateAction/UserManagementUpdateRequest";
import { UserManagementRequestModel } from "api/repositories/userManagement/model/UserManagementRequest";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { defaultUserManagementRepository } from "api/repositories/userManagement/UserManagementRepository";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { userManagementFiltersAttributes } from "./filters/UserManagementFilters";
import { userManagementColumns } from "./tableColumns/UserManagementColumns";

const UserManagementViewModel = () => {
  const [form] = Form.useForm();
  const [formDetail] = Form.useForm();
  const [list, setList] = useState<UserManagementResponseModel[]>([]);
  const [roleList, setRoleList] = useState<RolesListResponse[]>([]);
  const [partnerList, setPartnerList] = useState<PartnersResponse[]>([]);
  const [detailInfo, setDetailInfo] = useState<
    UserManagementResponseModel | {}
  >({});
  const [page, setPage] = useState<DefaultPagingModel["current"]>(0);
  const [pageSize, setPageSize] = useState<DefaultPagingModel["pageSize"]>(10);
  const [total, setTotal] = useState<number>(0);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [resetModal, setResetModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<typeof loading>(false);
  const [paramsExport, setParamsExport] = useState<UserManagementRequestModel>({
    page: 0,
    limit: 10,
  });
  const { localStrings } = AuthenticationContext();

  const userManagementFilters: FilterAttributes[] =
    userManagementFiltersAttributes(partnerList, roleList, localStrings);

  const columns: ColumnsType<UserManagementResponseModel> = [
    ...userManagementColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "userManagementActions",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              type="primary"
              className="flex justify-center items-center"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={() => {
                setDetailModal(true);
                setDetailInfo(record);
              }}
            />
          </Tooltip>
          <Tooltip title={localStrings.UserManagement.Columns.ResetPass}>
            <Button
              type="default"
              className="flex justify-center items-center"
              shape="circle"
              icon={<LockOutlined />}
              onClick={() => {
                setResetModal(true);
                setDetailInfo(record);
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchUserList = async (params: UserManagementRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultUserManagementRepository?.getUserList(params);
      if (res) {
        setList(res?.data);
        setTotal(res?.pagination?.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerList = async () => {
    try {
      const res = await defaultPartnersRepository.getPartnerList();
      if (res) {
        let data = [
          {
            id: localStrings.GlobalLabels.All,
            name: localStrings.GlobalLabels.All,
            code: localStrings.GlobalLabels.All,
          },
          {
            id: "null",
            name: localStrings.GlobalLabels.NoPartner,
            code: null,
          },
          ...res?.data,
        ];
        setPartnerList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleList = async () => {
    try {
      const res = await defaultRolesListRepository.getRolesList({
        limit: 1000,
      });
      if (res) {
        let data = [
          {
            id: localStrings.GlobalLabels.All,
            name: localStrings.GlobalLabels.All,
            code: localStrings.GlobalLabels.All,
          },
          ...res?.data,
        ];
        setRoleList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (values: typeof paramsExport) => {
    let params = {
      userName: values?.userName === "" ? undefined : values?.userName,
      phone: values?.phone === "" ? undefined : values?.phone,
      email: values?.email === "" ? undefined : values?.email,
      partner:
        values?.partner === localStrings.GlobalLabels.All
          ? undefined
          : values?.partner,
      roles:
        values?.roles === localStrings.GlobalLabels.All
          ? undefined
          : values?.roles,
      status: values?.status === -1 ? undefined : values?.status,
      page: 0,
      limit: pageSize,
    };
    setParamsExport(params);
    setPage(0);
    await fetchUserList(params);
  };

  const handleTableChange = async (paginations?: DefaultPagingModel) => {
    setPage(paginations?.current! - 1);
    setPageSize(paginations?.pageSize!);
    let params = {
      ...paramsExport,
      page: paginations?.current! - 1,
      limit: paginations?.pageSize!,
    };
    await fetchUserList(params);
  };

  const actionResBehavior = async () => {
    setDetailModal(false);
    setDetailInfo({});
    formDetail.setFieldsValue(new UserManagementResponseModel());
    setParamsExport({ page: 0, limit: 10 });
    setPage(0);
    await fetchUserList({ page: 0, limit: 10 });
  };

  const handleDetailAction = async (
    info:
      | UserManagementUpdateRequest
      | UserManagementCreateRequest
      | ResetPasswordRequest,
    action: string
  ) => {
    switch (action) {
      case "update":
        try {
          setModalLoading(true);
          const res = await defaultUserManagementRepository?.updateUser(
            info as UserManagementUpdateRequest
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              4,
              "success"
            );
            await actionResBehavior();
          }
        } catch (error) {
          console.log(error);
          getMessage(
            `${localStrings.GlobalMessage.UpdateFailed} ${
              error?.error?.message || localStrings.GlobalMessage.Error
            }`,
            4,
            "error"
          );
        } finally {
          setModalLoading(false);
        }
        break;
      case "create":
        try {
          setModalLoading(true);
          const res = await defaultUserManagementRepository?.createUser(
            info as UserManagementCreateRequest
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.CreateSuccessfully,
              4,
              "success"
            );
            await actionResBehavior();
          }
        } catch (error) {
          console.error(error);
          getMessage(
            `${localStrings.GlobalMessage.CreateFailed} ${
              error?.error?.message || localStrings.GlobalMessage.Error
            }`,
            4,
            "error"
          );
        } finally {
          setModalLoading(false);
        }
        break;
      case "reset-pass":
        try {
          setModalLoading(true);
          const res = await defaultUserManagementRepository?.resetPassword(
            info as ResetPasswordRequest
          );
          if (res?.code === 0) {
            getMessage(
              localStrings.GlobalMessage.ResetPassSuccessfully,
              4,
              "success"
            );
            setResetModal(false);
            setDetailInfo({});
            formDetail.setFieldsValue(new UserManagementResponseModel());
            setParamsExport({ page: 0, limit: 10 });
            setPage(0);
            await fetchUserList({ page: 0, limit: 10 });
          }
        } catch (error) {
          console.log(error);
          getMessage(
            `${localStrings.GlobalMessage.ResetPassFailed} ${
              error?.error?.message || localStrings.GlobalMessage.Error
            }`,
            4,
            "error"
          );
        } finally {
          setModalLoading(false);
        }
    }
  };

  useEffect(() => {
    fetchPartnerList();
    fetchUserList(paramsExport);
    fetchRoleList();
  }, []);

  return {
    form,
    formDetail,
    list,
    roleList,
    partnerList,
    detailInfo,
    page,
    pageSize,
    total,
    detailModal,
    resetModal,
    loading,
    columns,
    modalLoading,
    userManagementFilters,
    setPage,
    setDetailModal,
    setDetailInfo,
    setParamsExport,
    setResetModal,
    setModalLoading,
    handleSearch,
    handleTableChange,
    handleDetailAction,
    fetchUserList,
  };
};

export default UserManagementViewModel;
