import { ColumnsType } from "antd/es/table";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { isEmpty } from "lodash";
import { getUserStatus, getUserType } from "utils/helpersInTs/helpersInTs";
import { strings } from "utils/localizedStrings";

export const userManagementColumns = (localStrings: typeof strings) => {
  return [
    {
      title: localStrings.UserManagement.Columns.UserName,
      key: "username",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: localStrings.UserManagement.Columns.FullName,
      key: "fullName",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: localStrings.UserManagement.Columns.Email,
      key: "email",
      dataIndex: "email",
      align: "center",
      width: "15%",
    },
    {
      title: localStrings.UserManagement.Columns.Partner,
      key: "partner",
      dataIndex: "partner",
      align: "center",
      render: (record: UserManagementResponseModel["partner"]) => (
        <span>
          {isEmpty(record)
            ? localStrings.GlobalLabels.NoPartner
            : record?.name[0]?.toUpperCase() + record?.name?.slice(1)}
        </span>
      ),
    },
    {
      title: localStrings.UserManagement.Columns.Phone,
      key: "phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: localStrings.UserManagement.Columns.Balance,
      key: "balance",
      dataIndex: "balance",
      align: "center",
      render: (text) => (
        <span
          className={
            text === 0 ? "text-red-700 font-bold" : "text-green-700 font-bold"
          }
        >
          {new Intl.NumberFormat().format(text)} VND
        </span>
      ),
    },
    {
      title: localStrings.UserManagement.Columns.Role,
      key: "role",
      dataIndex: "roles",
      align: "center",
      render: (text: UserManagementResponseModel["roles"]) =>
        getUserType(text[0]?.code),
    },
    {
      title: localStrings.GlobalLabels.Status,
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => getUserStatus(text, localStrings),
    },
  ] as ColumnsType<UserManagementResponseModel>;
};
