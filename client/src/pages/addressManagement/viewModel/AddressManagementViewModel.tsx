import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import { defaultAdminRegions } from "api/repositories/address/administrativeRegions/AdministrativeRegionsRepository";
import { AdministrativeRegionsResponseModel } from "api/repositories/address/administrativeRegions/AdministrativeRegionsResponseModel";
import { defaultAdminUnits } from "api/repositories/address/administrativeUnit/AdministrativeUnitRepository";
import { AdministrativeUnitResponseModel } from "api/repositories/address/administrativeUnit/AdministrativeUnitResponseModel";
import { defaultDistrictListRepository } from "api/repositories/address/district/DistrictListRepository";
import { DistrictCreateRequestModel } from "api/repositories/address/district/model/actions/create/DistrictCreateRequestModel";
import { DistrictUpdateRequestModel } from "api/repositories/address/district/model/actions/update/DistrictUpdateRequestModel";
import { DistrictDetailResponseModel } from "api/repositories/address/district/model/detail/DistrictDetailResponseModel";
import { DistrictListRequestModel } from "api/repositories/address/district/model/DistrictListRequestModel";
import { DistrictListResponseModel } from "api/repositories/address/district/model/DistrictListResponseModel";
import { ProvinceCreateRequestModel } from "api/repositories/address/province/model/actions/create/ProvinceCreateRequestModel";
import { ProvinceUpdateRequestModel } from "api/repositories/address/province/model/actions/update/ProvinceUpdateRequestModel";
import { ProvinceDetailResponseModel } from "api/repositories/address/province/model/detail/ProvinceDetailResponseModel";
import { ProvinceListRequestModel } from "api/repositories/address/province/model/ProvinceListRequestModel";
import { ProvinceListResponseModel } from "api/repositories/address/province/model/ProvinceListResponseModel";
import { defaultProvinceListRepository } from "api/repositories/address/province/ProvinceRepository";
import { WardCreateRequestModel } from "api/repositories/address/ward/model/actions/create/WardCreateRequestModel";
import { WardUpdateResponseModel } from "api/repositories/address/ward/model/actions/update/WardUpdateRequestModel";
import { WardDetailResponseModel } from "api/repositories/address/ward/model/detail/WardDetailResponseModel";
import { WardListRequestModel } from "api/repositories/address/ward/model/WardListRequestModel";
import { WardListResponseModel } from "api/repositories/address/ward/model/WardListResponseModel";
import { defaultWardListRepository } from "api/repositories/address/ward/WardListRepository";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import ModalConfirmationComponent from "components/generalComponents/modalConfirmation/ModalConfirmationComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { addressManagementConstants } from "../constants/AddressManagementConstants";

