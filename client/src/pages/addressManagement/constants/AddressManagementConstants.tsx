import { FileOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { AdministrativeRegionsResponseModel } from "api/repositories/address/administrativeRegions/AdministrativeRegionsResponseModel";
import { AdministrativeUnitResponseModel } from "api/repositories/address/administrativeUnit/AdministrativeUnitResponseModel";
import { DistrictDetailResponseModel } from "api/repositories/address/district/model/detail/DistrictDetailResponseModel";
import { DistrictListResponseModel } from "api/repositories/address/district/model/DistrictListResponseModel";
import { ProvinceDetailResponseModel } from "api/repositories/address/province/model/detail/ProvinceDetailResponseModel";
import { ProvinceListResponseModel } from "api/repositories/address/province/model/ProvinceListResponseModel";
import { WardDetailResponseModel } from "api/repositories/address/ward/model/detail/WardDetailResponseModel";
import { WardListResponseModel } from "api/repositories/address/ward/model/WardListResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { isEmpty } from "lodash";
import { strings } from "utils/localizedStrings";

export const addressManagementConstants = {
  renderColumns: <
    T extends
      | ProvinceListResponseModel
      | DistrictListResponseModel
      | WardListResponseModel
  >(
    dataType: "province" | "district" | "ward",
    regions: AdministrativeRegionsResponseModel[],
    units: AdministrativeUnitResponseModel[],
    localStrings: typeof strings
  ) => {
    const general = [
      {
        title: localStrings.AddressManagement.Columns.Name,
        dataIndex: "name",
        key: `${dataType}Name`,
        align: "center",
      },
      {
        title: localStrings.AddressManagement.Columns.Code,
        dataIndex: "code",
        key: `${dataType}Code`,
        align: "center",
      },
      {
        title: localStrings.AddressManagement.Columns.FullName,
        dataIndex: "fullName",
        key: `${dataType}fullName`,
        align: "center",
      },
      {
        title: localStrings.AddressManagement.Columns.FullNameEn,
        dataIndex: "fullNameEn",
        key: `${dataType}fullNameEn`,
        align: "center",
      },
      {
        title: "Code Name",
        dataIndex: "codeName",
        key: `${dataType}codeName`,
        align: "center",
      },
      {
        title: localStrings.GlobalLabels.Type,
        dataIndex: "administrativeUnitId",
        key: `${dataType}AdministrativeUnitId`,
        align: "center",
        render: (value) =>
          units
            ?.filter((item) => item?.id === value)
            ?.map((data) => data?.fullName)[0],
      },
    ] as ColumnsType<T>;

    return general;
  },
  filters: (
    dataType: "province" | "district" | "ward",
    units: AdministrativeUnitResponseModel[],
    regions: AdministrativeRegionsResponseModel[],
    localStrings: typeof strings
  ) => {
    const defaultFilters = [
      {
        colLg: dataType === "province" ? 6 : dataType === "district" ? 6 : 4,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.AddressManagement.Columns.Name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <FileOutlined className="pr-1" />,
      },
      {
        colLg: dataType === "province" ? 6 : dataType === "district" ? 6 : 4,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "administrativeUnitId",
        filterType: "select",
        labelName: localStrings.GlobalLabels.Type,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          ...units?.map((item) => {
            return {
              label: item?.fullName,
              value: item?.id,
            };
          }),
        ],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <FileOutlined className="pr-1" />,
      },
      {
        colLg: dataType === "province" ? 6 : dataType === "district" ? 6 : 4,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "administrativeRegionId",
        filterType: "select",
        labelName: localStrings.GlobalLabels.Regions,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          ...regions?.map((item) => {
            return {
              label: item?.name,
              value: item?.id,
            };
          }),
        ],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <FileOutlined className="pr-1" />,
      },
    ] as FilterAttributes[];

    return dataType === "province"
      ? defaultFilters
      : defaultFilters?.slice(0, -1);
  },

  actionFilters: <
    T extends
      | ProvinceDetailResponseModel
      | DistrictDetailResponseModel
      | WardDetailResponseModel
  >(
    localStrings: typeof strings,
    detailInfo:
      | ProvinceDetailResponseModel
      | DistrictDetailResponseModel
      | WardDetailResponseModel
  ) => {
    const defaultAttributes: ActionsComponentType<T>[] = [
      {
        colLg: 12,
        label: localStrings.AddressManagement.Columns.Name,
        name: "name",
        detailKey: "name",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Name,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          message: localStrings.GlobalPlaceholder.Name,
          type: "string",
        },
      },
      {
        colLg: 12,
        label: localStrings.AddressManagement.Columns.Code,
        name: "code",
        detailKey: "code",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Code,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          message: localStrings.GlobalPlaceholder.Code,
          type: "string",
        },
      },
      {
        colLg: 12,
        label: localStrings.AddressManagement.Columns.FullName,
        name: "fullName",
        detailKey: "fullName",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Name,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.Name,
        },
      },
      {
        colLg: 12,
        label: localStrings.AddressManagement.Columns.NameEn,
        name: "nameEn",
        detailKey: "nameEn",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Name,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.Name,
        },
      },
      {
        colLg: 12,
        label: localStrings.AddressManagement.Columns.FullNameEn,
        name: "fullNameEn",
        detailKey: "fullNameEn",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Name,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.Name,
        },
      },
      {
        colLg: 12,
        label: "Code Name",
        name: "codeName",
        detailKey: "codeName",
        type: "input",
        placeholder: localStrings.GlobalPlaceholder.Name,
        pointerEvents: false,
        createFormRules: {
          stricted: true,
          type: "string",
          message: localStrings.GlobalPlaceholder.Name,
        },
      },
    ];

    const idAttributes: ActionsComponentType<T>[] = [
      {
        colLg: 12,
        label: "ID",
        name: "id",
        detailKey: "id",
        type: "input",
        placeholder: "",
        pointerEvents: true,
        createFormRules: {
          stricted: true,
          message: "",
          type: "string",
        },
      },
    ];

    return !isEmpty(detailInfo)
      ? new Array<ActionsComponentType<T>>()?.concat(
          ...idAttributes,
          ...defaultAttributes
        )
      : defaultAttributes;
  },
};
