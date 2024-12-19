import { strings } from "utils/localizedStrings";

export const simOrdersForPartnersConstants = (localStrings: typeof strings) => {
  return {
    statusList: [
      { label: localStrings.GlobalLabels.All, value: "" },
      {
        label: localStrings.SimOrdersForPartners.Status.WaitingForPurchased,
        value: 10,
      },
      {
        label: localStrings.SimOrdersForPartners.Status.WaitingForDelivered,
        value: 11,
      },
      {
        label: localStrings.SimOrdersForPartners.Status.WaitingForRecieved,
        value: 12,
      },
      { label: localStrings.SimOrdersForPartners.Status.Success, value: 13 },
      { label: localStrings.SimOrdersForPartners.Status.Canceled, value: 14 },
      {
        label: localStrings.SimOrdersForPartners.Status.ConnectedSuccessfully,
        value: 15,
      },
      {
        label: localStrings.SimOrdersForPartners.Status.ConnectedFailed,
        value: 16,
      },
    ],
    mainColumns: [
      {
        title: "STT",
        key: "stt",
        align: "center",
        width: "5%",
        render: (item, record, index) => {
          return <span className="font-bold">{index + 1}</span>;
        },
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.CreatedAt,
        key: "createdAt",
        dataIndex: "createdAt",
        align: "center",
        width: "8%",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.OrderCode,
        key: "orderCode",
        align: "center",
        dataIndex: "orderCode",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.Sim,
        key: "number",
        align: "center",
        dataIndex: "number",
        width: "8%",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.PackageType,
        key: "package",
        align: "center",
        dataIndex: "package",
        width: "7%",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.CustomerName,
        key: "customerName",
        dataIndex: "customerName",
        align: "center",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.CustomerPhone,
        key: "customerPhone",
        dataIndex: "customerPhone",
        align: "center",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.Address,
        key: "address",
        dataIndex: "address",
        align: "center",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.Email,
        key: "email",
        dataIndex: "email",
        align: "center",
      },
      {
        title: localStrings.SimOrdersForPartners.Columns.Partner,
        key: "partner",
        dataIndex: "partner",
        align: "center",
      },
    ],
  };
};
