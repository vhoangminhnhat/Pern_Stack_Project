import {
  BookOutlined,
  FileSearchOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FormInstance } from "antd";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export const PackagesRegistrationFilterAttributes = (
  filterForm: FormInstance<any>,
  localStrings: typeof strings
) => {
  return [
    {
      colLg: 8,
      defaultValue: "",
      filterName: "phone",
      filterType: "input",
      labelName: localStrings.RoamingRegistration.Phone,
      options: [],
      placeholder: localStrings.GlobalPlaceholder.Phone,
      prefixIcon: <PhoneOutlined />,
    },
    {
      colLg: 8,
      defaultValue: "",
      filterName: "code",
      filterType: "input",
      labelName: localStrings.RoamingRegistration.Columns.Code,
      options: [],
      placeholder: localStrings.GlobalPlaceholder.Code,
      prefixIcon: <FileSearchOutlined />,
    },
    {
      colLg: 8,
      defaultValue: localStrings.GlobalLabels.All,
      filterName: "category",
      filterType: "select",
      labelName: localStrings.RoamingRegistration.Columns.Type,
      options: [
        {
          label: localStrings.GlobalLabels.All,
          value: localStrings.GlobalLabels.All,
        },
        {
          label: localStrings.TopupManagement.Category.Hot,
          value: "MD_hot",
        },
        {
          label: localStrings.TopupManagement.Category.Day,
          value: "MD_day",
        },
        {
          label: localStrings.TopupManagement.Category.Week,
          value: "MD_week",
        },
        {
          label: localStrings.TopupManagement.Category.Month,
          value: "MD_month",
        },
        {
          label: localStrings.RoamingManagement.Category.Roaming,
          value: "MD_roaming",
        },
      ],
      placeholder: localStrings.RoamingManagement.PlaceHolder.Category,
      prefixIcon: <BookOutlined />,
    },
  ] as FilterAttributes[];
};

export const RoamingRegisteredListAttributes = (
  list: TopupResponseModel[],
  localStrings: typeof strings
) => {
  return [
    {
      colLg: 8,
      defaultValue: "",
      filterName: "fullName",
      filterType: "input",
      labelName:
        localStrings.RoamingRegistration.PhoneRegisteredListColumns.Name,
      options: [],
      placeholder: localStrings.GlobalPlaceholder.Name,
      prefixIcon: <UserOutlined />,
    },
    {
      colLg: 8,
      defaultValue: "",
      filterName: "phone",
      filterType: "input",
      labelName:
        localStrings.RoamingRegistration.PhoneRegisteredListColumns.Phone,
      options: [],
      placeholder: localStrings.GlobalPlaceholder.Phone,
      prefixIcon: <PhoneOutlined />,
    },
    {
      colLg: 8,
      defaultValue: localStrings.GlobalLabels.All,
      filterName: "packageName",
      filterType: "select",
      labelName: localStrings.RoamingRegistration.Columns.Name,
      options: [
        ...list?.map((item) => {
          return {
            label: item?.name,
            value: item?.code,
          };
        }),
      ],
      placeholder: localStrings.GlobalPlaceholder.Name,
      prefixIcon: <PhoneOutlined />,
    },
  ] as FilterAttributes[];
};
