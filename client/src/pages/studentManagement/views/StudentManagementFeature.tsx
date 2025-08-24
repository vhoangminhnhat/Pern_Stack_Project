import {
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Row, Upload, message } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import DropoutPredictionModal from "components/modals/DropoutPredictionModal";
import { Fragment } from "react";
import { StudentManagementConstants } from "../constants/StudentManagementConstants";
import StudentManagementViewModel from "../viewModel/StudentManagementViewModel";
import StudentManagementActionFeature from "./actionViews/StudentManagementActionFeature";

const StudentManagementFeature = () => {
  const {
    filterForm,
    list,
    fileList,
    loading,
    page,
    pageSize,
    localStrings,
    columns,
    dropoutPredictionModal,
    dropoutPredictionResults,
    dropoutPredictionLoading,
    fetchList,
    setPage,
    setFileList,
    handleSearch,
    handleTableChange,
    setDropoutPredictionModal,
    handleImportExcelForDropout,
    handleExportDropoutData,
    createStudentModal,
    setCreateStudentModal,
    handleCreateStudentSuccess,
  } = StudentManagementViewModel();

  return (
    <CardComponent
      data={{
        title: localStrings.StudentManagement.Main,
        extra: (
          <Fragment key={0}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateStudentModal(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {localStrings.StudentManagement.CreateStudent}
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
                StudentManagementConstants?.filters(localStrings)
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
              <div className="col-span-12 lg:col-span-12 flex justify-end gap-2 mb-4">
                <Upload
                  beforeUpload={(file) => {
                    const isExcel =
                      file.type ===
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                      file.type === "application/vnd.ms-excel";
                    if (!isExcel) {
                      message.error("You can only upload Excel files!");
                      return false;
                    }
                    const isLt10M = file.size / 1024 / 1024 < 10;
                    if (!isLt10M) {
                      message.error("File must be smaller than 10MB!");
                      return false;
                    }
                    return false; // Prevent auto upload
                  }}
                  onChange={async ({ fileList }) => {
                    setFileList(fileList);
                    if (fileList.length > 0 && fileList[0].originFileObj) {
                      try {
                        await handleImportExcelForDropout(
                          fileList[0].originFileObj
                        );
                        setFileList([]);
                      } catch (error) {
                        console.error("Error processing file:", error);
                      }
                    }
                  }}
                  fileList={fileList}
                  maxCount={1}
                  accept=".xlsx,.xls"
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Upload Excel for Dropout Prediction
                  </Button>
                </Upload>

                <Button
                  icon={<SearchOutlined />}
                  onClick={async () => {
                    try {
                      await handleExportDropoutData();
                    } catch (error) {
                      console.error("Error exporting data:", error);
                    }
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Export Dropout Data
                </Button>
              </div>
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
                  scroll: { x: 2300, y: 800 },
                }}
              />
            </Row>
            <DropoutPredictionModal
              open={dropoutPredictionModal}
              onClose={() => setDropoutPredictionModal(false)}
              results={dropoutPredictionResults}
              loading={dropoutPredictionLoading}
            />
            <StudentManagementActionFeature
              open={createStudentModal}
              onClose={() => setCreateStudentModal(false)}
              onSuccess={handleCreateStudentSuccess}
            />
          </Form>
        ),
      }}
    />
  );
};

export default StudentManagementFeature;
