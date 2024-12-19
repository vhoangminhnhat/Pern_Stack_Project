import {
  BarcodeOutlined,
  FileExcelOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { default as dayjs, default as moment } from "dayjs";
import { colorFormat } from "utils/format/ColorFormat";
import SimOrdersForPartnersViewModel from "../viewModel/SimOrdersForPartnersViewModel";
import ActionFeature from "./acionViews/ActionFeature";

const SimOrdersForPartnersFeature = () => {
  const {
    list,
    loading,
    modal,
    total,
    page,
    pageSize,
    actionForm,
    setInfo,
    actionLoading,
    getSimList,
    simList,
    info,
    user,
    getPartnerList,
    handleExport,
    partnerList,
    packageList,
    getList,
    handleActions,
    exportLoading,
    setModal,
    statusList,
    handleSearch,
    filterForm,
    columnsTable,
    handleTableChange,
  } = SimOrdersForPartnersViewModel();

  const handleExportAction = async () => {
    let dates = filterForm.getFieldValue("date");
    let params = {
      package:
        filterForm.getFieldValue("package") === undefined
          ? undefined
          : filterForm.getFieldValue("package"),
      partner:
        filterForm.getFieldValue("partner") === undefined ||
        filterForm.getFieldValue("partner") === "Tất cả"
          ? undefined
          : filterForm.getFieldValue("partner"),
      number:
        filterForm.getFieldValue("number") === undefined
          ? undefined
          : filterForm.getFieldValue("number"),
      customerPhone:
        filterForm.getFieldValue("customerPhone") === undefined
          ? undefined
          : filterForm.getFieldValue("customerPhone"),
      email:
        filterForm.getFieldValue("email") === undefined
          ? undefined
          : filterForm.getFieldValue("email"),
      start: moment(dates[0]?.$d).format("DD-MM-YYYY"),
      end: moment(dates[1]?.$d).format("DD-MM-YYYY"),
    };
    await handleExport(params);
  };

  return (
    <div className="px-3 py-3 flex-1 h-screen mb-24">
      <Card
        title="Danh sách thông tin đăng ký Sim"
        extra={[
          <>
            {user?.isAdmin === false && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: colorFormat.Green,
                  },
                }}
              >
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => {
                    actionForm.resetFields();
                    setInfo({});
                    setModal(true);
                  }}
                  className="font-semibold"
                >
                  Thêm mới
                </Button>
              </ConfigProvider>
            )}
          </>,
        ]}
      >
        <Form
          form={filterForm}
          onFinish={(values) => handleSearch(values, "search")}
          layout="vertical"
        >
          <Row gutter={[2, 1]}>
            {user?.isAdmin === true && (
              <Col span={24} lg={8} xl={4}>
                <div>Đối tác</div>
                <Form.Item name={"partner"}>
                  <Select
                    defaultValue={"Tất cả"}
                    style={{ width: "100%" }}
                    options={partnerList?.map((item) => {
                      return {
                        label:
                          item?.name[0]?.toUpperCase() + item?.name?.slice(1),
                        value: item?.apikey,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
            )}
            <Col
              span={24}
              lg={user?.isAdmin === true ? 8 : 8}
              xl={user?.isAdmin === true ? 4 : 4}
            >
              <div>Loại gói</div>
              <Form.Item name={"package"}>
                <Select
                  showSearch
                  className="w-full"
                  filterOption={(inputValue, option) => {
                    if (typeof option?.label === "string") {
                      return option?.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                    }
                    return false;
                  }}
                  defaultValue={"Tất cả"}
                  options={packageList?.map((item) => {
                    return {
                      label:
                        item?.name[0]?.toUpperCase() + item?.name?.slice(1),
                      value: item?.code,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={user?.isAdmin === true ? 8 : 8}
              xl={user?.isAdmin === true ? 4 : 4}
            >
              <div>Số Sim</div>
              <Form.Item name={"number"}>
                <AutoComplete
                  options={simList.map((item) => ({ value: item.sim }))}
                  onSearch={(value) => getSimList(value)}
                  children={
                    <Input
                      placeholder="Nhập số sim..."
                      prefix={<BarcodeOutlined className="pr-1" />}
                    />
                  }
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={user?.isAdmin === true ? 8 : 8}
              xl={user?.isAdmin === true ? 4 : 4}
            >
              <div>Điện thoại khách hàng</div>
              <Form.Item name={"customerPhone"}>
                <Input
                  placeholder="Nhập số điện thoại..."
                  prefix={<PhoneOutlined className="pr-1" />}
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={user?.isAdmin === true ? 8 : 8}
              xl={user?.isAdmin === true ? 4 : 4}
            >
              <div>Email khách hàng</div>
              <Form.Item name={"email"}>
                <Input
                  placeholder="Nhập email khách hàng..."
                  prefix={<MailOutlined className="pr-1" />}
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={user?.isAdmin === false ? 16 : 8}
              xl={user?.isAdmin === false ? 8 : 4}
            >
              <div>Ngày</div>
              <Form.Item
                name={"date"}
                initialValue={[
                  dayjs(moment().add(-15, "days")),
                  dayjs(moment()),
                ]}
              >
                <DatePicker.RangePicker
                  format={"DD-MM-YYYY"}
                  className="w-full"
                  disabledDate={(d) => !d || d.isAfter(Date.now())}
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item>
                <Button
                  type="primary"
                  title="Xóa bộ lọc"
                  style={{ width: "100%" }}
                  danger
                  onClick={async () => {
                    filterForm.resetFields();
                    await getList({
                      page: 0,
                      limit: 10,
                      start: moment().add(-15, "days").format("DD-MM-YYYY"),
                      end: moment().format("DD-MM-YYYY"),
                    });
                  }}
                  icon={<RedoOutlined />}
                >
                  Xóa bộ lọc
                </Button>
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  icon={<SearchOutlined />}
                >
                  Tra cứu
                </Button>
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: colorFormat.Green,
                    },
                  }}
                >
                  <Button
                    type="primary"
                    icon={
                      exportLoading === true ? (
                        <LoadingOutlined />
                      ) : (
                        <FileExcelOutlined />
                      )
                    }
                    onClick={handleExportAction}
                    className="font-semibold w-full"
                    disabled={exportLoading === true ? true : false}
                  >
                    {exportLoading === true
                      ? "Đang xuất báo cáo"
                      : "Xuất Excel"}
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Col>
            <Col span={24} className="mt-1">
              <Spin
                spinning={loading}
                indicator={
                  <LoadingOutlined className="text-blue-600 font-semibold" />
                }
                tip={<span className="font-semibold">Loading</span>}
              >
                <Table
                  columns={columnsTable as any}
                  rowKey={(record) => record.id}
                  dataSource={list}
                  onChange={handleTableChange}
                  scroll={{ x: 2400, y: 1000 }}
                  className="h-full"
                  pagination={{
                    pageSize,
                    current: page + 1,
                    total,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                  }}
                  summary={() => (
                    <Table.Summary fixed={"bottom"}>
                      <Table.Summary.Row className="w-full">
                        <Table.Summary.Cell
                          index={0}
                          colSpan={2}
                          className="text-sm"
                        >
                          Tổng đơn hàng:{" "}
                          <span className="font-bold ml-2 text-blue-700">
                            {total}
                          </span>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </Spin>
            </Col>
          </Row>
        </Form>
        <ActionFeature
          getSimList={getSimList}
          simList={simList}
          packageList={packageList}
          setInfo={setInfo}
          partnerList={partnerList}
          info={info}
          setModal={setModal}
          modal={modal}
          actionLoading={actionLoading}
          actionForm={actionForm}
          handleActions={handleActions}
        />
      </Card>
    </div>
  );
};

export default SimOrdersForPartnersFeature;
