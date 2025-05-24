import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { FileManagementResponseModel } from "api/repositories/fileManagement/model/FileManagementResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import { isEmpty } from "lodash";
import { typeList } from "pages/fileManagement/constants/FileManagementConstants";
import { strings } from "utils/localizedStrings";

export class ArticleManagementConstants {
  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.ArticleManagement.Labels)?.map(
      ([key, val]) => {
        if (key === "name") {
          return {
            title: val,
            align: "center",
            dataIndex: key,
            key: `class-${key}`,
            ellipsis: {
              showTitle: false,
            },
            render: (text) => (
              <Tooltip
                placement="bottomLeft"
                title={<span style={{ color: "#0f0f0f" }}>{text}</span>}
                color="#f5f7fa"
              >
                {text}
              </Tooltip>
            ),
          };
        }
        return {
          title: val,
          align: "center",
          dataIndex: key,
          key: `class-${key}`,
        };
      }
    ) as ColumnsType<ArticleManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.ArticleManagement.Labels.name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "code",
        filterType: "input",
        labelName: localStrings.ArticleManagement.Labels.code,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Code,
      },
      {
        colLg: 8,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "type",
        filterType: "input",
        labelName: localStrings.ArticleManagement.Labels.source,
        placeholder: localStrings.GlobalPlaceholder.Name,
      },
    ] as FilterAttributes[];
  }

  static actionForm(
    detailInfo: FileManagementResponseModel,
    localStrings: typeof strings
  ) {
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
  }
}
