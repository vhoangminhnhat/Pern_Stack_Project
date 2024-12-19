import { FileImageOutlined, FileProtectOutlined } from "@ant-design/icons";
import { FormInstance, UploadFile } from "antd";
import { ColumnsType } from "antd/es/table";
import { UploadChangeParam } from "antd/es/upload";
import { FileManagementResponseModel } from "api/repositories/fileManagement/model/FileManagementResponseModel";
import { ReplaceFilesRequestModel } from "api/repositories/fileManagement/model/replaceFiles/ReplaceFilesRequestModel";
import { UploadFilesRequestModel } from "api/repositories/fileManagement/model/uploadFiles/UploadFilesRequestModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { isEmpty } from "lodash";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { strings } from "utils/localizedStrings";

export interface IFileManagement {
  file: UploadFile[];
}

export interface IUploadReplaceFiles {
  data: {
    modalLoading: boolean;
    detailInfo: FileManagementResponseModel;
    detailModal: boolean;
    setDetailModal: Dispatch<SetStateAction<boolean>>;
    setDetailInfo: Dispatch<SetStateAction<FileManagementResponseModel>>;
    actionForm: FormInstance<any>;
    importFile: IFileManagement;
    handleActions: (
      body: UploadFilesRequestModel | ReplaceFilesRequestModel,
      action: "upload" | "replace"
    ) => Promise<void>;
    handleUploadChange: (type: "file") => (info: UploadChangeParam) => void;
  };
}

export const typeList = [
  "jpg",
  "jpeg",
  "png",
  "svg",
  "docx",
  "pdf",
  "xls",
  "html",
];

export const fileManagementConstants = (localStrings: typeof strings) => {
  return {
    tableColumns: [
      {
        title: localStrings.FileManagement.Columns.Name,
        key: "fileName",
        dataIndex: "name",
        align: "center",
      },
      {
        title: localStrings.FileManagement.Columns.Code,
        key: "fileCode",
        dataIndex: "code",
        align: "center",
      },
      {
        title: localStrings.FileManagement.Columns.Size,
        key: "fileSize",
        dataIndex: "sizeInBytes",
        align: "center",
        render: (text) => new Intl.NumberFormat().format(text as number),
      },
      {
        title: localStrings.GlobalLabels.updatedAt,
        key: "fileUpdated",
        dataIndex: "updatedAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
    ] as ColumnsType<FileManagementResponseModel>,
    //Filters
    filters: [
      {
        colLg: 12,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.FileManagement.Columns.Name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <FileImageOutlined className="pr-1" />,
      },
      {
        colLg: 12,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "type",
        filterType: "select",
        labelName: localStrings.FileManagement.Columns.Type,
        options: typeList
          ?.map((item) => {
            return {
              label: item?.toUpperCase(),
              value: item,
            };
          })
          ?.concat({
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          })
          ?.reverse() as SelectOps[],
        placeholder: localStrings.FileManagement.Placeholder.Type,
        prefixIcon: <FileProtectOutlined className="pr-1" />,
      },
    ] as FilterAttributes[],
    //Action Attributes
    actionForm: (detailInfo: FileManagementResponseModel) => {
      const actionForms = [
        {
          label: localStrings.FileManagement.Columns.Name,
          name: "name",
          type: "input",
          createFormRules: {
            stricted: true,
            type: "string",
            message: localStrings.GlobalPlaceholder.Name,
          },
          detailKey: "name",
          pointerEvents: false,
          placeholder: localStrings.GlobalPlaceholder.Name,
        },
        {
          label: localStrings.FileManagement.Columns.Code,
          name: "code",
          type: "input",
          createFormRules: {
            stricted: true,
            type: "string",
            message: localStrings.GlobalPlaceholder.Code,
          },
          detailKey: "code",
          pointerEvents: false,
          placeholder: localStrings.GlobalPlaceholder.Code,
        },
        {
          label: localStrings.FileManagement.Columns.Type,
          name: "type",
          type: "select",
          createFormRules: {
            stricted: false,
            type: "string",
            message: localStrings.FileManagement.Placeholder.Type,
          },
          detailKey: "type",
          pointerEvents: false,
          placeholder: localStrings.FileManagement.Placeholder.Type,
          options: typeList?.map((item, index) => {
            return {
              label: item?.toUpperCase(),
              value: item,
            };
          }) as SelectOps[],
        },
        {
          label: localStrings.GlobalLabels.Description,
          name: "description",
          type: "text-area",
          createFormRules: {
            stricted: false,
            type: "string",
            message: localStrings.GlobalPlaceholder.Description,
          },
          detailKey: "description",
          pointerEvents: false,
          placeholder: localStrings.GlobalLabels.Description,
        },
      ] as ActionsComponentType<FileManagementResponseModel>[];

      const urlForm: typeof actionForms = [
        {
          label: "URL",
          name: "url",
          type: "text-area",
          createFormRules: {
            stricted: true,
            type: "string",
            message: localStrings.GlobalPlaceholder.Description,
          },
          detailKey: "url",
          pointerEvents: true,
        },
      ];

      return isEmpty(detailInfo)
        ? actionForms
        : actionForms?.slice(0, 3).concat(urlForm, actionForms?.slice(3));
    },
    //Upload Props
    uploadProps: {
      format: "file",
      accept: ".jpg, .jpeg, .png, .docx, .pdf, .html",
      multiple: false,
      beforeUpload() {
        return false;
      },
    },
  };
};
