import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { PathConfigDetailResponseModel } from "api/repositories/pathConfig/model/detail/PathConfigDetailResponseModel";
import { PathConfigResponseModel } from "api/repositories/pathConfig/model/PathConfigResponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { colorFormat } from "utils/format/ColorFormat";
import PathConfigMangementViewModel from "../viewModel/PathConfigMangementViewModel";
import PathConfigManagementActionsFeature from "./actionViews/PathConfigManagementActionsFeature";
import { PathConfigConstants } from "./pathConfigConstants/PathConfigConstants";

const PathConfigMangementFeature = () => {
  const {
    actionForm,
    columns,
    detail,
    detailModal,
    filterForm,
    list,
    loading,
    page,
    pageSize,
    total,
    setPage,
    handleActions,
    handleTableChange,
    setDetail,
    setDetailModal,
    fetchConfigList,
  } = PathConfigMangementViewModel();
  const { localStrings } = AuthenticationContext();

  return (
    <CardComponent
      data={{
        children: (
          <>
            <Form
              form={filterForm}
              onFinish={async (value) =>
                await fetchConfigList({
                  path: isEmpty(value?.path)
                    ? undefined
                    : (value?.path as string),
                  title: isEmpty(value?.title)
                    ? undefined
                    : (value?.title as string),
                  page: 0,
                  limit: pageSize,
                })
              }
            >
              <Row gutter={[6, 0]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(
                  PathConfigConstants(localStrings)?.filterAttributes
                )}
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
                    await fetchConfigList({ page: 0, limit: pageSize });
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
                        type="primary"
                        className="w-full"
                        onClick={() => {
                          setDetail({});
                          actionForm.setFieldsValue(
                            new PathConfigDetailResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        icon={<PlusCircleOutlined />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table List */}
                <TableComponent<PathConfigResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.PathConfigManagement.Total,
                    scroll: { x: 900, y: 900 },
                  }}
                />
              </Row>
            </Form>
            <PathConfigManagementActionsFeature
              data={{
                actionForm,
                detail,
                handleActions,
                loading,
                modal: detailModal,
                setDetail,
                setModal: setDetailModal,
              }}
            />
          </>
        ),
        title: localStrings.PathConfigManagement.Title,
        extra: <></>,
      }}
    />
  );
};

export default PathConfigMangementFeature;
