import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { defaultFileManagementRepository } from "api/repositories/fileManagement/FileManagementRepository";
import { FileManagementRequestModel } from "api/repositories/fileManagement/model/FileManagementRequestModel";
import { FileManagementResponseModel } from "api/repositories/fileManagement/model/FileManagementResponseModel";
import { ReplaceFilesRequestModel } from "api/repositories/fileManagement/model/replaceFiles/ReplaceFilesRequestModel";
import { UploadFilesRequestModel } from "api/repositories/fileManagement/model/uploadFiles/UploadFilesRequestModel";
import ModalConfirmationComponent from "components/generalComponents/modalConfirmation/ModalConfirmationComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import {
  fileManagementConstants,
  IFileManagement,
} from "../constants/FileManagementConstants";

const FileManagementViewModel = () => {
  const [list, setList] = useState<FileManagementResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [detailInfo, setDetailInfo] = useState<FileManagementResponseModel>({});
  const [paramsExport, setParamsExport] = useState<FileManagementRequestModel>({
    page: 0,
    pagination: 0,
    limit: 10,
  });
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();
  const [importFile, setImportFile] = useState<IFileManagement>({
    file: [],
  });
  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: FileManagementRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultFileManagementRepository?.getList(params);
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

  const handleSearch = async (values: FileManagementRequestModel) => {
    let params = {
      name:
        values?.name === "" || values?.name === undefined
          ? undefined
          : values?.name,
      type:
        values?.type === localStrings.GlobalLabels.All
          ? undefined
          : values?.type,
      page: 0,
      limit: pageSize,
    };
    setParamsExport(params);
    await fetchList(params);
  };

  const handleTableChange = async (pagination?: DefaultPagingModel) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
    let params = {
      ...paramsExport,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    await fetchList(params);
  };

  const resBehavior = async () => {
    await fetchList({ page: 0, limit: pageSize, pagination: 0 });
    setPage(0);
    actionForm.setFieldsValue(new FileManagementResponseModel());
    setDetailModal(false);
  };

  const handleUploadChange = (type: "file") => (info: UploadChangeParam) => {
    setImportFile((prevState) => ({
      [type]: info?.fileList as RcFile[],
    }));
  };

  const columns: ColumnsType<FileManagementResponseModel> = [
    ...fileManagementConstants(localStrings).tableColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "fileActions",
      align: "center",
      render: (record: FileManagementResponseModel) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.FileManagement.Download}>
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<DownloadOutlined className="text-green-700" />}
              onClick={async () => {
                await downloadFile(record?.url, record?.name);
              }}
            />
          </Tooltip>
          <Tooltip title={localStrings.FileManagement.CopyUrl}>
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<CopyOutlined className="text-yellow-500" />}
              onClick={async () => {
                await window?.navigator?.clipboard?.writeText(record?.url);
                getMessage(
                  localStrings.FileManagement.Placeholder.Url,
                  4,
                  "success"
                );
              }}
            />
          </Tooltip>
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              type="primary"
              className="flex justify-center items-center"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={async () => {
                await urlToFile(record?.url, record?.name);
                setDetailInfo(record);
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
              onClick={() =>
                ModalConfirmationComponent({
                  data: {
                    async onOk() {
                      try {
                        setLoading(true);
                        const res =
                          await defaultFileManagementRepository?.deleteFiles({
                            code: record?.code,
                          });
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
                })
              }
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const downloadFile = async (fileUrl: string, title: string) => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = `File_${title}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const urlToFile = async (
    url: string,
    filename: string
  ): Promise<UploadFile> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileExtension = blob.type.split("/")[1];
    const newFileName = filename.includes(".")
      ? filename
      : `${filename}.${fileExtension}`;
    const file = new File([blob], newFileName, { type: blob.type });
    setImportFile((value) => ({
      ["file"]: [
        {
          uid: newFileName,
          name: newFileName,
          status: "done",
          url: url,
          thumbUrl: url,
          originFileObj: file,
        },
      ] as UploadFile[],
    }));
    return {
      uid: newFileName,
      name: newFileName,
      status: "done",
      url: url,
      thumbUrl: url,
      originFileObj: file,
    } as UploadFile;
  };

  const handleActions = async (
    body: UploadFilesRequestModel | ReplaceFilesRequestModel,
    action: "replace" | "upload"
  ) => {
    let formData = new FormData();
    formData?.append("name", body?.name);
    formData?.append("code", body?.code);
    formData?.append("type", body?.type);
    importFile.file.forEach((file) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj, file?.name);
      }
    });

    switch (action) {
      case "replace":
        try {
          setModalLoading(true);
          const res = await defaultFileManagementRepository.replaceFiles(
            formData
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              5,
              "success"
            );
            setImportFile({
              file: [],
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
      case "upload":
        try {
          setModalLoading(true);
          const res = await defaultFileManagementRepository?.uploadFiles(
            formData
          );
          if (res?.data) {
            getMessage(
              localStrings.GlobalMessage.CreateSuccessfully,
              5,
              "success"
            );
            setImportFile({
              file: [],
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

  useEffect(() => {
    fetchList({ page: 0, limit: 10, pagination: 0 });
  }, []);
  return {
    list,
    loading,
    page,
    pageSize,
    total,
    filterForm,
    actionForm,
    detailInfo,
    detailModal,
    modalLoading,
    importFile,
    columns,
    handleUploadChange,
    setPage,
    setParamsExport,
    setImportFile,
    setDetailModal,
    setDetailInfo,
    fetchList,
    handleActions,
    handleSearch,
    handleTableChange,
  };
};

export default FileManagementViewModel;
