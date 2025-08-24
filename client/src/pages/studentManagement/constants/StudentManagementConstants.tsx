import { ColumnsType } from "antd/es/table";
import { StudentManagementResponseModel } from "api/repositories/studentManagement/model/StudentManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import moment from "moment";
import { strings } from "utils/localizedStrings";

export class StudentManagementConstants {
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
    return Object.entries(localStrings.StudentManagement.Columns)?.map(
      ([key, val]) => {
        return {
          title: val,
          dataIndex: key,
          key: `student-${key}`,
          align: "center",
          ellipsis: {
            showTitle: true,
          },
          render: (text) =>
            key === "birthDate"
              ? !!text
                ? moment(text).format("DD/MM/YYYY HH:mm:ss")
                : localStrings.GlobalLabels.NoInfo
              : key === "debtor"
              ? this.getBoolean(localStrings, text)
              : !!text
              ? text
              : localStrings.GlobalLabels.NoInfo,
        };
      }
    ) as ColumnsType<StudentManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "studentId",
        filterType: "input",
        labelName: localStrings.StudentManagement.Labels.studentId,
        options: [],
        placeholder: localStrings.StudentManagement.Labels.studentId,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "fullName",
        filterType: "input",
        labelName: localStrings.StudentManagement.Labels.fullName,
        options: [],
        placeholder: localStrings.StudentManagement.Labels.fullName,
      },
      {
        colLg: 8,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "gender",
        filterType: "select",
        labelName: localStrings.StudentManagement.Labels.gender,
        placeholder: localStrings.StudentManagement.Labels.gender,
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
