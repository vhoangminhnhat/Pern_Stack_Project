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
import { TeacherManagementConstants } from "../constants/TeacherManagementConstants";
import TeacherManagementViewModel from "../viewModel/TeacherManagementViewModel";
import TeacherManagementActionFeature from "./actionViews/TeacherManagementActionFeature";

const TeacherManagementFeature = () => {
  const {
    filterForm,
    list,
    loading,
    page,
    pageSize,
    localStrings,
    columns,
    createTeacherModal,
    editTeacherModal,
    selectedTeacher,
    setCreateTeacherModal,
    setEditTeacherModal,
    setSelectedTeacher,
    fetchList,
    setPage,
    handleSearch,
    handleTableChange,
    handleCreateTeacherSuccess,
    handleEditTeacherSuccess,
  } = TeacherManagementViewModel();

  return (
    <CardComponent
      data={{
        title: localStrings.TeacherManagement.Main,
        extra: (
          <Fragment key={0}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateTeacherModal(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {localStrings.TeacherManagement.CreateTeacher}
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
                TeacherManagementConstants?.filters(localStrings)
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
                  scroll: { x: 1400, y: 600 },
                }}
              />
            </Row>
            <TeacherManagementActionFeature
              open={createTeacherModal}
              onClose={() => setCreateTeacherModal(false)}
              onSuccess={handleCreateTeacherSuccess}
              isEdit={false}
            />
            <TeacherManagementActionFeature
              open={editTeacherModal}
              onClose={() => {
                setEditTeacherModal(false);
                setSelectedTeacher(null);
              }}
              onSuccess={handleEditTeacherSuccess}
              teacherId={selectedTeacher?.id}
              isEdit={true}
            />
          </Form>
        ),
      }}
    />
  );
};

export default TeacherManagementFeature;
