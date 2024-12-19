import { FileOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { CreateRoamingRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/createActions/CreateRoamingRequestModel";
import { RoamingManagementResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { MultiSelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import moment from "moment";
import RoamingConstantsViewModel from "pages/roamingManagement/viewmodel/RoamingConstantsViewModel";
import { FaCity, FaHotjar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { MdToday } from "react-icons/md";
import { PiNumberCircleSevenFill } from "react-icons/pi";
import { strings } from "utils/localizedStrings";

const RoamingManagementConstants = (localStrings: typeof strings) => {
  const { countryList, partnerList } = RoamingConstantsViewModel();

  const regionList = [
    {
      label: localStrings.CountryManagement.Regions.NorthAmerica,
      value: "Bắc Mỹ",
    },
    {
      label: localStrings.CountryManagement.Regions.SouthAmerica,
      value: "Nam Mỹ",
    },
    {
      label: localStrings.CountryManagement.Regions.Asia,
      value: "Châu Á",
    },
    {
      label: localStrings.CountryManagement.Regions.Europe,
      value: "Châu Âu",
    },
    {
      label: localStrings.CountryManagement.Regions.Africa,
      value: "Châu Phi",
    },
    {
      label: localStrings.CountryManagement.Regions.Australia,
      value: "Châu Đại Dương",
    },
    {
      label: localStrings.CountryManagement.Regions.Asean,
      value: "Đông Nam Á",
    },
  ];

  const Category = [
    { lable: localStrings.TopupManagement.Category.Day, value: "MD_day" },
    { lable: localStrings.TopupManagement.Category.Week, value: "MD_week" },
    { lable: localStrings.TopupManagement.Category.Month, value: "MD_month" },
    { lable: localStrings.TopupManagement.Category.Hot, value: "MD_hot" },
    { lable: localStrings.GlobalLabels.All, value: "MD_roaming" },
  ];
  const countryNameOptions = countryList.map((country) => ({
    label: country?.name,
    value: country?.code,
  }));
  return {
    tableColumns: [
      {
        title: localStrings.RoamingManagement.Columns.Name,
        key: "roamingName",
        dataIndex: "name",
        align: "center",
        width: "9%",
      },
      {
        title: localStrings.RoamingManagement.Columns.Code,
        key: "roamingCode",
        dataIndex: "code",
        align: "center",
        width: "10%",
      },
      {
        title: `${localStrings.RoamingManagement.Columns.Duration}(${localStrings.GlobalLabels.Date})`,
        key: "roamingDuration",
        dataIndex: "durationDay",
        align: "center",
        render: (text) => <span className="font-medium">{text}</span>,
      },
      {
        title: localStrings.RoamingManagement.Columns.Storage,
        key: "roamingStorage",
        dataIndex: "storage",
        align: "center",
        width: "8%",
        render: (text) => <span className="font-medium">{text} GB</span>,
      },
      {
        title: localStrings.RoamingManagement.Columns.Price,
        key: "topupPrice",
        dataIndex: "price",
        width: "11%",
        align: "center",
        render: (text) => (
          <span className="text-green-500 font-medium">
            {new Intl.NumberFormat().format(parseInt(text as string))} VND
          </span>
        ),
      },
      {
        title: localStrings.GlobalLabels.createdAt,
        key: "roamingCreated",
        dataIndex: "createdAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: localStrings.GlobalLabels.updatedAt,
        key: "roamingUpdated",
        dataIndex: "updatedAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
    ] as ColumnsType<RoamingManagementResponseModel>,

    filterAttributes: [
      {
        colLg: 6,
        defaultValue: "",
        filterName: "code",
        filterType: "input",
        labelName: localStrings.RoamingManagement.Columns.Code,
        placeholder: localStrings.GlobalPlaceholder.Code,
        prefixIcon: <FileOutlined className="pr-1" />,
      },
      {
        colLg: 6,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "category",
        filterType: "select",
        labelName: localStrings.RoamingManagement.Columns.Category,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          {
            label: localStrings.RoamingManagement.Category.Hot,
            value: "MD_hot",
          },
          {
            label: localStrings.RoamingManagement.Category.Day,
            value: "MD_day",
          },
          {
            label: localStrings.RoamingManagement.Category.Week,
            value: "MD_week",
          },
          {
            label: localStrings.RoamingManagement.Category.Month,
            value: "MD_month",
          },
          {
            label: localStrings.RoamingManagement.Category.Roaming,
            value: "MD_roaming",
          },
        ],
      },
      {
        colLg: 6,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "country",
        filterType: "select",
        labelName: localStrings.RoamingManagement.Columns.Country,
        options: [
          {
            label: localStrings.GlobalLabels.All,
            value: localStrings.GlobalLabels.All,
          },
          ...countryNameOptions,
        ],
        placeholder: localStrings.RoamingManagement.Columns.Country,
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
    ] as FilterAttributes[],
    categoryOps: [
      {
        label: localStrings.RoamingManagement.Category.Hot,
        value: "MD_hot",
        emoji: <FaHotjar className="text-red-600" />,
      },
      {
        label: localStrings.RoamingManagement.Category.Day,
        value: "MD_day",
        emoji: <MdToday className="text-blue-600" />,
      },
      {
        label: localStrings.RoamingManagement.Category.Week,
        value: "MD_week",
        emoji: <PiNumberCircleSevenFill className="text-yellow-600" />,
      },
      {
        label: localStrings.RoamingManagement.Category.Month,
        value: "MD_month",
        emoji: <IoCalendarNumber className="text-green-600" />,
      },
      {
        label: localStrings.RoamingManagement.Category.Roaming,
        value: "MD_roaming",
        emoji: <IoCalendarNumber className="text-green-600" />,
      },
    ],
    actionAttributes: (info: CreateRoamingRequestModel) => {
      const defaultAttributes: ActionsComponentType<CreateRoamingRequestModel>[] =
        [
          {
            label: localStrings.RoamingManagement.Columns.Name,
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
            label: localStrings.RoamingManagement.Columns.Code,
            name: "code",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.GlobalPlaceholder.Code,
            },
            detailKey: "code",
            pointerEvents: false,
            placeholder: localStrings.GlobalPlaceholder.Code,
          },
          {
            label: localStrings.RoamingManagement.Columns.Cover,
            name: "cover",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "url",
              message: localStrings.RoamingManagement.PlaceHolder.Cover,
            },
            detailKey: "cover",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.Cover,
          },
          {
            label: localStrings.RoamingManagement.Columns.Description,
            name: "description",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.RoamingManagement.PlaceHolder.Descriptions,
            },
            detailKey: "description",
            pointerEvents: false,
            placeholder:
              localStrings.RoamingManagement.PlaceHolder.Descriptions,
          },
          {
            label: localStrings.RoamingManagement.Columns.ShortDescription,
            name: "shortDescription",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.RoamingManagement.PlaceHolder.ShortDes,
            },
            detailKey: "description",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.ShortDes,
          },
          {
            label: localStrings.RoamingManagement.Columns.Duration,
            name: "durationDay",
            type: "input-number",
            createFormRules: {
              stricted: true,
              type: "number",
              message: localStrings.RoamingManagement.PlaceHolder.Duration,
            },
            detailKey: "durationDay",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.Duration,
          },
          {
            label: localStrings.RoamingManagement.Columns.Price,
            name: "price",
            type: "input-number",
            initialVals: "1000",
            createFormRules: {
              stricted: true,
              type: "number",
              message: localStrings.RoamingManagement.PlaceHolder.Price,
            },
            detailKey: "price",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.Price,
          },
          {
            label: localStrings.RoamingManagement.Columns.Storage,
            name: "storage",
            type: "input-number",
            initialVals: "0",
            createFormRules: {
              stricted: true,
              type: "number",
              message: localStrings.RoamingManagement.PlaceHolder.Storage,
            },
            detailKey: "storage",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.Storage,
          },
          {
            label: localStrings.RoamingManagement.Columns.DiscountRate,
            name: "discountRate",
            type: "input",
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.RoamingManagement.PlaceHolder.DiscountRate,
            },
            detailKey: "discountRate",
            pointerEvents: false,
            placeholder:
              localStrings.RoamingManagement.PlaceHolder.DiscountRate,
          },
          {
            label: localStrings.RoamingManagement.Columns.InternalCallTotalHour,
            name: "internalCallTotalHour",
            type: "input-number",
            initialVals: "0",
            createFormRules: {
              stricted: true,
              type: "number",
              message:
                localStrings.RoamingManagement.PlaceHolder
                  .InternalCallTotalHour,
            },
            detailKey: "internalCallTotalHour",
            pointerEvents: false,
            placeholder:
              localStrings.RoamingManagement.PlaceHolder.InternalCallTotalHour,
          },
          {
            label: localStrings.RoamingManagement.Columns.ExternalCallTotalHour,
            name: "externalCallTotalHour",
            type: "input-number",
            initialVals: "0",
            createFormRules: {
              stricted: true,
              type: "number",
              message:
                localStrings.RoamingManagement.PlaceHolder
                  .ExternalCallTotalHour,
            },
            detailKey: "externalCallTotalHour",
            pointerEvents: false,
            placeholder:
              localStrings.RoamingManagement.PlaceHolder.ExternalCallTotalHour,
          },
          {
            label: localStrings.RoamingManagement.Columns.Category,
            name: "categories",
            type: "multi-select",
            createFormRules: {
              stricted: true,
              type: "multi-select",
              message: localStrings.RoamingManagement.PlaceHolder.Category,
            },
            detailKey: "categories",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.PlaceHolder.Category,
            options: Category?.map((item) => {
              return {
                label: item?.lable.toUpperCase(),
                value: item?.value,
              };
            }) as unknown as MultiSelectOps[],
          },
          {
            label: localStrings.RoamingManagement.Columns.Country,
            name: "countries",
            type: "dynamic-form",
            countries: countryList,
            roamingPartners: partnerList,
            createFormRules: {
              stricted: true,
              type: "dynamic-form",
              message: localStrings.RoamingManagement.Columns.Country,
            },
            detailKey: "countries",
            pointerEvents: false,
            placeholder: localStrings.RoamingManagement.Columns.Country,
          },
        ];
      return defaultAttributes;
    },
  };
};

export default RoamingManagementConstants;
