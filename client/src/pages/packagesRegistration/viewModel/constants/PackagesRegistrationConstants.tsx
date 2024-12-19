import { Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { PackagesRegistrationListResponseModel } from "api/repositories/packagesRegistration/model/PackagesRegistrationListResponseModel";
import { strings } from "utils/localizedStrings";

export const PackagesRegistrationConstants = (localStrings: typeof strings) => {
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
        case "MD_roaming":
          return localStrings.RoamingManagement.Category.Roaming;
      }
    },
    packagesColumns: [
      {
        title: localStrings.RoamingRegistration.Columns.Name,
        key: "packageName",
        dataIndex: "name",
        align: "center",
      },
      {
        title: localStrings.RoamingRegistration.Columns.Code,
        key: "packageCode",
        dataIndex: "code",
        align: "center",
      },
      {
        title: localStrings.RoamingRegistration.Columns.Capacity,
        key: "packageCapacity",
        dataIndex: "storage",
        align: "center",
      },
      {
        title: `${localStrings.TopupManagement.Columns.DurationDay} ( ${localStrings.GlobalLabels.Date} )`,
        key: "packageDuration",
        dataIndex: "durationDay",
        align: "center",
        render: (text) => <span className="font-medium">{text}</span>,
      },
      {
        title: localStrings.RoamingRegistration.Columns.Type,
        key: "packageType",
        dataIndex: "categories",
        align: "center",
        render: (record: TopupResponseModel["categories"]) => (
          <div className="flex flex-row gap-2 items-center justify-center">
            {record?.map((item) => {
              return (
                <Tag>
                  {PackagesRegistrationConstants(localStrings).renderCategory(
                    item?.code
                  )}
                </Tag>
              );
            })}
          </div>
        ),
      },
      {
        title: localStrings.TopupManagement.Columns.Price,
        key: "packagePrice",
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
        title: localStrings.GlobalLabels.Description,
        dataIndex: "description",
        key: "description",
        align: "center",
        width: "18%",
        ellipsis: {
          showTitle: false,
        },
        render: (text) => (
          <Tooltip
            placement="bottomLeft"
            title={<span style={{ color: "#0f0f0f" }}>{text}</span>}
            color="#f5f7fa"
          >
            {text}
          </Tooltip>
        ),
      },
    ] as ColumnsType<TopupResponseModel>,
    mainColumns: [
      {
        title: localStrings.RoamingRegistration.PhoneRegisteredListColumns.Name,
        key: "registeredName",
        dataIndex: "fullName",
        align: "center",
      },
      {
        title:
          localStrings.RoamingRegistration.PhoneRegisteredListColumns.Email,
        key: "registeredEmail",
        dataIndex: "email",
        align: "center",
        width: "15%",
      },
      {
        title:
          localStrings.RoamingRegistration.PhoneRegisteredListColumns.Phone,
        key: "registeredPhone",
        dataIndex: "phone",
        align: "center",
      },
      {
        title: localStrings.RoamingRegistration.Columns.Name,
        key: "packageName",
        dataIndex: "package",
        align: "center",
        render: (value: PackagesRegistrationListResponseModel["package"]) =>
          value?.name,
      },
      {
        title: localStrings.RoamingRegistration.Columns.Code,
        key: "packageCode",
        dataIndex: "package",
        align: "center",
        render: (value: PackagesRegistrationListResponseModel["package"]) =>
          value?.code,
      },
      {
        title: `${localStrings.RoamingRegistration.Columns.Capacity} (GB)`,
        key: "packageStorage",
        dataIndex: "package",
        align: "center",
        render: (value: PackagesRegistrationListResponseModel["package"]) =>
          value?.storage,
      },
      {
        title: localStrings.RoamingRegistration.Columns.Duration,
        key: "packagePrice",
        dataIndex: "package",
        align: "center",
        render: (value: PackagesRegistrationListResponseModel["package"]) => (
          <span className="font-medium">
            {value?.durationDay} {localStrings.GlobalLabels.Date}
          </span>
        ),
      },
      {
        title: localStrings.RoamingRegistration.Columns.Price,
        key: "packageName",
        dataIndex: "package",
        align: "center",
        render: (value: PackagesRegistrationListResponseModel["package"]) => (
          <span className="text-green-500 font-medium">
            {new Intl.NumberFormat().format(parseInt(value?.price as string))}{" "}
            VND
          </span>
        ),
      },
      {
        title: localStrings.GlobalLabels.createdAt,
        key: "registeredDate",
        dataIndex: "createdAt",
        align: "center",
      },
    ] as ColumnsType<PackagesRegistrationListResponseModel>,
  };
};
