import { LoadingOutlined } from "@ant-design/icons";
import { Col, Spin, Table, Typography } from "antd";
import { colorFormat } from "utils/format/ColorFormat";
import { TableComponentModel } from "./model/TableComponentModel";
import { JSX } from "react";

const { Text } = Typography;

const TableComponent = <T extends Object>(props: TableComponentModel<T>) => {
  const { data } = props;
  const handleTotal = (total: number): JSX.Element => (
    <Text className="left-0 absolute font-medium">
      {data?.totalTitle}:
      <Text style={{ color: colorFormat?.Blue }} className="text-base ml-2">
        {total}
      </Text>{" "}
    </Text>
  );
  return (
    <Col span={24} className="mt-1">
      <Spin
        spinning={data?.loading}
        indicator={<LoadingOutlined className="text-blue-600 font-semibold" />}
        tip={
          <span className="font-semibold text-blue-600">
            {data?.loadingTitle}
          </span>
        }
      >
        <Table
          columns={[
            {
              title: "STT",
              width: "5%",
              render: (item, record, index) => (
                <span className="font-semibold">
                  {data?.page * data?.pageSize + index + 1}
                </span>
              ),
              align: "center",
            },
            ...data?.columns,
          ]}
          size="middle"
          dataSource={data?.dataSource}
          onChange={data?.handleTableChange}
          scroll={data?.scroll}
          className="h-full"
          pagination={{
            pageSize: data?.pageSize,
            current: data?.page + 1,
            total: data?.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: handleTotal,
          }}
        />
      </Spin>
    </Col>
  );
};

export default TableComponent;
