import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { PartnersResponse } from "api/repositories/partners/model/PartnersResponse";
import { RolesListResponse } from "api/repositories/rolesList/model/RolesListResponse";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export const userManagementFiltersAttributes = (
  partnerList: PartnersResponse[],
  roleList: RolesListResponse[],
  localStrings: typeof strings
) => {
  const defaultAttributes: FilterAttributes[] = [
    {
      colLg: 4,
      defaultValue: "",
      filterName: "userName",
      filterType: "input",
      labelName: localStrings.UserManagement.Columns.UserName,
      placeholder: localStrings.GlobalPlaceholder.UserName,
      options: [],
      prefixIcon: <UserOutlined className="pr-1" />,
    },
    {
      colLg: 4,
      defaultValue: "",
      filterName: "email",
      filterType: "input",
      labelName: localStrings.UserManagement.Columns.Email,
      placeholder: localStrings.GlobalPlaceholder.Email,
      options: [],
      prefixIcon: <MailOutlined className="pr-1" />,
    },
    {
      colLg: 4,
      defaultValue: "",
      filterName: "phone",
      filterType: "input",
      labelName: localStrings.UserManagement.Columns.Phone,
      placeholder: localStrings.GlobalPlaceholder.Phone,
      options: [],
      prefixIcon: <PhoneOutlined className="pr-1" />,
    },
    {
      colLg: 4,
      defaultValue: localStrings.GlobalLabels.All,
      filterName: "partner",
      filterType: "select",
      labelName: localStrings.UserManagement.Columns.Partner,
      placeholder: "",
      options: partnerList?.map((item) => {
        return {
          label: item?.name[0]?.toUpperCase() + item?.name?.slice(1),
          value: item?.id,
        };
      }),
    },
    {
      colLg: 4,
      defaultValue: localStrings.GlobalLabels.All,
      filterName: "roles",
      filterType: "select",
      labelName: localStrings.UserManagement.Columns.Role,
      placeholder: "",
      options: roleList?.map((item) => {
        return {
          label: item?.name[0]?.toUpperCase() + item?.name?.slice(1),
          value: item?.code,
        };
      }),
    },
    {
      colLg: 4,
      defaultValue: localStrings.GlobalLabels.All,
      filterName: "status",
      filterType: "select",
      labelName: localStrings.GlobalLabels.Status,
      placeholder: "",
      options: [
        {
          label: localStrings.GlobalLabels.All,
          value: -1,
        },
        {
          label: localStrings.GlobalLabels.Active,
          value: 0,
        },
        {
          label: localStrings.GlobalLabels.Inactive,
          value: 1,
        },
        {
          label: localStrings.GlobalLabels.Deleted,
          value: 2,
        },
      ],
    },
  ];

  return defaultAttributes;
};
