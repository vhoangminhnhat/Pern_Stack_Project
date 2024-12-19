import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { FileManagementResponseModel } from "api/repositories/fileManagement/model/FileManagementResponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import { fileManagementConstants } from "../constants/FileManagementConstants";
import FileManagementViewModel from "../viewModel/FileManagementViewModel";
import UploadReplaceFilesFeature from "./actionViews/UploadReplaceFilesFeature";

const FileManagementFeature = () => {
  const {
    actionForm,
    columns,
    detailInfo,
    detailModal,
    filterForm,
    list,
    loading,
    modalLoading,
    page,
    pageSize,
    importFile,
    total,
    fetchList,
    handleUploadChange,
    handleActions,
    handleSearch,
    handleTableChange,
    setPage,
    setDetailInfo,
    setDetailModal,
    setImportFile,
    setParamsExport,
  } = FileManagementViewModel();
  const { localStrings } = AuthenticationContext();

  return (
    <CardComponent
      data={{
        title: localStrings.FileManagement.Title,
        extra: <></>,
        children: (
          <>
            <Form
              form={filterForm}
              onFinish={async (values) => await handleSearch(values)}
            >
              <Row gutter={[4, 0]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(fileManagementConstants(localStrings).filters)}
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
                    setParamsExport({ page: 0, limit: 10, pagination: 0 });
                    await fetchList({ page: 0, limit: 10, pagination: 0 });
                  },
                })}
                <Col span={24} lg={8}>
                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: colorFormat.Green,
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          setImportFile({
                            file: [],
                          });
                          setDetailInfo({});
                          actionForm.setFieldsValue(
                            new FileManagementResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        className="w-full"
                        icon={<PlusCircleOutlined />}
                      >
                        {localStrings.FileManagement.Upload}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table list */}
                <TableComponent<FileManagementResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.GlobalLabels.Total,
                    scroll: { x: 1000, y: 800 },
                  }}
                />
              </Row>
            </Form>
            <UploadReplaceFilesFeature
              data={{
                actionForm,
                detailInfo,
                detailModal,
                handleActions,
                handleUploadChange,
                importFile,
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

export default FileManagementFeature;
