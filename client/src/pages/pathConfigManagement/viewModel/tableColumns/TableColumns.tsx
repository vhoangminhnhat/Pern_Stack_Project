import { ColumnsType } from "antd/es/table";
import { PathConfigResponseModel } from "api/repositories/pathConfig/model/PathConfigResponseModel";
import { strings } from "utils/localizedStrings";

export const PathConfigColumns = (localStrings: typeof strings) => {
  return [
    {
      title: localStrings.PathConfigManagement.Columns.Title,
      key: "pathTitle",
      dataIndex: "title",
      align: "center",
    },
    {
      title: localStrings.PathConfigManagement.Columns.Code,
      key: "pathCode",
      dataIndex: "code",
      align: "center",
    },
    {
      title: localStrings.PathConfigManagement.Columns.Description,
      key: "pathDes",
      dataIndex: "description",
      align: "center",
    },
  ] as ColumnsType<PathConfigResponseModel>;
};
