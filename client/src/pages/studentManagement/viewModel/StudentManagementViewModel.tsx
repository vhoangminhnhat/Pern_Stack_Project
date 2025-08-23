import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { StudentManagementResponseModel } from "api/repositories/studentManagement/model/StudentManagementResponseModel";
import { StudentManagmentRequestModel } from "api/repositories/studentManagement/model/StudentManagmentRequestModel";
import { defaultStudentManagementRepository } from "api/repositories/studentManagement/StudentManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage, paramsChecking } from "utils/helpersInTs/helpersInTs";
import { StudentManagementConstants } from "../constants/StudentManagementConstants";

const StudentManagementViewModel = () => {
  const [list, setList] = useState<Array<StudentManagementResponseModel>>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [detailInfo, setDetailInfo] =
    useState<StudentManagementResponseModel | null>(null);
  const [summary, setSummary] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paramsExport, setParamsExport] =
    useState<StudentManagmentRequestModel>({
      page: 0,
      limit: 10,
    });
  const [filterForm] = Form.useForm();
  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: StudentManagmentRequestModel) => {
    try {
      setLoading(true);
      const response = await defaultStudentManagementRepository.getList(params);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      getMessage("Failed to fetch students", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (values: StudentManagmentRequestModel) => {
    let params = {
      fullName: paramsChecking(values?.fullName, "input"),
      gender: paramsChecking(values?.gender, "select"),
      studentId: paramsChecking(values?.studentId, "input"),
      page: 0,
      limit: pageSize,
    } as typeof values;
    setParamsExport(params);
    await fetchList(params);
  };

  //   const handleActions = async (
  //     formData: FormData,
  //     action: "create" | "update"
  //   ) => {
  //     if (action === "create") {
  //       await createArticle(formData);
  //     } else if (action === "update" && detailInfo?.code) {
  //       await updateArticle(detailInfo.code, formData);
  //     }
  //   };

  const columns: ColumnsType<StudentManagementResponseModel> = [
    ...StudentManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      width: "13%",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Tooltip title="Dự đoán rớt học">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<InfoCircleOutlined className="text-blue-500" />}
              onClick={async () => {
                await handlePredictDropout([record.studentId]);
              }}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<InfoCircleOutlined />}
              //   onClick={async () => {
              //     await window?.navigator?.clipboard?.writeText(record.url);
              //     setModal(true);
              //     getMessage(
              //       localStrings.FileManagement.Placeholder.Url,
              //       4,
              //       "success"
              //     );
              //   }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleTableChange = async (pagination?: DefaultPagingModel | any) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize);
    let params = {
      ...paramsExport,
      page: pagination?.current! - 1,
      limit: pagination?.pageSize,
    };
    await fetchList(params);
  };

  // Predict dropout for selected students
  const handlePredictDropout = async (studentIds: string[]) => {
    try {
      setLoading(true);
      const response = await defaultStudentManagementRepository.predictDropout({ studentIds });
      if (response?.data) {
        getMessage("Dropout prediction completed successfully", 4, "success");
        // Refresh the list to show updated predictions
        await fetchList(paramsExport);
      }
    } catch (error) {
      getMessage("Failed to predict dropout", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  // Import Excel file for dropout prediction
  const handleImportExcelForDropout = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await defaultStudentManagementRepository.predictDropoutFromFile(formData);
      if (response?.data) {
        getMessage("Excel file processed successfully", 4, "success");
        // Refresh the list to show updated predictions
        await fetchList(paramsExport);
      }
    } catch (error) {
      getMessage("Failed to process Excel file", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  // Get dropout prediction data for export
  const handleExportDropoutData = async () => {
    try {
      setLoading(true);
      const response = await defaultStudentManagementRepository.getDropoutPredictionData();
      if (response?.data) {
        // You can implement CSV/Excel export logic here
        console.log("Dropout prediction data:", response.data);
        getMessage("Dropout data exported successfully", 4, "success");
      }
    } catch (error) {
      getMessage("Failed to export dropout data", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(paramsExport);
  }, []);

  return {
    list,
    loading,
    page,
    pageSize,
    columns,
    modal,
    summaryModal,
    summary,
    setSummaryModal,
    handleSearch,
    setModal,
    fetchList,
    filterForm,
    setPage,
    handleTableChange,
    detailInfo,
    handlePredictDropout,
    handleImportExcelForDropout,
    handleExportDropoutData,
  };
};

export default StudentManagementViewModel;
