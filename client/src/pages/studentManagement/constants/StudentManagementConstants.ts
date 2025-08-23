import { ColumnsType } from "antd/es/table";
import { StudentManagementResponseModel } from "api/repositories/studentManagement/model/StudentManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export class StudentManagementConstants {
  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.StudentManagement.Labels)?.map(
      ([key, val]) => {
        return {
          title: val,
          dataIndex: key,
          key: `student-${key}`,
          align: "center",
          ellipsis: {
            showTitle: false,
          },
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
