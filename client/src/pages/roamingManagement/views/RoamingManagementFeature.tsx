import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { RoamingManagementResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";
import { RoamingDetailResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/detail/RoamingDetailResponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import roamingManagementConstants from "../constants/RoamingManagementConstants";
import RoamingManagementViewModel from "../viewmodel/RoamingManagementViewModel";
import RoamingActionFeature from "./actionFeature/RoamingActionFeature";

const RoamingManagementFeature = () => {
  const {
    actionForm,
    detailInfo,
    detailModal,
    list,
    loading,
    modalLoading,
    page,
    pageSize,
    total,
    filterForm,
    columns,
    setPage,
    setParamsExport,
    setDetailInfo,
    setDetailModal,
    handleTableChange,
    fetchRoamingList,
    handleSearch,
    handleActions,
  } = RoamingManagementViewModel();
  const { localStrings } = AuthenticationContext();
  const { filterAttributes } = roamingManagementConstants(localStrings);
  return (
    <CardComponent
      data={{
        extra: <></>,
        title: localStrings.RoamingManagement.Title,
        children: (
          <>
            <Form
              form={filterForm}
              onFinish={async (values) => await handleSearch(values)}
            >
              <Row gutter={[4, 4]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(filterAttributes)}
                {/* Buttons */}
                {FilterButtons({
                  searchLg: 8,
                  htmlType: "submit",
                  redoIcon: <RedoOutlined />,
                  redoLg: 8,
                  searchIcon: <SearchOutlined />,
                  redoName: localStrings.GlobalLabels.Redo,
                  searchName: localStrings.GlobalLabels.Search,
                  type: "primary",
                  onRedoClick: async () => {
                    setPage(0);
                    filterForm.resetFields();
                    setParamsExport({ page: 0, limit: 10 });
                    await fetchRoamingList({ page: 0, limit: 10 });
                  },
                })}
                <Col span={24} lg={8}>
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
                            new RoamingDetailResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        className="w-full"
                        icon={<PlusCircleOutlined className="w-full" />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table list */}
                <TableComponent<RoamingManagementResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.RoamingManagement.Total,
                    scroll: { x: 1300, y: 900 },
                  }}
                />
              </Row>
            </Form>
            <RoamingActionFeature
              data={{
                actionForm,
                detailInfo,
                detailModal,
                handleActions,
                modalLoading,
                setDetailInfo,
                setDetailModal,
              }}
            />
          </>
        ),
      }}
    />
  );
};

export default RoamingManagementFeature;
