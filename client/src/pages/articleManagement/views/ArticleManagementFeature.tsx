import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { ArticleManagementConstants } from "../constants/ArticleManagementConstants";
import ArticleManagementViewModel from "../viewModel/ArticleManagementViewModel";
import ArticleIFrame from "./actionViews/ArticleIFrame";
import ArticleManagementSummarize from "./actionViews/ArticleManagementSummarize";
import UploadArticleFeature from "./actionViews/UploadArticleFeature";

const ArticleManagementFeature = () => {
  const { localStrings } = AuthenticationContext();
  const {
    fetchList,
    filterForm,
    handleTableChange,
    list,
    loading,
    page,
    pageSize,
    setPage,
    columns,
    modal,
    setModal,
    setSummaryModal,
    handleSearch,
    summary,
    summaryModal,
    actionType,
    setActionType,
    detailInfo,
    setDetailInfo,
    handleActions,
    detailModal,
    setDetailModal,
    actionForm,
    handleUploadChange,
    importFile,
    setImportFile,
    modalLoading,
  } = ArticleManagementViewModel();
  return (
    <CardComponent
      data={{
        title: localStrings.ArticleManagement.Main,
        extra: null,
        children: (
          <Form
            form={filterForm}
            onFinish={async () =>
              await handleSearch(filterForm?.getFieldsValue(true))
            }
          >
            <Row gutter={[2, 2]}>
              {FilterComponent(
                ArticleManagementConstants?.filters(localStrings)
              )}
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
                  await fetchList({ page: 0, limit: pageSize });
                },
              })}
              <Col span={24} lg={8}>
                <Button
                  type="primary"
                  onClick={() => {
                    setDetailInfo(null);
                    actionForm.resetFields();
                    setImportFile({ file: [], fileList: [] });
                    setDetailModal(true);
                  }}
                  style={{ marginLeft: 8, width: "100%" }}
                >
                  {localStrings?.GlobalLabels?.Create || "Add Article"}
                </Button>
              </Col>
              <TableComponent
                data={{
                  columns,
                  dataSource: list,
                  page,
                  pageSize,
                  total: list?.length,
                  totalTitle: localStrings.GlobalLabels.Total,
                  handleTableChange,
                  loading,
                  loadingTitle: "Loading...",
                  scroll: { x: 1200, y: 800 },
                }}
              />
            </Row>
            <ArticleManagementSummarize
              data={{
                modal: summaryModal,
                summary,
                actionType,
                setActionType,
                setModal: setSummaryModal,
              }}
            />
            <ArticleIFrame data={{ modal, setModal }} />
            <UploadArticleFeature
              data={{
                actionForm,
                detailInfo: detailInfo || ({} as any),
                detailModal,
                handleActions,
                handleUploadChange,
                importFile,
                modalLoading,
                setDetailInfo,
                setDetailModal,
              }}
            />
          </Form>
        ),
      }}
    />
  );
};

export default ArticleManagementFeature;
