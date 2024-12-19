import { Checkbox, Form, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { defaultTopupManagementRepository } from "api/repositories/packagesManagement/topupManagement/TopupManagementRepository";
import { GetPackagesByPhoneRequestModel } from "api/repositories/packagesRegistration/model/getPackagesByPhone/GetPackagesByPhoneRequestModel";
import { GetPackagesByPhoneResponseModel } from "api/repositories/packagesRegistration/model/getPackagesByPhone/GetPackagesByPhoneResponseModel";
import { PackagesRegistrationListRequestModel } from "api/repositories/packagesRegistration/model/PackagesRegistrationListRequestModel";
import { PackagesRegistrationListResponseModel } from "api/repositories/packagesRegistration/model/PackagesRegistrationListResponseModel";
import { defaultPackagesRegistraionRepository } from "api/repositories/packagesRegistration/PackagesRegistrationRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { debounce, isEmpty, isUndefined } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { PackagesRegistrationConstants } from "./constants/PackagesRegistrationConstants";
import { RoamingRegistrationDummy } from "./dummy/RoamingRegistrationDummy";

const RoamingRegistrationViewModel = (props: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  //Roaming Available List States
  const [packageList, setPackageList] =
    useState<GetPackagesByPhoneResponseModel>({});
  const { modal, setModal } = props;
  const [featureLoading, setFeatureLoading] = useState<boolean>(false);
  const [page, setPage] = useState<DefaultPagingModel["current"]>(0);
  const [pageSize, setPageSize] = useState<DefaultPagingModel["pageSize"]>(10);
  const [totalPackage, setTotalPackage] = useState<number>(0);
  const [selectedRowDatas, setSelectedRowDatas] = useState<
    TopupResponseModel[]
  >([]);
  const [paramsExport, setParamsExport] =
    useState<GetPackagesByPhoneRequestModel>({});
  const [filterForm] = Form.useForm();
  // Roaming Registration List States
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [packagesForSelect, setPackagesForSelect] = useState<
    TopupResponseModel[]
  >([]);
  const [registeredPhoneList, setRegisteredPhoneList] = useState<
    PackagesRegistrationListResponseModel[]
  >([]);
  const [mainPage, setMainPage] = useState<DefaultPagingModel["current"]>(0);
  const [mainPageSize, setMainPageSize] =
    useState<DefaultPagingModel["pageSize"]>(10);
  const [mainTotal, setMainTotal] = useState<number>(0);
  const [mainFilterForm] = Form.useForm();
  const [mainParams, setMainParams] =
    useState<PackagesRegistrationListRequestModel>({
      page: 0,
      limit: 10,
    });
  const { localStrings } = AuthenticationContext();

  const onCheckRecord = (e, record) => {
    const { checked } = e.target;
    if (checked) {
      if (!isEmpty(selectedRowDatas)) {
        let newRecord = [record];
        setSelectedRowDatas(newRecord);
      } else {
        setSelectedRowDatas([record]);
      }
    }
  };

  const columns: ColumnsType<TopupResponseModel> =
    isEmpty(filterForm?.getFieldValue("phone")) ||
    isUndefined(filterForm.getFieldValue("phone"))
      ? [...PackagesRegistrationConstants(localStrings)?.packagesColumns]
      : [
          ...PackagesRegistrationConstants(localStrings)?.packagesColumns,
          {
            title: localStrings.RoamingRegistration.Action,
            key: "action",
            align: "center",
            fixed: "right",
            width: "8%",
            render: (text, record) => (
              <span>
                <Checkbox
                  checked={selectedRowDatas.indexOf(record) === 0}
                  value={selectedRowDatas}
                  onChange={(e) => onCheckRecord(e, record)}
                />
              </span>
            ),
          },
        ];

  const fetchPackagesList = async (
    phone: string,
    params: GetPackagesByPhoneRequestModel,
    type: "paging" | "noPaging"
  ) => {
    switch (type) {
      case "paging":
        try {
          setFeatureLoading(true);
          const res =
            await defaultPackagesRegistraionRepository?.getPackageByPhone(
              phone,
              params
            );
          if (res) {
            setPackageList(res?.data);
            setTotalPackage(res?.data?.items?.length);
          }
        } catch (error: any) {
          console.log(error);
        } finally {
          setFeatureLoading(false);
        }
        break;
      case "noPaging":
        try {
          setFeatureLoading(true);
          const res = await defaultTopupManagementRepository?.getList({
            pagination: 1,
            ...params,
          });
          if (res) {
            setPackagesForSelect(res?.data);
            setTotalPackage(res?.data?.length);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setFeatureLoading(false);
        }
        break;
    }
  };

  const fetchRegisteredList = async (
    params: PackagesRegistrationListRequestModel
  ) => {
    try {
      setListLoading(true);
      setRegisteredPhoneList(RoamingRegistrationDummy?.data);
      setMainTotal(RoamingRegistrationDummy?.pagination?.total);
    } catch (error) {
      console.log(error);
    } finally {
      setListLoading(false);
    }
  };

  const handleSearch = debounce(
    async (value: GetPackagesByPhoneRequestModel) => {
      let params: typeof value = {
        name:
          value?.name === "" || value?.name === undefined
            ? undefined
            : value?.name,
        category:
          value?.category === localStrings.GlobalLabels.All
            ? undefined
            : value?.category,
      };
      setParamsExport(params);
      setPage(0);
      await fetchPackagesList(
        value?.phone,
        params,
        isEmpty(filterForm?.getFieldValue("phone")) ||
          isUndefined(filterForm?.getFieldValue("phone"))
          ? "noPaging"
          : "paging"
      );
    },
    800
  );

  const onRoamingRegistration = async (value: any) => {
    if (
      (isEmpty(value?.phone) && isEmpty(selectedRowDatas)) ||
      (isUndefined(value?.phone) && isEmpty(selectedRowDatas))
    ) {
      getMessage(
        localStrings.RoamingRegistration.Message.InvalidPackageAndPhone,
        4,
        "warning"
      );
    } else if (isEmpty(selectedRowDatas) && !isEmpty(value?.phone)) {
      getMessage(
        localStrings.RoamingRegistration.Message.InvalidPackage,
        4,
        "warning"
      );
    } else if (isEmpty(value?.phone) && !isEmpty(selectedRowDatas)) {
      getMessage(
        localStrings.RoamingRegistration.Message.InvalidPhone,
        4,
        "warning"
      );
    } else {
      Modal.confirm({
        okText: localStrings.GlobalLabels.Confirmed,
        cancelText: localStrings.GlobalLabels.Cancel,
        width: 500,
        centered: true,
        onOk: async () => {
          getMessage(
            localStrings.RoamingRegistration.Message.RegisterSuccessfully,
            4,
            "success"
          );
          setSelectedRowDatas([]);
          filterForm?.resetFields();
          setPackageList({});
          await fetchPackagesList("", {}, "noPaging");
        },
        title: `${localStrings.RoamingRegistration.Message.PhoneRegistrationConfirm} ${selectedRowDatas[0]?.name} ${localStrings.RoamingRegistration.Message.ForPhone} ${value?.phone} ?`,
      });
    }
  };

  const handleTableChange = async (pagination?: DefaultPagingModel | any) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
  };

  const handleRegisteredTable = async (
    pagination?: DefaultPagingModel | any
  ) => {
    setMainPage(pagination?.current! - 1);
    setMainPageSize(pagination?.pageSize!);
    let params = {
      ...mainParams,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    setMainParams(params);
    await fetchRegisteredList(params);
  };

  useEffect(() => {
    fetchRegisteredList({ page: 0, limit: 10 });
  }, []);

  useEffect(() => {
    if (modal === true) {
      fetchPackagesList("", {}, "noPaging");
    }
  }, [modal]);

  return {
    packageList,
    featureLoading,
    page,
    pageSize,
    totalPackage,
    filterForm,
    selectedRowDatas,
    columns,
    listColumns: PackagesRegistrationConstants(localStrings)?.mainColumns,
    listLoading,
    registeredPhoneList,
    mainPage,
    mainPageSize,
    mainTotal,
    mainFilterForm,
    packagesForSelect,
    setPackageList,
    setMainPage,
    fetchRegisteredList,
    setMainParams,
    setListLoading,
    onCheckRecord,
    setPage,
    setParamsExport,
    setSelectedRowDatas,
    fetchPackagesList,
    handleSearch,
    handleTableChange,
    handleRegisteredTable,
    onRoamingRegistration,
  };
};

export default RoamingRegistrationViewModel;
