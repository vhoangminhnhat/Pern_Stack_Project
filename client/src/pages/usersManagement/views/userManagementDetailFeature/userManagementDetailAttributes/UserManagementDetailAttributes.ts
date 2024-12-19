import { UserOutlined } from "@ant-design/icons";
import { PartnersResponse } from "api/repositories/partners/model/PartnersResponse";
import { RolesListResponse } from "api/repositories/rolesList/model/RolesListResponse";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { isEmpty } from "lodash";
import { strings } from "utils/localizedStrings";

export const userManagementDetailAttributes = (
  partnerList: PartnersResponse[],
  roleList: RolesListResponse[],
  detailInfo: UserManagementResponseModel,
  selectedRole: string | undefined,
  setRole: (role: string) => void,
  localStrings: typeof strings
) => {
  const getPartnerList = (role: string) => {
    return partnerList
      ?.filter((item) =>
        role === "partner" ||
        (!isEmpty(detailInfo?.partner) && role === undefined)
          ? item?.name !== localStrings.GlobalLabels.All &&
            item?.name !== localStrings.GlobalLabels.NoPartner
          : item?.name === localStrings.GlobalLabels.NoPartner
      )
      ?.map((item) => {
        return {
          label: item?.name[0]?.toUpperCase() + item?.name?.slice(1),
          value: item?.id,
        };
      });
  };

  const attributes: ActionsComponentType<UserManagementResponseModel>[] = [
    {
      label: localStrings.UserManagement.Columns.UserName,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.GlobalPlaceholder.UserName,
      },
      name: "userName",
      detailKey: "userName",
      placeholder: localStrings.GlobalPlaceholder.UserName,
      pointerEvents: false,
      type: "input",
      icon: typeof UserOutlined,
    },
    {
      label: localStrings.UserManagement.Columns.Email,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.GlobalPlaceholder.Email,
      },
      name: "email",
      placeholder: localStrings.GlobalPlaceholder.Email,
      detailKey: "email",
      pointerEvents: false,
      type: "input",
    },
    {
      label: localStrings.UserManagement.Columns.FullName,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.UserManagement.RuleMessage.Name,
      },
      name: "fullName",
      placeholder: localStrings.GlobalPlaceholder.Name,
      detailKey: "fullName",
      pointerEvents: false,
      type: "input",
    },
    {
      label: localStrings.UserManagement.Columns.Phone,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.GlobalPlaceholder.Phone,
      },
      name: "phone",
      detailKey: "phone",
      placeholder: localStrings.GlobalPlaceholder.Phone,
      pointerEvents: isEmpty(detailInfo) ? false : true,
      type: "input",
    },
    {
      label: localStrings.UserManagement.Columns.Role,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.UserManagement.RuleMessage.Role,
      },
      detailKey: "roles",
      name: "roles",
      placeholder: localStrings.UserManagement.RuleMessage.Role,
      pointerEvents: false,
      type: "select",
      initialVals: !isEmpty(detailInfo?.roles)
        ? detailInfo?.roles[0]?.name[0]?.toUpperCase() +
          detailInfo?.roles[0]?.name?.slice(1)
        : undefined,
      options: roleList?.map((item) => {
        return {
          label: item?.name[0]?.toUpperCase() + item?.name?.slice(1),
          value: item?.code,
        };
      }),
      onChange: (value: string) => {
        setRole(value);
        getPartnerList(value);
      },
    },
    {
      label: localStrings.UserManagement.Columns.Partner,
      createFormRules: {
        stricted: selectedRole === "partner",
        type: "string",
        message: localStrings.UserManagement.RuleMessage.Partner,
      },
      name: "partner",
      initialVals:
        !isEmpty(detailInfo?.partner) || selectedRole === "partner"
          ? detailInfo?.partner?.name[0]?.toUpperCase() +
            detailInfo?.partner?.name?.slice(1)
          : localStrings.GlobalLabels.NoPartner,
      placeholder: localStrings.UserManagement.RuleMessage.Partner,
      pointerEvents: false,
      type: "select",
      options: getPartnerList(selectedRole),
    },
    {
      label: localStrings.GlobalLabels.Status,
      createFormRules: {
        stricted: true,
        type: "number",
        message: localStrings.GlobalPlaceholder.Status,
      },
      detailKey: "status",
      name: "status",
      placeholder: localStrings.UserManagement.RuleMessage.Status,
      pointerEvents: false,
      type: "select",
      options: [
        {
          label: localStrings.GlobalLabels.Active,
          value: 0,
        },
        {
          label: localStrings.GlobalLabels.Inactive,
          value: 1,
        },
      ],
    },
    {
      label: localStrings.GlobalLabels.Address,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.GlobalLabels.Address,
      },
      name: "address",
      placeholder: localStrings.GlobalLabels.Address,
      pointerEvents: false,
      detailKey: "address",
      type: "text-area",
    },
    {
      label: localStrings.GlobalLabels.Description,
      createFormRules: { stricted: false, type: "string", message: "" },
      name: "description",
      placeholder: localStrings.GlobalLabels.Description,
      pointerEvents: false,
      type: "text-area",
      detailKey: "description",
    },
  ];

  const passwordAttributes: typeof attributes = [
    {
      label: localStrings.GlobalLabels.Password,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.UserManagement.RuleMessage.Password,
      },
      name: "password",
      placeholder: localStrings.UserManagement.RuleMessage.Password,
      pointerEvents: false,
      type: "password",
    },
  ];

  return isEmpty(detailInfo)
    ? attributes?.slice(0, 1).concat(passwordAttributes, attributes?.slice(1))
    : attributes;
};
