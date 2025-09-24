import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { ScheduleManagementResponseModel } from "api/repositories/scheduleManagement/model/ScheduleManagementResponseModel";
import { defaultScheduleManagementRepository } from "api/repositories/scheduleManagement/ScheduleManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage, paramsChecking } from "utils/helpersInTs/helpersInTs";
import { ScheduleManagementConstants } from "../constants/ScheduleManagementConstants";

interface ScheduleRequestModel {
  teacherId?: string;
  subjectId?: string;
  className?: string;
  page?: number;
  limit?: number;
}

const ScheduleManagementViewModel = () => {
  const [list, setList] = useState<Array<ScheduleManagementResponseModel>>([]);
  const [loading, setLoading] = useState(false);
  const [createScheduleModal, setCreateScheduleModal] = useState(false);
  const [editScheduleModal, setEditScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleManagementResponseModel | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paramsExport, setParamsExport] = useState<ScheduleRequestModel>({
    page: 0,
    limit: 10,
  });
  const [filterForm] = Form.useForm();

  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: ScheduleRequestModel) => {
    try {
      setLoading(true);
      const response = await defaultScheduleManagementRepository.getList(params);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      getMessage("Failed to fetch schedules", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (values: ScheduleRequestModel) => {
    let params = {
      teacherId: paramsChecking(values?.teacherId, "select"),
      subjectId: paramsChecking(values?.subjectId, "select"),
      className: paramsChecking(values?.className, "input"),
      page: 0,
      limit: pageSize,
    } as typeof values;
    setParamsExport(params);
    await fetchList(params);
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      await defaultScheduleManagementRepository.deleteSchedule(id);
      getMessage(localStrings.ScheduleManagement.DeleteScheduleSuccess, 4, "success");
      await fetchList(paramsExport);
    } catch (error) {
      getMessage(localStrings.ScheduleManagement.DeleteScheduleFailed, 4, "error");
    }
  };

  const handleEditSchedule = (schedule: ScheduleManagementResponseModel) => {
    setSelectedSchedule(schedule);
    setEditScheduleModal(true);
  };

  const handleCreateScheduleSuccess = async () => {
    await fetchList(paramsExport);
  };

  const handleEditScheduleSuccess = async () => {
    setSelectedSchedule(null);
    await fetchList(paramsExport);
  };

  const columns: ColumnsType<ScheduleManagementResponseModel> = [
    ...ScheduleManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Tooltip title="Edit Schedule">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => handleEditSchedule(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Schedule">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={() => handleDeleteSchedule(record.id!)}
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

  useEffect(() => {
    fetchList(paramsExport);
  }, []);

  return {
    list,
    loading,
    page,
    pageSize,
    columns,
    localStrings,
    filterForm,
    createScheduleModal,
    editScheduleModal,
    selectedSchedule,
    setCreateScheduleModal,
    setEditScheduleModal,
    setSelectedSchedule,
    handleSearch,
    fetchList,
    setPage,
    handleTableChange,
    handleCreateScheduleSuccess,
    handleEditScheduleSuccess,
  };
};

export default ScheduleManagementViewModel;
