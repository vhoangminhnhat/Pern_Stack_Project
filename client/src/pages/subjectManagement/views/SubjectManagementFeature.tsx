import {
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { Fragment } from "react";
import { SubjectManagementConstants } from "../constants/SubjectManagementConstants";
import SubjectManagementViewModel from "../viewModel/SubjectManagementViewModel";
import SubjectManagementActionFeature from "./actionViews/SubjectManagementActionFeature";

const SubjectManagementFeature = () => {
  const {
    filterForm,
    list,
    loading,
    page,
    pageSize,
    localStrings,
    columns,
    createSubjectModal,
    editSubjectModal,
    selectedSubject,
    setCreateSubjectModal,
    setEditSubjectModal,
    setSelectedSubject,
    fetchList,
    setPage,
    handleSearch,
    handleTableChange,
    handleCreateSubjectSuccess,
    handleEditSubjectSuccess,
  } = SubjectManagementViewModel();

  return (
    <CardComponent
      data={{
        title: localStrings.SubjectManagement.Main,
        extra: (
          <Fragment key={0}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateSubjectModal(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {localStrings.SubjectManagement.CreateSubject}
            </Button>
          </Fragment>
        ),
        children: (
          <Form
            form={filterForm}
            onFinish={async () =>
              await handleSearch(filterForm?.getFieldsValue(true))
            }
          >
            <Row gutter={[2, 2]}>
              {FilterComponent(
                SubjectManagementConstants?.filters(localStrings)
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
                  scroll: { x: 800, y: 600 },
                }}
              />
            </Row>
            <SubjectManagementActionFeature
              open={createSubjectModal}
              onClose={() => setCreateSubjectModal(false)}
              onSuccess={handleCreateSubjectSuccess}
              isEdit={false}
            />
            <SubjectManagementActionFeature
              open={editSubjectModal}
              onClose={() => {
                setEditSubjectModal(false);
                setSelectedSubject(null);
              }}
              onSuccess={handleEditSubjectSuccess}
              subjectId={selectedSubject?.id}
              isEdit={true}
            />
          </Form>
        ),
      }}
    />
  );
};

export default SubjectManagementFeature;
