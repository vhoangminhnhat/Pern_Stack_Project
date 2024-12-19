import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { strings } from "utils/localizedStrings";

export const UserManagementResetPassAttributes = (
  detailInfo: UserManagementResponseModel,
  localStrings: typeof strings
) => {
  const defaultAttributes: ActionsComponentType<UserManagementResponseModel>[] =
    [
      {
        label: localStrings.UserManagement.Columns.Email,
        createFormRules: { stricted: false, type: "string", message: "" },
        name: "email",
        detailKey: "email",
        placeholder: "",
        pointerEvents: true,
        type: "input",
      },
      {
        label: localStrings.UserManagement.Columns.Phone,
        createFormRules: { stricted: false, type: "string", message: "" },
        name: "phone",
        detailKey: "phone",
        placeholder: "",
        pointerEvents: true,
        type: "input",
      },
      {
        label: localStrings.UserManagement.Columns.NewPass,
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.UserManagement.RuleMessage.Password,
        },
        name: "newPassword",
        placeholder: localStrings.UserManagement.RuleMessage.Password,
        pointerEvents: false,
        type: "password",
      },
    ];

  return defaultAttributes;
};
