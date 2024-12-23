import { AuthenticationContext } from "context/AuthenticationContext";
import React, { Fragment } from "react";
import ArticleManagementViewModel from "../viewModel/ArticleManagementViewModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { Form, Row } from "antd";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import { ArticleManagementConstants } from "../constants/ArticleManagementConstants";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
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
  } = ArticleManagementViewModel();
  return (
    <CardComponent
      data={{
        title: localStrings.ArticleManagement.Main,
        extra: <Fragment key={0}></Fragment>,
        children: (
          <Form form={filterForm}>
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
            <ArticleManagementSummarize data={{ modal, setModal }} />
          </Form>
        ),
      }}
    />
  );
};

export default ArticleManagementFeature;
