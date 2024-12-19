import {
  DeleteOutlined,
  DownloadOutlined,
  FileSearchOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { IDocument } from "@cyntler/react-doc-viewer";
import { Button, Divider, Form, Tooltip, UploadFile } from "antd";
import { ColumnsType } from "antd/es/table";
import { defaultContentRepository } from "api/repositories/contentManagement/ContentManagementRepository";
import { ContentManagementRequestModel } from "api/repositories/contentManagement/model/ContentManagementRequestModel";
import { ContentManagementResponseModel } from "api/repositories/contentManagement/model/ContentManagementResponseModel";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import ModalConfirmationComponent from "components/generalComponents/modalConfirmation/ModalConfirmationComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { IFileReplacement } from "../views/actionFeatures/actionFeatureTypes/ActionFeatureTypes";
import { contentManagementConstants } from "./constants/ContentManagementConstants";

const ContentManagementViewModel = () => {
  const { localStrings } = AuthenticationContext();
  const [form] = Form.useForm();
  const [downloadForm] = Form.useForm();
  const [importFile, setImportFile] = useState<IFileReplacement>({
    doc: [],
    image: [],
  });
  const [actionForm] = Form.useForm();
  const [list, setList] = useState<ContentManagementResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [info, setInfo] = useState({});
  const [modal, setModal] = useState<boolean>(false);
  const [downloadModal, setDownloadModal] = useState<boolean>(false);
  const [docs, setDocs] = useState<IDocument[]>([]);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [paramsExport, setParamsExport] =
    useState<ContentManagementRequestModel>({
      page: 0,
      limit: 10,
    });
  const columns: ColumnsType<ContentManagementResponseModel> = [
    ...contentManagementConstants(localStrings).tableColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "contentActions",
      align: "center",
      render: (record: ContentManagementResponseModel) => (
        <div className="flex justify-center items-center gap-y-3">
          <Tooltip title={localStrings.ContentManagement.Columns.Preview}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              icon={<FileSearchOutlined className="text-blue-700" />}
              onClick={() => handleViewDetails(record, "preview")}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={localStrings.ContentManagement.Columns.Replace}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              icon={<SwitcherOutlined className="text-indigo-700" />}
              onClick={() => handleViewDetails(record, "replace")}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={localStrings.ContentManagement.Columns.Download}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              icon={<DownloadOutlined className="text-green-700" />}
              onClick={() => {
                setDownloadModal(true);
                setInfo({
                  id: record?.id,
                  image: record?.imageUrl,
                  file: record?.contentUrl,
                  title: record?.title,
                });
              }}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={localStrings.ContentManagement.Columns.Delete}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              icon={<DeleteOutlined className="text-red-700" />}
              onClick={() =>
                ModalConfirmationComponent({
                  data: {
                    async onOk() {
                      try {
                        const res =
                          await defaultContentRepository?.deleteContent({
                            id: record?.id,
                          });
                        if (res) {
                          getMessage(
                            localStrings.GlobalMessage.DeleteSuccessfully,
                            5,
                            "success"
                          );
                          await fetchContentList({ page: 0, limit: 10 });
                        }
                      } catch (error) {
                        console.log(error);
                        getMessage(
                          localStrings.GlobalMessage.DeleteFailed,
                          5,
                          "error"
                        );
                      }
                    },
                  },
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const urlToFile = async (
    url: string,
    filename: string,
    type: "doc" | "image"
  ): Promise<UploadFile> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileExtension = blob.type.split("/")[1];
    const newFileName = filename.includes(".")
      ? filename
      : `${filename}.${fileExtension}`;
    const file = new File([blob], newFileName, { type: blob.type });
    setImportFile((prevState: IFileReplacement) => ({
      ...prevState,
      [type]: [
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

  const downloadFile = async (
    fileName: string,
    title: string,
    type: string
  ) => {
    switch (type) {
      case "file":
        if (!fileName || !fileName.endsWith(".docx")) {
          getMessage(
            localStrings.ContentManagement.Message.WrongStructure,
            5,
            "warning"
          );
          return false;
        }
        try {
          const res = await fetch(fileName);
          const blob = await res.blob();
          const blobURL = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobURL;
          link.download = `Content_${title}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error downloading file:", error);
        }
        break;
      case "image":
        try {
          const res = await fetch(fileName);
          const imageBlob = await res.blob();
          const href = URL.createObjectURL(imageBlob);
          const anchorElement = document.createElement("a");
          anchorElement.href = href;
          anchorElement.download = `Image_${title}`;
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
          window.URL.revokeObjectURL(href);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
        break;
      default:
        console.warn(`Unsupported type: ${type}`);
    }
  };

  const fetchContentList = async (params: ContentManagementRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultContentRepository?.getContentList(params);
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

  const handleTableChange = async (pagination?: DefaultPagingModel) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
    let params = {
      ...paramsExport,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize!,
    };
    await fetchContentList(params);
  };

  const handleSearch = async (value: any) => {
    let params: ContentManagementRequestModel = {
      title: value?.title === "" ? undefined : value?.title,
      active:
        value?.active === localStrings.GlobalLabels.All
          ? undefined
          : value?.active,
      limit: pageSize,
      page: 0,
    };
    setParamsExport(params);
    await fetchContentList(params);
  };

  const handleAction = async (info: any, action: string) => {
    if (isEmpty(importFile)) {
      getMessage(localStrings.ContentManagement.Message.Files, 5, "error");
    }
    let formData = new FormData();
    formData.append("title", info?.title);
    if (!!info?.id) {
      formData.append("id", info?.id);
    }
    if (info?.active !== undefined) {
      formData.append("active", info?.active);
    }
    if (action === "replace") {
      formData?.append("isUploadFile", JSON.stringify(true));
    }
    if (!isEmpty(importFile?.image)) {
      importFile?.image?.forEach((item) => {
        formData?.append("file", item?.originFileObj, "Image_Files");
      });
    }
    importFile?.doc?.forEach((item) => {
      formData?.append("file", item?.originFileObj, "Content_Files.docx");
    });
    switch (action) {
      case "create":
        try {
          const res = await defaultContentRepository?.createContent(formData);
          if (res) {
            getMessage(
              localStrings.GlobalMessage.CreateSuccessfully,
              5,
              "success"
            );
            setActionModal(false);
            actionForm?.setFieldsValue(new ContentManagementResponseModel());
            setImportFile({
              doc: [],
              image: [],
            });
            setDocs([]);
            await fetchContentList({ page: 0, limit: 10 });
          }
        } catch (error) {
          console.log(error);
          getMessage(localStrings.GlobalMessage.CreateFailed, 5, "error");
        }
        break;
      case "replace":
        try {
          const res = await defaultContentRepository?.updateContent(formData);
          if (res) {
            getMessage(
              localStrings.GlobalMessage.UpdateSuccessfully,
              5,
              "success"
            );
            setActionModal(false);
            await fetchContentList({ page: 0, limit: 10 });
            actionForm?.setFieldsValue({});
            setImportFile({
              doc: [],
              image: [],
            });
            setDocs([]);
          }
        } catch (error) {
          console.log(error);
          getMessage(localStrings.GlobalMessage.UpdateFailed, 5, "error");
        }
        break;
    }
  };

  const handleViewDetails = async (
    info: ContentManagementResponseModel,
    action: string
  ) => {
    switch (action) {
      case "preview":
        setDocs([
          {
            uri: info?.contentUrl,
            fileData: info?.contentUrl,
          },
        ]);
        setModal(true);
        break;
      case "create":
        actionForm.resetFields();
        setActionModal(true);
        setInfo({});
        break;
      case "replace":
        await urlToFile(info?.contentUrl, "Content_Files", "doc");
        await urlToFile(info?.imageUrl, "Image_Files", "image");
        actionForm.resetFields();
        setActionModal(true);
        setInfo(info);
        break;
    }
  };

  useEffect(() => {
    fetchContentList(paramsExport);
  }, []);

  return {
    columns,
    form,
    downloadForm,
    actionForm,
    list,
    loading,
    page,
    pageSize,
    total,
    docs,
    modal,
    actionModal,
    downloadModal,
    info,
    importFile,
    setImportFile,
    setInfo,
    setModal,
    setActionModal,
    setDownloadModal,
    setDocs,
    setPage,
    handleTableChange,
    handleSearch,
    downloadFile,
    handleViewDetails,
    fetchContentList,
    handleAction,
  };
};

export default ContentManagementViewModel;
