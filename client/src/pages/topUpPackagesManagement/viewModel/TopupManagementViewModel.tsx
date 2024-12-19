import { FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { TopupCreateRequestModel } from "api/repositories/packagesManagement/topupManagement/model/create/TopupCreateRequestModel";
import { TopupDetailResponseModel } from "api/repositories/packagesManagement/topupManagement/model/detail/TopupDetailReponseModel";
import { TopupRequestModel } from "api/repositories/packagesManagement/topupManagement/model/TopupRequestModel";
import {
  TopupCategoryResponseModel,
  TopupResponseModel,
} from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { TopupUpdateRequestModel } from "api/repositories/packagesManagement/topupManagement/model/update/TopupUpdateRequestModel";
import { defaultTopupManagementRepository } from "api/repositories/packagesManagement/topupManagement/TopupManagementRepository";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { topupManagementConstants } from "../constants/TopupManagementConstants";

const TopupManagementViewModel = () => {
  const { localStrings, language } = AuthenticationContext();
  const [list, setList] = useState<TopupResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [detailInfo, setDetailInfo] = useState<TopupDetailResponseModel>({});
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();
  const [b2bImportModal, setB2bImportModal] = useState<boolean>(false);
  const [orderSorted, setOrderSorted] = useState<string | boolean>(true);
  const [paramExport, setParamExport] = useState<TopupRequestModel>({
    page: 0,
    limit: 10,
    pagination: 1,
  });
  const [capacityUnit, setCapacityUnit] = useState<string>("gb");
  const [durationUnit, setDurationUnit] = useState<SelectOps>({
    label: localStrings.GlobalLabels.Date,
    value: "day",
  });

  const fetchList = async (params: TopupRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultTopupManagementRepository?.getList(params);
      if (res) {
        let data: typeof list = res?.data?.filter((item) =>
          isEmpty(
            item?.categories?.filter(
              (item) => item["code"] === "MD_roaming"
            ) as TopupCategoryResponseModel[]
          )
        );
        setList(data);
        setTotal(data?.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (code: string) => {
    try {
      const res = await defaultTopupManagementRepository?.detailTopup(code);
      if (res) {
        setDetailInfo(res?.data);
        setDetailModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value: any) => {
    let params: TopupRequestModel = {
      name:
        value?.name === "" || value?.name === undefined
          ? undefined
          : value?.name,
      category:
        value?.category === localStrings.GlobalLabels.All
          ? undefined
          : value?.category,
      pagination: 1,
      status: value?.status === -1 ? undefined : value?.status,
      page: 0,
      order:
        value?.order === localStrings.GlobalLabels.NoSort
          ? undefined
          : value?.order,
      limit: pageSize,
    };
    setPage(0);
    setParamExport(params);
    await fetchList(params);
  };

  const resBehavior = async () => {
    await fetchList({ page: 0, limit: pageSize, pagination: 1 });
    setPage(0);
    actionForm.setFieldsValue(new TopupDetailResponseModel());
    setDetailModal(false);
  };

  const handleTableChange = async (paginations?: DefaultPagingModel) => {
    setPage(paginations?.current! - 1);
    setPageSize(paginations?.pageSize!);
  };

  const columns: ColumnsType<TopupResponseModel> = [
    ...topupManagementConstants(
      setOrderSorted,
      orderSorted,
      localStrings,
      language
    ).mainColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "topupActions",
      align: "center",
      render: (record: TopupResponseModel) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              type="primary"
              className="flex justify-center items-center"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={async () => await fetchDetail(record?.code)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleActions = async (
    body: TopupUpdateRequestModel | TopupCreateRequestModel,
    action: "update" | "create"
  ) => {
    let afterBody = {
      ...body,
      storage:
        body?.capacityUnit === "mb"
          ? Math.round((body?.storage / 1024) * 200) / 200
          : body?.storage,
      durationDay:
        body?.durationUnit === "hour" && body?.durationDay >= 1
          ? Math.round((body?.durationDay / 24) * 100) / 100
          : body?.durationDay < 1 && body?.durationUnit === "hour"
          ? body?.durationDay
          : body?.durationDay < 1 && body?.durationUnit === "day"
          ? Math.round(body?.durationDay * 24)
          : body?.durationDay,
      categories: body?.categories,
      status: 0,
      simType: 1,
      type: 0,
      internalCallTotalHour: 0,
      externalCallTotalHour: 0,
    };
    switch (action) {
      case "update":
        try {
          setModalLoading(true);
          delete afterBody["capacityUnit"];
          delete afterBody["durationUnit"];
          const res = await defaultTopupManagementRepository?.updateTopup(
            afterBody as TopupUpdateRequestModel
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
        } catch (error: any) {
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
          delete afterBody["capacityUnit"];
          delete afterBody["durationUnit"];
          const res = await defaultTopupManagementRepository?.createTopup(
            afterBody as TopupCreateRequestModel
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
        } catch (error: any) {
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

  useEffect(() => {
    fetchList(paramExport);
  }, []);

  return {
    list,
    loading,
    detailInfo,
    detailModal,
    actionForm,
    filterForm,
    total,
    page,
    pageSize,
    columns,
    modalLoading,
    b2bImportModal,
    capacityUnit,
    durationUnit,
    orderSorted,
    setOrderSorted,
    setB2bImportModal,
    setModalLoading,
    setCapacityUnit,
    setDurationUnit,
    setPage,
    setParamExport,
    fetchList,
    setDetailInfo,
    setDetailModal,
    handleSearch,
    handleTableChange,
    handleActions,
  };
};

export default TopupManagementViewModel;
