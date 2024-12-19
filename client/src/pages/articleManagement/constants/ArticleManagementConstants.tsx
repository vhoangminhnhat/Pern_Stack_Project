import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
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
}
