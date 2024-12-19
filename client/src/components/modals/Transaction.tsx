import { Card, Collapse, Form, Modal, Table, Tag } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import ReactJson from "react-json-view";
import {
  formatCurrency,
  statusForDetails,
} from "utils/helpersInTs/helpersInTs";

export default function ModalTransaction(props) {
  const { title, show, close, confirmLoading, info, edit, admin } = props;
  const [form] = Form.useForm();
  const { localStrings } = AuthenticationContext();
  const columnsTable = [
    {
      title: localStrings.TransactionHistory.Columns.ID,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.Code,
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.PackageName,
      dataIndex: "mobileData",
      key: "mobileData",
      render: (value, record) => <span>{record.mobileData.name}</span>,
      align: "center",
      width: "7%",
    },
    {
      title: "Email",
      dataIndex: "buyer",
      key: "buyerEmail",
      render: () => <span>{info?.buyer?.email}</span>,
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.Phone,
      dataIndex: "buyer",
      key: "buyerPhone",
      render: () => <span>{info?.buyer?.phone}</span>,
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.RegisteredPhone,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: localStrings.GlobalLabels.Status,
      dataIndex: "status",
      key: "status",
      width: "9%",
      render: (tag) => {
        let st = statusForDetails(tag);
        let color =
          tag === 0
            ? "#d9a61c"
            : tag === 1
            ? "#2029a8"
            : tag === 2
            ? "green"
            : tag === 3
            ? "volcano"
            : tag === 4
            ? "#730d34"
            : "#e8a81e";
        return (
          <Tag color={color} key={st}>
            {st.toUpperCase()}
          </Tag>
        );
      },
      align: "center",
    },
    {
      title: localStrings.GlobalLabels.createdAt,
      dataIndex: "created",
      key: "createdAt",
      render: (value) => (
        <span>{moment(value).format("DD/MM/YYYY HH:mm")}</span>
      ),
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.TotalAmount,
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(value)}
        </span>
      ),
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.Method,
      dataIndex: "method",
      key: "paymentMethod",
      align: "center",
      render: (value) => (isEmpty(value) ? localStrings.GlobalLabels.NoInfo : value),
    },
    {
      title: localStrings.GlobalLabels.Description,
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];
  React.useEffect(() => {
    form.setFieldsValue(info);
  }, [info, show, edit]);

  const items = [
    {
      key: "1",
      label: "Raw Data",
      children: <ReactJson src={info} style={{ wordBreak: "break-word" }} />,
    },
  ];

  return (
    <Modal
      title={title}
      open={show}
      footer={null}
      onCancel={close}
      className="p-3"
      centered
      width={1500}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 160px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        },
      }}
      confirmLoading={confirmLoading}
    >
      <div className="flex flex-col justify-center items-center gap-5">
        <Card
          bordered={true}
          className="w-full overflow-scroll scrollable-content"
        >
          <Table
            columns={
              admin === true
                ? (columnsTable as any)
                : (columnsTable?.filter(
                    (item) => item?.title !== "Địa chỉ IP"
                  ) as any)
            }
            rowKey={(record) => record.id}
            dataSource={[info]}
            pagination={false}
            scroll={{ x: 1800, y: 600 }}
          />
        </Card>
        {admin === true && (
          <Collapse
            items={items}
            className="font-bold w-full overflow-hidden bg-white"
            expandIconPosition="end"
          />
        )}
      </div>
    </Modal>
  );
}
