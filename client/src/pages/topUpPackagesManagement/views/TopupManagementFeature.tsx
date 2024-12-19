import {
  FileAddOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { TopupDetailResponseModel } from "api/repositories/packagesManagement/topupManagement/model/detail/TopupDetailReponseModel";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { colorFormat } from "utils/format/ColorFormat";
import { strings } from "utils/localizedStrings";
import { topupManagementConstants } from "../constants/TopupManagementConstants";
import TopupManagementViewModel from "../viewModel/TopupManagementViewModel";
import TopUpActionFeature from "./actionViews/topUpActionFeature";
import ImportFromB2BFeature from "./importFromB2BFeature/ImportFromB2BFeature";
import { AuthenticationContext } from "context/AuthenticationContext";

const TopupManagementFeature = () => {
  const {
    actionForm,
    columns,
    detailInfo,
    detailModal,
    fetchList,
    filterForm,
    handleSearch,
    handleTableChange,
    list,
    loading,
    page,
    pageSize,
    setDetailInfo,
    setDetailModal,
    setPage,
    setParamExport,
    handleActions,
    b2bImportModal,
    setB2bImportModal,
    modalLoading,
    setModalLoading,
    total,
    capacityUnit,
    durationUnit,
    orderSorted,
    setOrderSorted,
    setCapacityUnit,
    setDurationUnit,
  } = TopupManagementViewModel();
  const { localStrings, language } = AuthenticationContext();
  return (
    <CardComponent
      data={{
        title: localStrings.TopupManagement.Title,
        children: (
          <>
            <Form
              form={filterForm}
              onFinish={async (values) => await handleSearch(values)}
            >
              <Row gutter={[4, 0]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(
                  topupManagementConstants(
                    setOrderSorted,
                    orderSorted,
                    localStrings,
                    language
                  ).topupFilters
                )}
                {/* Buttons */}
                {FilterButtons({
                  searchLg: 6,
                  htmlType: "submit",
                  redoIcon: <RedoOutlined />,
                  redoLg: 6,
                  searchIcon: <SearchOutlined />,
                  redoName: localStrings.GlobalLabels.Redo,
                  searchName: localStrings.GlobalLabels.Search,
                  type: "primary",
                  onRedoClick: async () => {
                    setPage(0);
                    filterForm.resetFields();
                    setParamExport({ page: 0, limit: 10, pagination: 1 });
                    await fetchList({ page: 0, limit: 10, pagination: 1 });
                  },
                })}
                <Col span={24} lg={6}>
                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: colorFormat?.Green,
                        },
                      }}
                    >
                      {" "}
                      <Button
                        type="primary"
                        className="w-full"
                        onClick={() => setB2bImportModal(true)}
                        icon={<FileAddOutlined />}
                      >
                        {localStrings.TopupManagement.SyncFromB2B.Title}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: colorFormat?.Green,
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          setDetailInfo({});
                          actionForm.setFieldsValue(
                            new TopupDetailResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        className="w-full"
                        icon={<PlusCircleOutlined className="font-bold" />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table list */}
                <TableComponent<TopupResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "Loading...",
                    page,
                    pageSize,
                    total: total,
                    totalTitle: localStrings.TopupManagement.Total,
                    scroll: { x: 1550, y: 530 },
                  }}
                />
              </Row>
            </Form>
            <ImportFromB2BFeature
              data={{
                onCancel: () => {
                  setB2bImportModal(false);
                },
                getListData: fetchList,
                visible: b2bImportModal,
              }}
            />
            <TopUpActionFeature
              data={{
                actionForm,
                detailInfo,
                detailModal,
                capacityUnit,
                durationUnit,
                modalLoading,
                orderSorted,
                setOrderSorted,
                setCapacityUnit,
                setDurationUnit,
                handleActions,
                setDetailInfo,
                setDetailModal,
              }}
            />
          </>
        ),
        extra: <></>,
      }}
    />
  );
};

export default TopupManagementFeature;
