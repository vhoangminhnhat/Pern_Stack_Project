import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { PathConfigCreateRequestModel } from "api/repositories/pathConfig/model/createAction/PathConfigCreateRequestModel";
import { PathConfigDetailResponseModel } from "api/repositories/pathConfig/model/detail/PathConfigDetailResponseModel";
import { PathConfigRequestModel } from "api/repositories/pathConfig/model/PathConfigRequestModel";
import { PathConfigResponseModel } from "api/repositories/pathConfig/model/PathConfigResponseModel";
import { PathConfigUpdateRequestModel } from "api/repositories/pathConfig/model/updateAction/PathConfigUpdateRequestModel";
import { defaultPathConfigRepository } from "api/repositories/pathConfig/PathConfigRepository";
import ModalConfirmationComponent from "components/generalComponents/modalConfirmation/ModalConfirmationComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { PathConfigColumns } from "./tableColumns/TableColumns";

const PathConfigMangementViewModel = () => {
  const { localStrings } = AuthenticationContext();
  const [list, setList] = useState<PathConfigResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<PathConfigDetailResponseModel>({});
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();

  const fetchConfigList = async (params: PathConfigRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultPathConfigRepository?.getList(params);
      if (res) {
        setList(res?.data);
        setTotal(res?.paging?.total);
      }
    } catch (error) {
      console.log(error);
      getMessage(localStrings.GlobalMessage.Error, 5, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (id: string) => {
    try {
      const res = await defaultPathConfigRepository?.configDetail(id);
      if (res) {
        setDetail(res?.data);
        actionForm?.setFieldValue(
          "config",
          JSON.parse(res?.data?.config as string)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resBehavior = async () => {
    await fetchConfigList({ page: 0, limit: pageSize });
    setPage(0);
    actionForm.setFieldsValue(new PathConfigDetailResponseModel());
    setDetailModal(false);
  };

  const handleActions = async (
    body: PathConfigCreateRequestModel | PathConfigUpdateRequestModel,
    code: string,
    action: "update" | "create"
  ) => {
    if (isEmpty(body?.config)) {
      getMessage(
        localStrings.PathConfigManagement.Message.AddConfig,
        5,
        "warning"
      );
    } else {
      let afterBody = {
        title: body?.title,
        code: body?.code,
        description:
          body?.description === "" || body?.description === undefined
            ? undefined
            : body?.description,
        config: JSON.parse(body?.config as string),
      };
      switch (action) {
        case "update":
          try {
            setLoading(true);
            const res = await defaultPathConfigRepository?.updateConfig(
              afterBody as PathConfigUpdateRequestModel,
              code
            );
            if (res?.code === 0) {
              getMessage(
                localStrings.GlobalMessage.UpdateSuccessfully,
                5,
                "success"
              );
              await resBehavior();
            } else {
              getMessage(localStrings.GlobalMessage.UpdateFailed, 5, "error");
            }
          } catch (error) {
            console.log(error);
            getMessage(localStrings.GlobalMessage.UpdateFailed, 5, "error");
          } finally {
            setLoading(false);
          }
          break;
        case "create":
          try {
            setLoading(true);
            const res = await defaultPathConfigRepository?.createConfig(
              afterBody as PathConfigCreateRequestModel
            );
            if (res?.code === 0) {
              getMessage(
                localStrings.GlobalMessage.CreateSuccessfully,
                5,
                "success"
              );
              await resBehavior();
            } else {
              getMessage(localStrings.GlobalMessage.CreateFailed, 5, "error");
            }
          } catch (error) {
            console.log(error);
            getMessage(localStrings.GlobalMessage.CreateFailed, 5, "error");
          } finally {
            setLoading(false);
          }
          break;
      }
    }
  };

  const handleTableChange = async (pagination?: DefaultPagingModel) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
    let params = {
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    await fetchConfigList(params);
  };

  const columns: ColumnsType<PathConfigResponseModel> = [
    ...PathConfigColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "pathActions",
      align: "center",
      render: (record: PathConfigResponseModel) => (
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
                ModalConfirmationComponent({
                  data: {
                    async onOk() {
                      try {
                        setLoading(true);
                        const res =
                          await defaultPathConfigRepository?.deleteConfig(
                            record?.code
                          );
                        if (res?.code === 0) {
                          getMessage(
                            localStrings.GlobalMessage.DeleteSuccessfully,
                            5,
                            "success"
                          );
                          await resBehavior();
                        } else {
                          getMessage(
                            localStrings.GlobalMessage.DeleteFailed,
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
                  },
                });
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchConfigList({ page: 0, limit: 10 });
  }, []);

  return {
    list,
    loading,
    detail,
    detailModal,
    page,
    pageSize,
    total,
    filterForm,
    actionForm,
    columns,
    setPage,
    setPageSize,
    fetchConfigList,
    setDetail,
    setDetailModal,
    handleActions,
    handleTableChange,
  };
};

export default PathConfigMangementViewModel;
