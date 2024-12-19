import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { UploadFile } from "antd/es/upload";
import { defaultCountryManagementRepository } from "api/repositories/countryManagement/CountryManagementRepository";
import { CountryListRequestModel } from "api/repositories/countryManagement/model/CountryListRequestModel";
import { CountryListResponseModel } from "api/repositories/countryManagement/model/CountryListResponseModel";
import { CountryDetailResponseModel } from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import ModalConfirmationComponent from "components/generalComponents/modalConfirmation/ModalConfirmationComponent";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getMessage, urlToFile } from "utils/helpersInTs/helpersInTs";
import { countryManagementConstants } from "../constants/CountryManagementConstants";
import { IImportFiles } from "../views/actionFeature/actionTypeModel/CountryActionType";
import { AuthenticationContext } from "context/AuthenticationContext";
import { ColumnsType } from "antd/es/table";

const CountryManagementViewModel = () => {
  const {localStrings} = AuthenticationContext();
  const [list, setList] = useState<CountryListResponseModel[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<CountryDetailResponseModel>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [paramsExport, setParamsExport] = useState<CountryListRequestModel>({
    page: 0,
    limit: 10,
  });
  const [importFile, setImportFile] = useState<IImportFiles>({
    coverFiles: [],
    ensignFiles: [],
  });
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();

  const regionList = [
    {
      label: localStrings.CountryManagement.Regions.NorthAmerica,
      value: "Bắc Mỹ",
    },
    {
      label: localStrings.CountryManagement.Regions.SouthAmerica,
      value: "Nam Mỹ",
    },
    {
      label: localStrings.CountryManagement.Regions.Asia,
      value: "Châu Á",
    },
    {
      label: localStrings.CountryManagement.Regions.Europe,
      value: "Châu Âu",
    },
    {
      label: localStrings.CountryManagement.Regions.Africa,
      value: "Châu Phi",
    },
    {
      label: localStrings.CountryManagement.Regions.Australia,
      value: "Châu Đại Dương",
    },
    {
      label: localStrings.CountryManagement.Regions.Asean,
      value: "Đông Nam Á",
    },
  ];

  const fetchCountryList = async (params: CountryListRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultCountryManagementRepository?.getList(params);
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

  const resBehavior = async () => {
    await fetchCountryList({ page: 0, limit: pageSize });
    setPage(0);
    actionForm.setFieldsValue(new CountryDetailResponseModel());
    setDetailModal(false);
  };

  const fetchDetail = async (id: string) => {
    try {
      const res = await defaultCountryManagementRepository?.getDetail({
        id: id,
      });
      if (res) {
        setDetailInfo(res?.data);
        let cover = undefined;
        let ensign = await urlToFile(res?.data?.ensign, "Ensign_Image");
        if (res?.data?.cover !== null) {
          cover = await urlToFile(res?.data?.cover, "Cover_Image");
          setImportFile({
            coverFiles: [cover],
            ensignFiles: [ensign],
          });
        } else {
          setImportFile({
            coverFiles: [],
            ensignFiles: [ensign],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleActions = async (
    body: any,
    code: string,
    action: "update" | "create"
  ) => {
    let formData = new FormData();
    if (action === "update") {
      formData?.append("id", body?.id);
    }
    formData?.append("name", body?.name);
    if (detailInfo?.code !== body?.code) {
      formData?.append("code", body?.code);
    }
    formData?.append("region", body?.region);
    formData?.append("capital", body?.capital);
    formData?.append("active", body?.active);
    formData?.append(
      "isUploadFile",
      action === "update" ? JSON?.stringify(true) : JSON?.stringify(false)
    );
    if (!isEmpty(importFile?.coverFiles)) {
      importFile.coverFiles.forEach((file) => {
        if (file.originFileObj) {
          formData.append("file", file.originFileObj, file?.name);
        }
      });
    }
    importFile.ensignFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj, file?.name);
      }
    });
    switch (action) {
      case "update":
        try {
          setModalLoading(true);
          const res = await defaultCountryManagementRepository?.updateCountry(
            formData
          );
          if (res?.data) {
            getMessage(localStrings.GlobalMessage.UpdateSuccessfully, 5, "success");
            setImportFile({
              coverFiles: [],
              ensignFiles: [],
            });
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
          const res = await defaultCountryManagementRepository?.createCountry(
            formData
          );
          if (res?.data) {
            getMessage(localStrings.GlobalMessage.CreateSuccessfully, 5, "success");
            setImportFile({
              coverFiles: [],
              ensignFiles: [],
            });
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

  const columns: ColumnsType<CountryListResponseModel> = [
    ...countryManagementConstants(localStrings, regionList).tableColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "pathActions",
      align: "center",
      render: (record: CountryDetailResponseModel) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              type="primary"
              className="flex justify-center items-center"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={async () => {
                await fetchDetail(record?.id);
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
                          await defaultCountryManagementRepository?.deleteCountry(
                            { id: record?.id }
                          );
                        if (res?.data) {
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
                  },
                });
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleSearch = async (value: CountryListRequestModel) => {
    let params: CountryListRequestModel = {
      name:
        value?.name === "" || value?.name === undefined
          ? undefined
          : value?.name,
      capital:
        value?.capital === "" || value?.capital === undefined
          ? undefined
          : value?.capital,
      active: value?.active,
      page: 0,
      limit: pageSize,
      region:
        value?.region === localStrings.GlobalLabels.All ? undefined : value?.region,
    };
    setParamsExport(params);
    await fetchCountryList(params);
  };

  const handleTableChange = async (pagination?: DefaultPagingModel) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
    let params = {
      ...paramsExport,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    await fetchCountryList(params);
  };

  useEffect(() => {
    fetchCountryList({ page: 0, limit: 10 });
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
    importFile,
    regionList,
    setImportFile,
    setPage,
    setParamsExport,
    setDetailModal,
    setDetailInfo,
    fetchDetail,
    fetchCountryList,
    handleActions,
    handleSearch,
    handleTableChange,
  };
};

export default CountryManagementViewModel;
