import {
  RedoOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import UserManagementViewModel from "../viewModel/UserManagementViewModel";
import UserManagementDetailFeature from "./userManagementDetailFeature/UserManagementDetailFeature";
import UserManagementResetPassFeature from "./userManagementResetPassFeature/UserManagementResetPassFeature";

const UserManagementFeature = () => {
  const {
    form,
    formDetail,
    list,
    roleList,
    partnerList,
    detailInfo,
    page,
    pageSize,
    total,
    detailModal,
    resetModal,
    loading,
    columns,
    modalLoading,
    userManagementFilters,
    setPage,
    setDetailModal,
    setDetailInfo,
    setParamsExport,
    setResetModal,
    setModalLoading,
    handleSearch,
    handleTableChange,
    handleDetailAction,
    fetchUserList,
  } = UserManagementViewModel();
  const { localStrings } = AuthenticationContext();

  return (
    <CardComponent
      data={{
        children: (
          <>
            <Form
              form={form}
              onFinish={async (value) => await handleSearch(value)}
            >
              <Row gutter={[6, 0]} className="flex justify-center items-center">
                {/* Filters */}
                {FilterComponent(userManagementFilters)}
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
                    setParamsExport({ page: 0, limit: pageSize });
                    setPage(0);
                    form.resetFields();
                    await fetchUserList({ page: 0, limit: pageSize });
                  },
                })}
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
                        style={{ backgroundColor: colorFormat.Green }}
                        type="primary"
                        className="w-full"
                        onClick={() => {
                          setDetailInfo({});
                          formDetail.setFieldsValue(
                            new UserManagementResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        icon={<UserAddOutlined />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table */}
                <TableComponent<UserManagementResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.UserManagement.Total,
                    scroll: { x: 1500, y: 900 },
                  }}
                />
              </Row>
            </Form>
            <UserManagementDetailFeature
              data={{
                detailModal,
                formDetail,
                handleDetailAction,
                modalLoading,
                setDetailModal,
                detailInfo,
                setDetailInfo,
                partnerList,
                roleList,
              }}
            />
            <UserManagementResetPassFeature
              data={{
                setDetailInfo,
                detailInfo,
                formDetail,
                handleDetailAction,
                modalLoading,
                resetModal,
                setModalLoading,
                setResetModal,
              }}
            />
          </>
        ),
        extra: <></>,
        title: localStrings.UserManagement.MainTitle,
      }}
    />
  );
};

export default UserManagementFeature;
