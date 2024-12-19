import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { TravelSimResponseModel } from "api/repositories/travelSim/model/TravelSimResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import dayjs from "dayjs";
import { renderPhoneWithDialCode } from "utils/helpersInTs/GetCountryByDialCode";
import { strings } from "utils/localizedStrings";

export const statusOption = (localStrings: typeof strings) => {
  return [
    { label: localStrings.GlobalLabels.All, value: "", color: "" },
    {
      label: localStrings.TravelSimListManagement.Status.init,
      value: 0,
      color: "orange",
    },
    {
      label: localStrings.TravelSimListManagement.Status.progress,
      value: 1,
      color: "blue",
    },
    {
      label: localStrings.TravelSimListManagement.Status.success,
      value: 2,
      color: "green",
    },
    {
      label: localStrings.TravelSimListManagement.Status.error,
      value: 3,
      color: "red",
    },
    {
      label: localStrings.TravelSimListManagement.Status.verified,
      value: 4,
      color: "brown",
    },
    {
      label: localStrings.TravelSimListManagement.Status.isOCR,
      value: 5,
      color: "purple",
    },
  ];
};

export const typeOption = (localStrings: typeof strings) => {
  return [
    { label: localStrings.GlobalLabels.All, value: "" },
    { label: localStrings.TravelSimListManagement.Type.cccd, value: "cccd" },
    {
      label: localStrings.TravelSimListManagement.Type.passport,
      value: "passport",
    },
  ];
};

export const TravelSimConstants = (localStrings: typeof strings) => {
  return {
    uploadProps: {
      format: "file",
      accept: ".jpg, .jpeg, .png",
      multiple: false,
      beforeUpload() {
        return false;
      },
    },
    mainColumns: [
      {
        title: localStrings.TravelSimListManagement.Labels.ProfileId,
        dataIndex: "profileId",
        key: "profileId",
        align: "center",
        width: "10%",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.Name,
        dataIndex: "name",
        key: "name",
        align: "center",
        width: "10%",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.Sim,
        dataIndex: "sim",
        key: "sim",
        align: "center",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.Serial,
        dataIndex: "serial",
        key: "serial",
        align: "center",
        width: "12%",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.IdNumber,
        dataIndex: "idNumber",
        key: "idNumber",
        align: "center",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.EmailContact,
        dataIndex: "emailContact",
        key: "emailContact",
        align: "center",
        width: "17%",
      },
      {
        title: localStrings.TravelSimListManagement.Labels.PhoneContact,
        dataIndex: "phoneContact",
        key: "phoneContact",
        align: "center",
        width: "15%",
        render: (text, record) =>
          renderPhoneWithDialCode(text, record?.dialCode || ""),
      },
      {
        title: localStrings.TravelSimListManagement.Labels.Status,
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (item) => (
          <span
            style={{
              color: statusOption(localStrings)?.find(
                (status) => status.value === item && status.value !== ""
              )?.color,
              fontWeight: "bold",
            }}
          >
            {
              statusOption(localStrings)?.find(
                (status) => status.value === item && status.value !== ""
              )?.label
            }
          </span>
        ),
      },
      {
        title: localStrings.TravelSimListManagement.Labels.Time,
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center",
        render: (item) => dayjs(item).format("DD-MM-YYYY HH:mm:ss"),
      },
    ] as ColumnsType<TravelSimResponseModel>,

    filterAttributes: [
      {
        colLg: 2,
        defaultValue: "",
        filterName: "status",
        filterType: "select",
        labelName: localStrings.TravelSimListManagement.Labels.Status,
        options: statusOption(localStrings),
      },
      {
        colLg: 2,
        defaultValue: "",
        filterName: "sim",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.Sim,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.Sim.toLowerCase(),
      },
      {
        colLg: 3,
        defaultValue: "",
        filterName: "serial",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.Serial,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.Serial.toLowerCase(),
      },
      {
        colLg: 2,
        defaultValue: "",
        filterName: "profileId",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.ProfileId,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.ProfileId.toLowerCase(),
      },
      {
        colLg: 3,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.Name,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.Name.toLowerCase(),
      },
      {
        colLg: 3,
        defaultValue: "",
        filterName: "emailContact",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.EmailContact,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.EmailContact.toLowerCase(),
      },
      {
        colLg: 3,
        defaultValue: "",
        filterName: "phoneContact",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.PhoneContact,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.PhoneContact.toLowerCase(),
      },
      {
        colLg: 2,
        defaultValue: "",
        filterName: "idNumber",
        filterType: "input",
        labelName: localStrings.TravelSimListManagement.Labels.IdNumber,
        options: [],
        placeholder:
          localStrings.TravelSimListManagement.Placeholder +
          localStrings.TravelSimListManagement.Labels.IdNumber.toLowerCase(),
      },
      {
        colLg: 4,
        defaultRangeDay: [dayjs().subtract(12, "day"), dayjs()],
        filterName: "date",
        filterType: "range-date",
        labelName: localStrings.TravelSimListManagement.Labels.Time,
        options: [],
      },
    ] as FilterAttributes[],

    actionComponent: [
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.Name,
        name: "name",
        detailKey: "name",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.ProfileId,
        name: "profileId",
        detailKey: "profileId",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      {
        colLg: 8,
        label: localStrings.GlobalLabels.Type,
        name: "type",
        detailKey: "type",
        type: "select",
        options: [
          {
            label: localStrings.TravelSimListManagement.Type.passport,
            value: "passport",
          },
        ],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
        placeholder: localStrings.GlobalPlaceholder.Type,
      },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.EmailContact,
        name: "emailContact",
        detailKey: "emailContact",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "email",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      {
        colLg: 8,
        label: localStrings.GlobalLabels.Status,
        name: "status",
        detailKey: "status",
        type: "select",
        options: statusOption(localStrings)
          .filter((item) => item?.label !== localStrings.GlobalLabels.All)
          ?.map((child) => {
            return {
              label: child?.label,
              value: child?.value,
            };
          }),
        createFormRules: {
          stricted: true,
          type: "number",
          message: localStrings.GlobalPlaceholder.Status,
        },
        pointerEvents: true,
      },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.IdNumber,
        name: "idNumber",
        detailKey: "idNumber",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      // {
      //   colLg: 8,
      //   label: localStrings.TravelSimListManagement.Labels.PlaceOfOrigin,
      //   name: "placeOfOrigin",
      //   detailKey: "placeOfOrigin",
      //   type: "select",
      //   options: [],
      //   createFormRules: {
      //     stricted: true,
      //     type: "string",
      //     message: localStrings.GlobalPlaceholder.InvalidValue,
      //   },
      //   pointerEvents: false,
      // },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.Sim,
        name: "sim",
        detailKey: "sim",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.Serial,
        name: "serial",
        detailKey: "serial",
        type: "input",
        options: [],
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      {
        colLg: 8,
        label: localStrings.TravelSimListManagement.Labels.Sex,
        name: "sex",
        detailKey: "sex",
        type: "select",
        options: [
          {
            label: localStrings.TravelSimListManagement.Gender.Other,
            value: 2,
          },
          {
            label: localStrings.TravelSimListManagement.Gender.Male,
            value: 0,
          },
          {
            label: localStrings.TravelSimListManagement.Gender.Female,
            value: 1,
          },
        ],
        createFormRules: {
          stricted: true,
          type: "number",
          message: localStrings.GlobalPlaceholder.InvalidValue,
        },
        pointerEvents: false,
      },
      // {
      //   colLg: 8,
      //   label: localStrings.TravelSimListManagement.Labels.IssuePlace,
      //   name: "issuePlace",
      //   detailKey: "issuePlace",
      //   type: "input",
      //   options: [],
      //   createFormRules: {
      //     stricted: true,
      //     type: "string",
      //     message: localStrings.GlobalPlaceholder.InvalidValue,
      //   },
      //   pointerEvents: false,
      // },
    ] as ActionsComponentType<TravelSimResponseModel>[],

    downloadOptions: [
      {
        label: localStrings.GlobalLabels.All,
        value: localStrings.GlobalLabels.All,
      },
      {
        label: localStrings.TravelSimListManagement.ImagePaths.portrait,
        value: "portrait",
      },
      {
        label: localStrings.TravelSimListManagement.ImagePaths.front,
        value: "front",
      },
      {
        label: localStrings.TravelSimListManagement.ImagePaths.sim,
        value: "sim",
      },
      {
        label: localStrings.TravelSimListManagement.ImagePaths.videocall,
        value: "videocall",
      },
      {
        label: localStrings.TravelSimListManagement.ImagePaths.sign,
        value: "sign",
      },
    ] as SelectOps[],
  };
};

