import { AuthenticationContext } from "context/AuthenticationContext";
import React, { Fragment } from "react";
import ClassViewModel from "../viewModel/ClassViewModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { Form, Row } from "antd";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import { ClassFeatureConstants } from "../constants/ClassFeatureConstants";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";

const ClassFeature = () => {
  const { localStrings } = AuthenticationContext();
  const {
    fetchList,
    filterForm,
    list,
    loading,
    page,
    pageSize,
    setPage,
    handleTableChange,
  } = ClassViewModel();
  return (
    <CardComponent
      data={{
        title: localStrings.ClassManagement.Main,
        extra: <Fragment key={0}></Fragment>,
        children: (
          <Form form={filterForm}>
            <Row gutter={[2,2]}>
              {FilterComponent(ClassFeatureConstants?.filters(localStrings))}
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
                  columns: ClassFeatureConstants?.mainColumns(localStrings),
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
          </Form>
        ),
      }}
    />
  );
};

export default ClassFeature;
