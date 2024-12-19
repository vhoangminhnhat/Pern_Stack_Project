import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { ContentManagementResponseModel } from "api/repositories/contentManagement/model/ContentManagementResponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import { contentManagementConstants } from "../viewModel/constants/ContentManagementConstants";
import ContentManagementViewModel from "../viewModel/ContentManagementViewModel";
import DownloadFeature from "./actionFeatures/DownloadFeature";
import PreviewFeature from "./actionFeatures/PreviewFeature";
import UpdateCreateFeature from "./actionFeatures/UpdateCreateFeature";

const ContentManagementFeature = () => {
  const {
    columns,
    form,
    actionForm,
    list,
    loading,
    page,
    pageSize,
    total,
    docs,
    modal,
    actionModal,
    downloadModal,
    info,
    importFile,
    setImportFile,
    setInfo,
    setModal,
    setActionModal,
    setDownloadModal,
    setPage,
    handleTableChange,
    handleSearch,
    downloadFile,
    handleViewDetails,
    fetchContentList,
    handleAction,
  } = ContentManagementViewModel();
  const { localStrings } = AuthenticationContext();
  return (
    <CardComponent
      data={{
        title: localStrings.ContentManagement.Title,
        extra: <></>,
        children: (
          <>
            <Form
              form={form}
              onFinish={async (values) => await handleSearch(values)}
            >
              <Row gutter={[4, 4]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(
                  contentManagementConstants(localStrings).filterAttributes
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
                    form.resetFields();
                    await fetchContentList({ page: 0, limit: pageSize });
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
                        onClick={() => handleViewDetails({}, "create")}
                        className="w-full"
                        icon={<PlusCircleOutlined />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table list */}
                <TableComponent<ContentManagementResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.ContentManagement.Total,
                    scroll: { x: 1100, y: 900 },
                  }}
                />
              </Row>
            </Form>
            <PreviewFeature data={{ docs, modal, setModal }} />
            <DownloadFeature
              data={{
                downloadFile,
                downloadModal,
                info,
                setDownloadModal,
                setInfo,
              }}
            />
            <UpdateCreateFeature
              data={{
                actionForm,
                handleAction,
                importFile,
                info,
                modal: actionModal,
                setImportFile,
                setInfo,
                setModal: setActionModal,
              }}
            />
          </>
        ),
      }}
    />
  );
};

export default ContentManagementFeature;
