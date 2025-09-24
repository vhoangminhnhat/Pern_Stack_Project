import { ColumnsType } from "antd/es/table";
import { TeacherManagementResponseModel } from "api/repositories/teacherManagement/model/TeacherManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import moment from "moment";
import { strings } from "utils/localizedStrings";

export class TeacherManagementConstants {
  private static getBoolean(localStrings: typeof strings, value: boolean) {
    if (value == true) {
      return (
        <span className="text-green-600 font-bold">
          {localStrings.GlobalLabels.Yes}
        </span>
      );
    } else {
      return (
        <span className="text-red-700 font-bold">
          {localStrings.GlobalLabels.No}
        </span>
      );
    }
  }

  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.TeacherManagement.Columns)?.map(
      ([key, val]) => {
        return {
          title: val,
          dataIndex: key,
          key: `teacher-${key}`,
          align: "center",
          ellipsis: {
            showTitle: true,
          },
          render: (text: any, record: TeacherManagementResponseModel) => {
            switch (key) {
              case "birthDay":
                return text ? moment(text).format("DD/MM/YYYY") : localStrings.GlobalLabels.NoInfo;
              case "gender":
                return text === "male" ? localStrings.GlobalLabels.Male : localStrings.GlobalLabels.Female;
              default:
                return text ? text : localStrings.GlobalLabels.NoInfo;
            }
          },
        };
      }
    ) as ColumnsType<TeacherManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "username",
        filterType: "input",
        labelName: localStrings.TeacherManagement.Labels.username,
        options: [],
        placeholder: localStrings.TeacherManagement.Labels.username,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "fullName",
        filterType: "input",
        labelName: localStrings.TeacherManagement.Labels.fullName,
        options: [],
        placeholder: localStrings.TeacherManagement.Labels.fullName,
      },
      {
        colLg: 8,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "gender",
        filterType: "select",
        labelName: localStrings.TeacherManagement.Labels.gender,
        placeholder: localStrings.TeacherManagement.Labels.gender,
        options: [
          {
            label: localStrings.GlobalLabels.Male,
            value: "male",
          },
          {
            label: localStrings.GlobalLabels.Female,
            value: "female",
          },
        ],
      },
    ] as FilterAttributes[];
  }
}
