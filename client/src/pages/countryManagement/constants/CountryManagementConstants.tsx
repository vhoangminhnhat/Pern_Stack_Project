import { FileOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { CountryListResponseModel } from "api/repositories/countryManagement/model/CountryListResponseModel";
import {
  CountryDetailResponseModel,
  MobileDataInfoModel,
  RoamingPartnerModel,
} from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import moment from "moment";
import { FaCity } from "react-icons/fa";
import { renderStatus } from "utils/helpersInTs/helpersInTs";
import { strings } from "utils/localizedStrings";

export const countryManagementConstants = (
  localStrings: typeof strings,
  regionList: SelectOps[]
) => {
  return {
    tableColumns: [
      {
        title: localStrings.CountryManagement.Columns.Name,
        key: "countryName",
        dataIndex: "name",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.Columns.Code,
        key: "countryCode",
        dataIndex: "code",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.Columns.Capital,
        key: "countryCap",
        dataIndex: "capital",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.Columns.Region,
        key: "countryRegion",
        dataIndex: "region",
        align: "center",
      },
      {
        title: localStrings.GlobalLabels.Status,
        key: "countryStatus",
        dataIndex: "active",
        align: "center",
        render: (text) => renderStatus(text as unknown as number, localStrings),
      },
      {
        title: localStrings.GlobalLabels.createdAt,
        key: "countryCreated",
        dataIndex: "createdAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: localStrings.GlobalLabels.updatedAt,
        key: "countryUpdated",
        dataIndex: "updatedAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
    ] as ColumnsType<CountryListResponseModel>,
    roamingPartner: [
      {
        title: localStrings.CountryManagement.RoamingPartner.Name,
        key: "roamingPartnerName",
        dataIndex: "name",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.RoamingPartner.Code,
        key: "roamingPartnerCode",
        dataIndex: "code",
        align: "center",
      },
    ] as ColumnsType<RoamingPartnerModel>,
    mobileDataColumns: [
      {
        title: localStrings.CountryManagement.MobileData.Name,
        key: "mobileName",
        dataIndex: "name",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.MobileData.Code,
        key: "mobileCode",
        dataIndex: "code",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.MobileData.Price,
        key: "mobilePrice",
        dataIndex: "price",
        align: "center",
        render: (text) =>
          new Intl.NumberFormat().format(parseInt(text as string)),
      },
      {
        title: localStrings.CountryManagement.MobileData.Handset,
        key: "handSet",
        dataIndex: "handSet",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.MobileData.TransferredData,
        key: "mobileTransferred",
        dataIndex: "transferredAccountDataInterchangeGroup",
        align: "center",
      },
      {
        title: localStrings.CountryManagement.MobileData.CodeMobileDevice,
        key: "mobileCodeMobile",
        dataIndex: "codeMobileDevice",
        align: "center",
      },
    ] as ColumnsType<MobileDataInfoModel>,
    filterAttributes: [
      {
        colLg: 6,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.CountryManagement.Columns.Name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <FileOutlined className="pr-1" />,
      },
      {
        colLg: 6,
        defaultValue: "",
        filterName: "capital",
        filterType: "input",
        labelName: localStrings.CountryManagement.Columns.Capital,
        options: [],
        placeholder: localStrings.CountryManagement.Columns.Capital,
        prefixIcon: <FaCity className="pr-1" />,
      },
      {
        colLg: 6,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "region",
        filterType: "select",
        labelName: localStrings.CountryManagement.Columns.Region,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          ...regionList,
        ],
      },
      {
        colLg: 6,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "active",
        filterType: "select",
        labelName: localStrings.GlobalLabels.Status,
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
        ],
      },
    ] as FilterAttributes[],
    actionAttributes: (info: CountryDetailResponseModel) => {
      const defaultAttributes: ActionsComponentType<CountryDetailResponseModel>[] =
        [
          {
            label: localStrings.CountryManagement.Columns.Name,
            name: "name",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.GlobalPlaceholder.Name,
            },
            detailKey: "name",
            pointerEvents: false,
            placeholder: localStrings.GlobalPlaceholder.Name,
          },
          {
            label: localStrings.CountryManagement.Columns.Code,
            name: "code",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.GlobalPlaceholder.Code,
            },
            detailKey: "code",
            pointerEvents: false,
            placeholder: localStrings.GlobalPlaceholder.Name,
          },
          {
            label: localStrings.CountryManagement.Columns.Capital,
            name: "capital",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.CountryManagement.Placeholder.Capital,
            },
            detailKey: "capital",
            pointerEvents: false,
            placeholder: localStrings.CountryManagement.Placeholder.Capital,
          },
          {
            label: localStrings.CountryManagement.Columns.Region,
            name: "region",
            type: "select",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.CountryManagement.Placeholder.Region,
            },
            detailKey: "region",
            pointerEvents: false,
            placeholder: localStrings.CountryManagement.Placeholder.Region,
            options: regionList?.filter(
              (item) => item?.value !== localStrings.GlobalLabels.All
            ),
          },
          {
            label: localStrings.GlobalLabels.Status,
            name: "active",
            type: "select",
            createFormRules: {
              stricted: true,
              type: "number",
              message: localStrings.GlobalPlaceholder.Status,
            },
            detailKey: "active",
            pointerEvents: false,
            placeholder: localStrings.GlobalPlaceholder.Status,
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
        ];

      const IdAttribute: typeof defaultAttributes = [
        {
          label: "ID",
          name: "id",
          type: "input",
          createFormRules: {
            stricted: true,
            type: "string",
            message: localStrings.GlobalPlaceholder.Name,
          },
          detailKey: "id",
          pointerEvents: true,
        },
      ];

      return !info?.id
        ? defaultAttributes
        : new Array<ActionsComponentType<CountryDetailResponseModel>>().concat(
            ...IdAttribute,
            ...defaultAttributes
          );
    },
    uploadProps: {
      format: "file",
      accept: ".jpg, .jpeg, .png",
      multiple: false,
      beforeUpload() {
        return false;
      },
    },
  };
};