const AddressManagementViewModel = () => {
  const { localStrings } = AuthenticationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [regions, setRegions] = useState<AdministrativeRegionsResponseModel[]>(
    []
  );
  const [units, setUnits] = useState<AdministrativeUnitResponseModel[]>([]);
  const [province, setProvince] = useState<ProvinceListResponseModel[]>([]);
  const [district, setDistrict] = useState<DistrictListResponseModel[]>([]);
  const [wards, setWards] = useState<WardListResponseModel[]>([]);
  const [list, setList] = useState<
    Array<
      | ProvinceListResponseModel
      | DistrictListResponseModel
      | WardListResponseModel
    >
  >([]);
  const [modal, setModal] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<any>({});
  const [total, setTotal] = useState<number>(0);
  const [dataType, setDataType] = useState<"province" | "district" | "ward">(
    "province"
  );
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();

  const createColumns = <
    T extends
      | ProvinceListRequestModel
      | DistrictListRequestModel
      | WardListRequestModel
  >(
    dataType: "province" | "district" | "ward"
  ) => {
    const columns = addressManagementConstants?.renderColumns(
      dataType,
      regions,
      units,
      localStrings
    );
    return [
      ...columns,
      {
        title: localStrings.GlobalLabels.Actions,
        key: "actions",
        align: "center",
        render: (record) => (
          <div className="flex justify-center items-center gap-x-3">
            <Tooltip title={localStrings.GlobalLabels.Detail}>
              <Button
                type="primary"
                className="flex justify-center items-center"
                shape="circle"
                icon={<FileSearchOutlined />}
                onClick={async () => await fetchDetail(record?.id, dataType)}
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
                          let res = undefined;
                          switch (dataType) {
                            case "province":
                              res =
                                await defaultProvinceListRepository?.deleteProvince(
                                  { id: record?.id }
                                );
                              break;
                            case "district":
                              res =
                                await defaultDistrictListRepository?.deleteDistrict(
                                  { id: record?.id }
                                );
                              break;
                            case "ward":
                              res = await defaultWardListRepository?.deleteWard(
                                { id: record?.id }
                              );
                              break;
                          }

                          if (res?.data) {
                            getMessage(
                              localStrings.GlobalMessage.DeleteSuccessfully,
                              5,
                              "success"
                            );
                            await resBehavior(dataType);
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
                    },
                  });
                }}
              ></Button>
            </Tooltip>
          </div>
        ),
      },
    ] as ColumnsType<T>;
  };

  const fetchList = async (
    params:
      | ProvinceListRequestModel
      | DistrictListRequestModel
      | WardListResponseModel,
    dataType: "province" | "district" | "ward",
    action: string
  ) => {
    try {
      setLoading(action === "filters" ? false : true);
      let res: BaseApiResponseModel<typeof list> = undefined;
      switch (dataType) {
        case "province":
          res = await defaultProvinceListRepository?.getList(
            params as ProvinceListRequestModel
          );
          setProvince(res?.data);
          break;
        case "district":
          res = await defaultDistrictListRepository?.getList(
            params as DistrictListRequestModel
          );
          setDistrict(res?.data);
          break;
        case "ward":
          res = await defaultWardListRepository?.getList(
            params as WardListRequestModel
          );
          setWards(res?.data);
          break;
      }
      if (action === "search") {
        if (res) {
          setList(res?.data);
          setTotal(res?.data?.length);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async (
    params: { page: number; pagination: number },
    type: "regions" | "units"
  ) => {
    switch (type) {
      case "regions":
        try {
          const res = await defaultAdminRegions?.getList(params);
          if (res) {
            setRegions(res?.data);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case "units":
        try {
          const res = await defaultAdminUnits?.getList(params);
          if (res) {
            setUnits(res?.data);
          }
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  const fetchDetail = async (
    id: string,
    dataType: "province" | "district" | "ward"
  ) => {
    try {
      let res: BaseApiResponseModel<ProvinceDetailResponseModel> = undefined;
      switch (dataType) {
        case "province":
          res = await defaultProvinceListRepository?.getDetail({ id: id });
          break;
        case "district":
          res = await defaultDistrictListRepository?.getDetail({ id: id });
          break;
        case "ward":
          res = await defaultWardListRepository?.getDetail({ id: id });
          break;
      }
      if (res) {
        setDetailInfo(res?.data);
        setModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value: any) => {
    switch (value?.filter) {
      case "province":
        try {
          let provinceParams = {
            administrativeRegionId:
              value?.administrativeRegionId === localStrings.GlobalLabels.All
                ? undefined
                : value?.administrativeRegionId,
            name: value?.name === "" ? undefined : value?.name,
            page: 0,
            pagination: 1,
            limit: pageSize,
            administrativeUnitId:
              value?.administrativeUnitId === localStrings.GlobalLabels.All
                ? undefined
                : value?.administrativeUnitId,
          };
          await fetchList(provinceParams, dataType, "search");
        } catch (error) {
          console.log(error);
        }
        break;
      case "district":
        try {
          let districtParams = {
            name: value?.name === "" ? undefined : value?.name,
            provinceCode:
              value?.provinceCode === localStrings.GlobalLabels.All
                ? undefined
                : value?.provinceCode,
            page: 0,
            pagination: 1,
            limit: pageSize,
            administrativeUnitId:
              value?.administrativeUnitId === localStrings.GlobalLabels.All
                ? undefined
                : value?.administrativeUnitId,
          };
          await fetchList(districtParams, dataType, "search");
        } catch (error) {
          console.log(error);
        }
        break;
      case "ward":
        try {
          let wardParams = {
            name: value?.name === "" ? undefined : value?.name,
            districtCode:
              value?.districtCode === localStrings.GlobalLabels.All
                ? undefined
                : value?.districtCode,
            page: 0,
            pagination: 1,
            limit: pageSize,
            administrativeUnitId:
              value?.administrativeUnitId === localStrings.GlobalLabels.All
                ? undefined
                : value?.administrativeUnitId,
          };
          await fetchList(wardParams, dataType, "search");
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  const handleTableChange = (paginations?: DefaultPagingModel) => {
    setPage(paginations?.current! - 1);
    setPageSize(paginations?.pageSize!);
  };

  const resBehavior = async (dataType: "province" | "district" | "ward") => {
    await fetchList({ pagination: 1 }, dataType, "search");
    setPage(0);
    actionForm.setFieldsValue(
      dataType === "province"
        ? new ProvinceDetailResponseModel()
        : dataType === "district"
        ? new DistrictDetailResponseModel()
        : new WardDetailResponseModel()
    );
    setModal(false);
  };

  const handleActions = async (
    body: ProvinceUpdateRequestModel,
    action: string,
    dataType: "province" | "district" | "ward"
  ) => {
    let res: BaseApiResponseModel<ProvinceListResponseModel> = undefined;
    let renderedBody = {
      ...body,
      code: detailInfo?.code === body?.code ? undefined : body?.code,
    };
    switch (action) {
      case "update":
        try {
          setModalLoading(true);
          switch (dataType) {
            case "province":
              res = await defaultProvinceListRepository?.updateProvince(
                renderedBody as unknown as ProvinceUpdateRequestModel
              );
              break;
            case "district":
              res = await defaultDistrictListRepository?.updateDistrict(
                renderedBody as unknown as DistrictUpdateRequestModel
              );
              break;
            case "ward":
              res = await defaultWardListRepository?.updateWard(
                renderedBody as unknown as WardUpdateResponseModel
              );
              break;
          }
          if (res) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              5,
              "success"
            );
            await resBehavior(dataType);
          } else {
            getMessage(
              `${localStrings.GlobalMessage.UpdateFailed} ${res?.message}`,
              5,
              "error"
            );
          }
        } catch (error: any) {
          getMessage(
            `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
            5,
            "error"
          );
          console.log(error);
        } finally {
          setModalLoading(false);
        }
        break;
      case "create":
        try {
          setModalLoading(true);
          switch (dataType) {
            case "province":
              res = await defaultProvinceListRepository?.createProvince(
                body as unknown as ProvinceCreateRequestModel
              );
              break;
            case "district":
              res = await defaultDistrictListRepository?.updateDistrict(
                body as unknown as DistrictCreateRequestModel
              );
              break;
            case "ward":
              res = await defaultWardListRepository?.updateWard(
                body as unknown as WardCreateRequestModel
              );
              break;
          }
          if (res) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              5,
              "success"
            );
            await resBehavior(dataType);
          } else {
            getMessage(
              `${localStrings.GlobalMessage.UpdateFailed} ${res?.message}`,
              5,
              "error"
            );
          }
        } catch (error: any) {
          getMessage(
            `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
            5,
            "error"
          );
          console.log(error);
        } finally {
          setModalLoading(false);
        }
        break;
    }
  };

  useEffect(() => {
    fetchList({ pagination: 1 }, "province", "search");
    fetchList(
      {
        pagination: 1,
      },
      "district",
      "filters"
    );
    fetchRegions({ page: 0, pagination: 1 }, "regions");
    fetchRegions({ page: 0, pagination: 1 }, "units");
  }, []);

  return {
    list,
    page,
    pageSize,
    loading,
    modal,
    detailInfo,
    total,
    dataType,
    filterForm,
    province,
    district,
    wards,
    units,
    regions,
    actionForm,
    modalLoading,
    handleActions,
    setModalLoading,
    fetchDetail,
    fetchList,
    setDetailInfo,
    setDataType,
    setModal,
    createColumns,
    handleSearch,
    handleTableChange,
    setPage,
  };
};

export default AddressManagementViewModel;
