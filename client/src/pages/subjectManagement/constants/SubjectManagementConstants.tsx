import { ColumnsType } from "antd/es/table";
import { SubjectManagementResponseModel } from "api/repositories/subjectManagement/model/SubjectManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export class SubjectManagementConstants {
  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.SubjectManagement.Columns)?.map(
      ([key, val]) => {
        return {
          title: val,
          dataIndex: key,
          key: `subject-${key}`,
          align: "center",
          ellipsis: {
            showTitle: true,
          },
          render: (text: any, record: SubjectManagementResponseModel) => {
            switch (key) {
              case "scheduleCount":
                return record._count?.schedules || 0;
              case "scoreCount":
                return record._count?.scores || 0;
              default:
                return text ? text : localStrings.GlobalLabels.NoInfo;
            }
          },
        };
      }
    ) as ColumnsType<SubjectManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.SubjectManagement.Labels.name,
        options: [],
        placeholder: localStrings.SubjectManagement.Labels.name,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "code",
        filterType: "input",
        labelName: localStrings.SubjectManagement.Labels.code,
        options: [],
        placeholder: localStrings.SubjectManagement.Labels.code,
      },
    ] as FilterAttributes[];
  }
}
