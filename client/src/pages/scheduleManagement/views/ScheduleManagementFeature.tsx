import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { Fragment } from "react";
import { ScheduleManagementConstants } from "../constants/ScheduleManagementConstants";
import ScheduleManagementViewModel from "../viewModel/ScheduleManagementViewModel";
import ScheduleManagementActionFeature from "./actionViews/ScheduleManagementActionFeature";

const ScheduleManagementFeature = () => {
  const {
    filterForm,
    list,
    loading,
    page,
    pageSize,
    localStrings,
    columns,
    createScheduleModal,
    editScheduleModal,
    selectedSchedule,
    teacherList,
    subjectList,
    setCreateScheduleModal,
    setEditScheduleModal,
    setSelectedSchedule,
    fetchList,
    setPage,
    handleSearch,
    handleTableChange,
    handleCreateScheduleSuccess,
    handleEditScheduleSuccess,
  } = ScheduleManagementViewModel();

  return (
    <CardComponent
      data={{
        title: localStrings.ScheduleManagement.Main,
        extra: (
          <Fragment key={0}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateScheduleModal(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {localStrings.ScheduleManagement.CreateSchedule}
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
                ScheduleManagementConstants?.filters(
                  localStrings,
                  teacherList,
                  subjectList
                )
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
                  scroll: { x: 1200, y: 600 },
                }}
              />
            </Row>
            <ScheduleManagementActionFeature
              open={createScheduleModal}
              teacherList={teacherList}
              subjectList={subjectList}
              onClose={() => setCreateScheduleModal(false)}
              onSuccess={handleCreateScheduleSuccess}
              isEdit={false}
            />
            <ScheduleManagementActionFeature
              open={editScheduleModal}
              teacherList={teacherList}
              subjectList={subjectList}
              onClose={() => {
                setEditScheduleModal(false);
                setSelectedSchedule(null);
              }}
              onSuccess={handleEditScheduleSuccess}
              scheduleId={selectedSchedule?.id}
              isEdit={true}
            />
          </Form>
        ),
      }}
    />
  );
};

export default ScheduleManagementFeature;
