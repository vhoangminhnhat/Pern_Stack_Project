import { ColumnsType } from "antd/es/table";
import { StudentManagementResponseModel } from "api/repositories/studentManagement/model/StudentManagementResponseModel";
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
}
