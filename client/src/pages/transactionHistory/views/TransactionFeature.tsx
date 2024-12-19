import {
  AuditOutlined,
  CalendarOutlined,
  CodeOutlined,
  FileExcelOutlined,
  KeyOutlined,
  LoadingOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import ModalTransaction from "components/modals/Transaction";
import { AuthenticationContext } from "context/AuthenticationContext";
import PackagesRegistrationFeature from "pages/packagesRegistration/views/PackagesRegistrationFeature";
import { colorFormat } from "utils/format/ColorFormat";
import TransactionViewModel from "../viewModel/TransactionViewModel";

const TransactionFeature = () => {
  const {
    loading,
    error,
    transId,
    info,
    data,
    total,
    page,
    pageSize,
    showModal,
    exportLoading,
    readOnly,
    edit,
    filter,
    transRef,
    code,
    phoneNumber,
    partnerList,
    paymentMethod,
    method,
    partner,
    user,
    columnsTable,
    defaultDate,
    modal,
    setModal,
    handleTotal,
    handleOnChange,
    handleOnChangeValue,
    handleSearch,
    handleFilter,
    handleTransRef,
    handleClose,
    handleCode,
    handleDate,
    handleExport,
    handlePartners,
    handlePhoneNumber,
    handleTableChange,
    handleMethod,
    handleTransId,
  } = TransactionViewModel();
  const { localStrings } = AuthenticationContext();
  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        marginBottom: 80,
      }}
      className="px-2 py-1"
    >
      <Card
        title={localStrings.TransactionHistory.Title}
        className="shadow-2xl"
      >
        <Row gutter={[4, 6]} align={"middle"}>
          <Col
            lg={user?.isAdmin === true ? 6 : 12}
            span={user?.isAdmin === true ? 12 : 12}
          >
            <div>{localStrings.GlobalLabels.Status}</div>
            <Select
              id="status"
              className="w-full"
              value={filter}
              style={{ width: "100%" }}
              suffixIcon={<AuditOutlined className="pl-1" />}
              onChange={handleFilter}
            >
              <Select.Option value="">
                {localStrings.GlobalLabels.All}
              </Select.Option>
              <Select.Option value={0}>
                {localStrings.TransactionHistory.Status.Init}
              </Select.Option>
              <Select.Option value={1}>
                {localStrings.TransactionHistory.Status.Progerssing}
              </Select.Option>
              <Select.Option value={2}>
                {localStrings.TransactionHistory.Status.Finished}
              </Select.Option>
              <Select.Option value={3}>
                {localStrings.TransactionHistory.Status.Error}
              </Select.Option>
              <Select.Option value={4}>
                {localStrings.TransactionHistory.Status.Deleted}
              </Select.Option>
              <Select.Option value={5}>
                {localStrings.TransactionHistory.Status.WaitingToBeConfirmed}
              </Select.Option>
            </Select>
          </Col>
          {user?.isAdmin === true && (
            <>
              <Col span={12} lg={6}>
                <div>{localStrings.TransactionHistory.Columns.Partner}</div>
                <Select
                  className="w-full"
                  value={partner}
                  suffixIcon={<UserOutlined className="pl-1" />}
                  showSearch
                  filterOption={(inputValue, option) => {
                    if (typeof option?.label === "string") {
                      return option?.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                    }
                    return false;
                  }}
                  options={partnerList?.map((item: any) => {
                    return {
                      label:
                        item?.name[0]?.toUpperCase() + item?.name?.slice(1),
                      value: item?.id,
                    };
                  })}
                  onChange={handlePartners}
                />
              </Col>
              <Col span={12} lg={6}>
                <div>{localStrings.TransactionHistory.Columns.Method}</div>
                <Select
                  className="w-full"
                  value={method}
                  suffixIcon={<WalletOutlined className="pl-1" />}
                  onChange={handleMethod}
                >
                  {paymentMethod?.map((item: any) => (
                    <Select.Option key={item?.code} value={item?.code}>
                      {item?.name[0]?.toUpperCase() + item?.name?.slice(1)}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col lg={6} span={12}>
                <div>{localStrings.TransactionHistory.Columns.ID}</div>
                <Input
                  placeholder={localStrings.TransactionHistory.Placeholder.ID}
                  onChange={handleTransId}
                  onPressEnter={async ({ target }) => {
                    handleTransId({ target });
                    await handleSearch();
                  }}
                  value={transId.trim()}
                  prefix={<KeyOutlined className="pr-1" />}
                />
              </Col>
            </>
          )}

          <Col lg={user?.isAdmin === true ? 6 : 12} span={12}>
            <div>Code</div>
            <Input
              id="code"
              placeholder={localStrings.TransactionHistory.Placeholder.Code}
              onChange={handleCode}
              onPressEnter={async ({ target }) => {
                handleCode({ target });
                await handleSearch();
              }}
              value={code.trim()}
              prefix={<KeyOutlined className="pr-1" />}
            />
          </Col>
          <Col lg={user?.isAdmin === true ? 6 : 12} span={12}>
            <div>{localStrings.TransactionHistory.Columns.TransRef}</div>
            <Input
              id="trans-ref"
              placeholder={localStrings.TransactionHistory.Placeholder.TransRef}
              onChange={handleTransRef}
              onPressEnter={async ({ target }) => {
                handleTransRef({ target });
                await handleSearch();
              }}
              value={transRef.trim()}
              prefix={<CodeOutlined className="pr-1" />}
            />
          </Col>
          <Col lg={user?.isAdmin === true ? 6 : 12} span={12}>
            <div>{localStrings.TransactionHistory.Columns.Phone}</div>
            <Input
              id="phone"
              placeholder={localStrings.GlobalPlaceholder.Phone}
              onChange={handlePhoneNumber}
              onPressEnter={async ({ target }) => {
                handlePhoneNumber({ target });
                await handleSearch();
              }}
              value={phoneNumber.trim()}
              prefix={<PhoneOutlined className="pr-1" />}
            />
          </Col>
          <Col lg={user?.isAdmin === true ? 6 : 24} span={12}>
            <div>{localStrings.GlobalLabels.Date}</div>
            <DatePicker.RangePicker
              format={"DD-MM-YYYY"}
              id="date-picker"
              defaultValue={defaultDate as any}
              onChange={handleDate}
              className="w-full"
              allowClear={false}
              suffixIcon={<CalendarOutlined className="pl-1" />}
              disabledDate={(d) => !d || d.isAfter(Date.now())}
            />
          </Col>
          <Col span={24} lg={12}>
            <Button
              type="primary"
              id="search"
              style={{ width: "100%", fontWeight: 600 }}
              onClick={handleSearch}
              icon={loading === true ? <LoadingOutlined /> : null}
            >
              {loading === true ? "" : localStrings.GlobalLabels.Search}
            </Button>
          </Col>
          <Col span={24} lg={12}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: colorFormat.Green,
                },
              }}
            >
              <Button
                type="primary"
                className="rounded-lg hover:shadow-xl font-semibold w-full"
                icon={
                  exportLoading === true ? (
                    <LoadingOutlined />
                  ) : (
                    <FileExcelOutlined />
                  )
                }
                disabled={exportLoading === true && true}
                onClick={handleExport}
              >
                {exportLoading === true
                  ? localStrings.GlobalMessage.Exporting
                  : localStrings.GlobalLabels.ExcelExporting}
              </Button>
            </ConfigProvider>
          </Col>
          {/* <Col span={24} lg={8}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: colorFormat.Green,
                },
              }}
            >
              <Button
                type="primary"
                className="rounded-lg hover:shadow-xl font-semibold w-full"
                icon={
                  exportLoading === true ? (
                    <LoadingOutlined />
                  ) : (
                    <PlusCircleOutlined />
                  )
                }
                onClick={() => {
                  setModal(true);
                }}
              >
                {localStrings.RoamingRegistration.ModalTitle}
              </Button>
            </ConfigProvider>
          </Col> */}
          <Col span={24} className="mt-1">
            <Spin
              spinning={loading}
              indicator={
                <LoadingOutlined className="text-blue-600 font-semibold" />
              }
              tip={<span className="font-semibold">Loading</span>}
            >
              <Table
                columns={
                  user?.isAdmin === false
                    ? columnsTable?.filter((item) => {
                        return (
                          item?.title !==
                            localStrings.TransactionHistory.Columns.ID &&
                          item?.title !==
                            localStrings.TransactionHistory.Columns.Method
                        );
                      })
                    : columnsTable
                }
                rowKey={(record) => record.id}
                size="small"
                dataSource={data}
                onChange={handleTableChange}
                scroll={{ x: 2000, y: 800 }}
                className="h-full"
                pagination={{
                  pageSize,
                  current: page,
                  total,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: handleTotal,
                }}
              />
            </Spin>
          </Col>
        </Row>
      </Card>
      <ModalTransaction
        show={showModal}
        admin={user?.isAdmin}
        title={localStrings.TransactionHistory.Details}
        close={handleClose}
        handleOnChange={handleOnChange}
        handleOnChangeValue={handleOnChangeValue}
        readOnly={readOnly}
        edit={edit}
        info={info}
        error={error}
      />
      <PackagesRegistrationFeature
        {...{
          modal,
          setModal,
        }}
      />
    </div>
  );
};

export default TransactionFeature;