export const updateStatusComponent = (
  localStrings: typeof strings,
  profileId: string
) => {
  return [
    {
      label: localStrings.TravelSimListManagement.Labels.ProfileId,
      name: "profileId",
      type: "input",
      pointerEvents: true,
      colLg: 24,
      options: [],
      initialVals: profileId,
      createFormRules: { stricted: true, type: "string", message: "" },
      icon: <UserOutlined />,
    },
    {
      label: localStrings.GlobalLabels.Status,
      name: "status",
      type: "select",
      pointerEvents: false,
      colLg: 24,
      options: statusOption(localStrings)?.filter(
        (item) => item?.label !== localStrings.GlobalLabels.All
      ),
      detailKey: "status",
      createFormRules: {
        stricted: true,
        type: "number",
        message: localStrings.GlobalPlaceholder.InvalidValue,
      },
      placeholder: localStrings.GlobalPlaceholder.Status,
      icon: <InfoCircleOutlined />,
    },
    {
      label: localStrings.TravelSimListManagement.Labels.Reason,
      name: "reason",
      type: "text-area",
      pointerEvents: false,
      createFormRules: {
        stricted: true,
        type: "string",
        message: localStrings.GlobalPlaceholder.InvalidValue,
      },
      colLg: 24,
      options: [],
      placeholder: localStrings.GlobalPlaceholder.Description,
      icon: <UserOutlined />,
    },
  ] as ActionsComponentType<TravelSimResponseModel>[];
};
