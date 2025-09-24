import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { TeacherManagementResponseModel } from "api/repositories/teacherManagement/model/TeacherManagementResponseModel";
import { defaultTeacherManagementRepository } from "api/repositories/teacherManagement/TeacherManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage, paramsChecking } from "utils/helpersInTs/helpersInTs";
import { TeacherManagementConstants } from "../constants/TeacherManagementConstants";

interface TeacherRequestModel {
  fullName?: string;
  username?: string;
  gender?: string;
  page?: number;
  limit?: number;
}

const TeacherManagementViewModel = () => {
  const [list, setList] = useState<Array<TeacherManagementResponseModel>>([]);
  const [loading, setLoading] = useState(false);
  const [createTeacherModal, setCreateTeacherModal] = useState(false);
  const [editTeacherModal, setEditTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherManagementResponseModel | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paramsExport, setParamsExport] = useState<TeacherRequestModel>({
    page: 0,
    limit: 10,
  });
  const [filterForm] = Form.useForm();

  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: TeacherRequestModel) => {
    try {
      setLoading(true);
      const response = await defaultTeacherManagementRepository.getList(params);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      getMessage("Failed to fetch teachers", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (values: TeacherRequestModel) => {
    let params = {
      fullName: paramsChecking(values?.fullName, "input"),
      username: paramsChecking(values?.username, "input"),
      gender: paramsChecking(values?.gender, "select"),
      page: 0,
      limit: pageSize,
    } as typeof values;
    setParamsExport(params);
    await fetchList(params);
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      await defaultTeacherManagementRepository.deleteTeacher(id);
      getMessage(localStrings.TeacherManagement.DeleteTeacherSuccess, 4, "success");
      await fetchList(paramsExport);
    } catch (error) {
      getMessage(localStrings.TeacherManagement.DeleteTeacherFailed, 4, "error");
    }
  };

  const handleEditTeacher = (teacher: TeacherManagementResponseModel) => {
    setSelectedTeacher(teacher);
    setEditTeacherModal(true);
  };

  const handleCreateTeacherSuccess = async () => {
    await fetchList(paramsExport);
  };

  const handleEditTeacherSuccess = async () => {
    setSelectedTeacher(null);
    await fetchList(paramsExport);
  };

  const columns: ColumnsType<TeacherManagementResponseModel> = [
    ...TeacherManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Tooltip title="Edit Teacher">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => handleEditTeacher(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Teacher">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={() => handleDeleteTeacher(record.id!)}
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
    createTeacherModal,
    editTeacherModal,
    selectedTeacher,
    setCreateTeacherModal,
    setEditTeacherModal,
    setSelectedTeacher,
    handleSearch,
    fetchList,
    setPage,
    handleTableChange,
    handleCreateTeacherSuccess,
    handleEditTeacherSuccess,
  };
};

export default TeacherManagementViewModel;
