import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Row } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { Fragment } from "react";
import { ArticleManagementConstants } from "../constants/ArticleManagementConstants";
import ArticleManagementViewModel from "../viewModel/ArticleManagementViewModel";
import ArticleIFrame from "./actionViews/ArticleIFrame";
import ArticleManagementSummarize from "./actionViews/ArticleManagementSummarize";

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
  } = ArticleManagementViewModel();
  return (
    <CardComponent
      data={{
        title: localStrings.ArticleManagement.Main,
        extra: <Fragment key={0}></Fragment>,
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
                searchLg: 12,
                htmlType: "submit",
                redoIcon: <RedoOutlined />,
                redoLg: 12,
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
          </Form>
        ),
      }}
    />
  );
};

export default ArticleManagementFeature;
