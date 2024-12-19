import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { ContentManagementResponseModel } from "api/repositories/contentManagement/model/ContentManagementResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import moment from "moment";
import { strings } from "utils/localizedStrings";

export const contentManagementConstants = (localStrings: typeof strings) => {
  return {
    // Columns
    tableColumns: [
      {
        title: localStrings.ContentManagement.Columns.Name,
        key: "contentName",
        dataIndex: "title",
        align: "center",
      },
      {
        title: localStrings.GlobalLabels.Status,
        key: "contentStatus",
        dataIndex: "active",
        align: "center",
        render: (text) =>
          contentManagementConstants(localStrings).statusForContent(text),
      },
      {
        title: localStrings.GlobalLabels.createdAt,
        key: "contentCreated",
        dataIndex: "createdAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: localStrings.GlobalLabels.updatedAt,
        key: "contentUpdated",
        dataIndex: "updatedAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
    ] as ColumnsType<ContentManagementResponseModel>,

    // Filters
    filterAttributes: [
      {
        colLg: 12,
        defaultValue: "",
        filterName: "title",
        filterType: "input",
        labelName: localStrings.ContentManagement.Columns.Name,
        options: [],
        placeholder: strings.GlobalPlaceholder.Name,
        prefixIcon: <UserOutlined className="pr-1" />,
      },
      {
        colLg: 12,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "active",
        filterType: "select",
        labelName: localStrings.GlobalLabels.Status,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          {
            label: localStrings.GlobalLabels.Active,
            value: 0,
          },
          {
            label: localStrings.GlobalLabels.Inactive,
            value: 1,
          },
        ] as SelectOps[],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <SmileOutlined className="pr-1" />,
      },
    ] as FilterAttributes[],

    // Upload props
    docProps: {
      format: "file",
      accept: ".docx",
      multiple: true,
      beforeUpload() {
        return false;
      },
    },
    imageProps: {
      format: "file",
      accept: ".jpg, .jpeg, .png",
      multiple: true,
      beforeUpload() {
        return false;
      },
    },

    // Form layout
    formItemLayout: {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    },

    // Status rendering
    statusForContent: (value: number) => {
      switch (value) {
        case 0:
          return (
            <span className="text-green-600 font-bold">
              {localStrings.GlobalLabels.Active}
            </span>
          );
        case 1:
          return (
            <span className="text-red-700 font-bold">
              {localStrings.GlobalLabels.Inactive}
            </span>
          );
        default:
          return null; // Handle unknown status
      }
    },

    // Update/Create attributes
    updateCreateAttributes: (info: any) => {
      const defaultAttributes: ActionsComponentType<ContentManagementResponseModel>[] =
        [
          {
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.GlobalPlaceholder.Name,
            },
            label: localStrings.ContentManagement.Columns.Name,
            name: "title",
            placeholder: localStrings.GlobalPlaceholder.Name,
            pointerEvents: false,
            type: "input",
            detailKey: "title",
          },
          {
            createFormRules: {
              stricted: true,
              type: "number",
              message: localStrings.GlobalPlaceholder.Status,
            },
            label: localStrings.GlobalLabels.Status,
            name: "active",
            placeholder: localStrings.GlobalPlaceholder.Status,
            pointerEvents: false,
            type: "select",
            detailKey: "active",
            options: [
              {
                label: localStrings.GlobalLabels.Active,
                value: 0,
              },
              {
                label: localStrings.GlobalLabels.Inactive,
                value: 1,
              },
            ] as SelectOps[],
          },
        ];

      const idAttribute: ActionsComponentType<ContentManagementResponseModel>[] =
        [
          {
            createFormRules: {
              stricted: true,
              type: "string",
              message: strings.GlobalPlaceholder.Name,
            },
            label: "ID",
            name: "id",
            placeholder: strings.GlobalPlaceholder.Name,
            pointerEvents: true,
            type: "input",
            detailKey: "id",
          },
        ];

      return info?.id
        ? [...idAttribute, ...defaultAttributes]
        : defaultAttributes;
    },
  };
};
