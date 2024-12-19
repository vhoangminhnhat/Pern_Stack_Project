import { SnippetsOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  TopupCategoryResponseModel,
  TopupResponseModel,
} from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { FaHotjar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { MdToday } from "react-icons/md";
import { PiNumberCircleSevenFill } from "react-icons/pi";
import { renderDuration, renderStatus } from "utils/helpersInTs/helpersInTs";
import { strings } from "utils/localizedStrings";

export const topupManagementConstants = (
  setOrderSorted: Dispatch<SetStateAction<boolean | string>>,
  orderSorted: string | boolean,
  localStrings: typeof strings,
  language: string
) => {
  return {
    renderCategory: (value: string) => {
      switch (value) {
        case "MD_hot":
          return localStrings.TopupManagement.Category.Hot;
        case "MD_day":
          return localStrings.TopupManagement.Category.Day;
        case "MD_week":
          return localStrings.TopupManagement.Category.Week;
        case "MD_month":
          return localStrings.TopupManagement.Category.Month;
      }
    },
    mainColumns: [
      {
        title: localStrings.TopupManagement.Columns.Name,
        key: "topupName",
        dataIndex: "name",
        align: "center",
        width: "9%",
      },
      {
        title: localStrings.TopupManagement.Columns.Code,
        key: "topupCode",
        dataIndex: "code",
        align: "center",
        width: "10%",
      },
      {
        title: localStrings.TopupManagement.Columns.DurationDay,
        key: "topupDuration",
        dataIndex: "durationDay",
        align: "center",
        render: (text) => (
          <span className="font-medium">
            {renderDuration(language, text, localStrings)}
          </span>
        ),
      },
      {
        title: localStrings.TopupManagement.Columns.Storage,
        key: "topupStorage",
        dataIndex: "storage",
        align: "center",
        render: (text) => (
          <span className="medium">
            {text < 1 ? `${Math.round(text * 1024)} MB` : `${text} GB`}
          </span>
        ),
      },
      {
        title: localStrings.TopupManagement.Columns.Price,
        key: "topupPrice",
        dataIndex: "price",
        width: "8%",
        align: "center",
        render: (text) => (
          <span className="text-green-500 font-medium">
            {new Intl.NumberFormat().format(parseInt(text as string))}
          </span>
        ),
      },
      {
        title: localStrings.TopupManagement.Columns.Category,
        key: "topupCategory",
        dataIndex: "categories",
        align: "center",
        render: (record: TopupCategoryResponseModel[]) => (
          <div className="flex flex-row gap-2 items-center justify-center">
            {record?.map((item) => {
              return (
                <Tag>
                  {topupManagementConstants(
                    setOrderSorted,
                    orderSorted,
                    localStrings,
                    language
                  ).renderCategory(item?.code)}
                </Tag>
              );
            })}
          </div>
        ),
      },
      {
        title: localStrings.TopupManagement.Columns.Order,
        key: "topupOrder",
        dataIndex: "order",
        align: "center",
        sorter: (a, b) => a?.order - b?.order,
      },
      {
        title: localStrings.GlobalLabels.Status,
        key: "topupStatus",
        dataIndex: "status",
        align: "center",
        render: (text) => renderStatus(text as number, localStrings),
      },
      {
        title: localStrings.GlobalLabels.createdAt,
        key: "topupCreated",
        dataIndex: "createdAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: localStrings.GlobalLabels.updatedAt,
        key: "topupCreated",
        dataIndex: "updatedAt",
        align: "center",
        render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      },
    ] as ColumnsType<TopupResponseModel>,
    //Filters
    topupFilters: [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.TopupManagement.Columns.Name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
        prefixIcon: <SnippetsOutlined className="pr-1" />,
      },
      {
        colLg: 8,
        defaultValue: -1,
        filterName: "status",
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
      {
        colLg: 8,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "category",
        filterType: "select",
        labelName: localStrings.TopupManagement.Columns.Category,
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
        ],
      },
      // {
      //   colLg: 6,
      //   defaultValue: localStrings.GlobalLabels.NoSort,
      //   filterName: "order",
      //   filterType: "select",
      //   labelName: localStrings.TopupManagement.Columns.Order,
      //   options: [
      //     {
      //       label: localStrings.GlobalLabels.NoSort,
      //       value: localStrings.GlobalLabels.NoSort,
      //     },
      //     {
      //       label: localStrings.GlobalLabels.ASC,
      //       value: "order ASC",
      //     },
      //     {
      //       label: localStrings.GlobalLabels.DESC,
      //       value: "order DESC",
      //     },
      //   ],
      // },
    ] as FilterAttributes[],
    //Category Options Rendering
    categoryOps: [
      {
        label: localStrings.TopupManagement.Category.Hot,
        value: "MD_hot",
        emoji: <FaHotjar className="text-red-600" />,
      },
      {
        label: localStrings.TopupManagement.Category.Day,
        value: "MD_day",
        emoji: <MdToday className="text-blue-600" />,
      },
      {
        label: localStrings.TopupManagement.Category.Week,
        value: "MD_week",
        emoji: <PiNumberCircleSevenFill className="text-yellow-600" />,
      },
      {
        label: localStrings.TopupManagement.Category.Month,
        value: "MD_month",
        emoji: <IoCalendarNumber className="text-green-600" />,
      },
    ],
  };
};
