import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Tooltip } from "antd";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import {
  RoamingDetailPackage,
  RoamingDetailResponseModel,
} from "api/repositories/packagesManagement/roamingManagement/model/detail/RoamingDetailResponseModel";
import { RoamingManagementRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementRequestModel";
import { RoamingManagementResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";
import { defaultRoamingManagementRepository } from "api/repositories/packagesManagement/roamingManagement/RoamingManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import roamingManagementConstants from "../constants/RoamingManagementConstants";
const RoamingManagementViewModel = () => {
  const [list, setList] = useState<RoamingManagementResponseModel[]>([]);
  const [page, setPage] = useState<number>(0);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<RoamingDetailResponseModel>({});
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [paramsExport, setParamsExport] =
    useState<RoamingManagementRequestModel>({
      page: 0,
      limit: 10,
    });
  const { localStrings } = AuthenticationContext();
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();
  const { tableColumns } = roamingManagementConstants(localStrings);
  const fetchRoamingList = async (params: RoamingManagementRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultRoamingManagementRepository?.getList(params);
      if (res) {
        setList(res?.data);
        setTotal(res?.paging?.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: typeof tableColumns = [
    ...tableColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "pathActions",
      align: "center",
      render: (record: RoamingDetailPackage) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              type="primary"
              className="flex justify-center items-center"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={async () => {
                await fetchDetail(record?.code);
                setDetailModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title={localStrings.GlobalLabels.Deleted}>
            <Button
              type="primary"
              danger
              className="flex justify-center items-center"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={async () => {
                return Modal.confirm({
                  content: localStrings.GlobalMessage.DeleteConfirmation,
                  okText: localStrings.GlobalLabels.Confirmed,
                  okType: "danger",
                  cancelText: localStrings.GlobalLabels.Cancel,
                  async onOk() {
                    try {
                      setLoading(true);
                      const res =
                        await defaultRoamingManagementRepository?.delete({
                          data: [{ code: record?.code }],
                        });
                      if (res?.passedDelete?.length !== 0) {
                        getMessage(
                          localStrings.GlobalMessage.DeleteSuccessfully,
                          5,
                          "success"
                        );
                        await resBehavior();
                      } else {
                        getMessage(
                          `${localStrings.GlobalMessage.DeleteFailed}: ${res?.message}`,
                          5,
                          "error"
                        );
                      }
                    } catch (error) {
                      console.log(error);
                      getMessage(
                        localStrings.GlobalMessage.DeleteFailed,
                        5,
                        "error"
                      );
                    } finally {
                      setLoading(false);
                    }
                  },
                });
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const resBehavior = async () => {
    await fetchRoamingList({ page: 0, limit: pageSize });
    setPage(0);
    actionForm.setFieldsValue(new RoamingManagementResponseModel());
    setDetailModal(false);
  };
  const handleTableChange = async (pagination?: DefaultPagingModel) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
    let params = {
      ...paramsExport,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    await fetchRoamingList(params);
  };
  const fetchDetail = async (id: string) => {
    try {
      const res = await defaultRoamingManagementRepository?.getDetail(id);
      if (res) {
        setDetailInfo(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActions = async (body: any, action: "update" | "create") => {
    let afterBody = {
      ...body,
      status: 0,
      simType: 1,
      type: 0,
    };
    switch (action) {
      case "update":
        try {
          setModalLoading(true);
          const res = await defaultRoamingManagementRepository?.update(
            afterBody
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              5,
              "success"
            );

            await resBehavior();
          } else {
            getMessage(
              `${localStrings.GlobalMessage.UpdateFailed} ${res?.message}`,
              5,
              "error"
            );
          }
        } catch (error) {
          console.log(error);
          getMessage(
            `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
            5,
            "error"
          );
        } finally {
          setModalLoading(false);
        }
        break;
      case "create":
        try {
          setModalLoading(true);
          const res = await defaultRoamingManagementRepository?.create(
            afterBody
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.CreateSuccessfully,
              5,
              "success"
            );
            await resBehavior();
          } else {
            getMessage(
              `${localStrings.GlobalMessage.CreateFailed} ${res?.message}`,
              5,
              "error"
            );
          }
        } catch (error) {
          console.log(error);
          getMessage(
            `${localStrings.GlobalMessage.CreateFailed} ${error?.error?.message}`,
            5,
            "error"
          );
        } finally {
          setModalLoading(false);
        }
        break;
    }
  };

  const handleSearch = async (value: RoamingManagementRequestModel) => {
    let params: RoamingManagementRequestModel = {
      code:
        value?.code === "" || value?.code === undefined
          ? undefined
          : value?.code,
      category:
        value?.category === localStrings.GlobalLabels.All
          ? undefined
          : value?.category,
      country:
        value?.country === localStrings.GlobalLabels.All
          ? undefined
          : value?.country,
      region:
        value?.region === localStrings.GlobalLabels.All
          ? undefined
          : value?.region,
      page: 0,
      limit: pageSize,
    };
    setParamsExport(params);
    await fetchRoamingList(params);
  };

  useEffect(() => {
    fetchRoamingList({ page: 0, limit: 10 });
  }, []);
  return {
    list,
    total,
    detailModal,
    detailInfo,
    actionForm,
    filterForm,
    page,
    pageSize,
    loading,
    modalLoading,
    columns,
    setPage,
    setParamsExport,
    setDetailModal,
    setDetailInfo,
    fetchDetail,
    fetchRoamingList,
    handleActions,
    handleSearch,
    handleTableChange,
  };
};

export default RoamingManagementViewModel;
