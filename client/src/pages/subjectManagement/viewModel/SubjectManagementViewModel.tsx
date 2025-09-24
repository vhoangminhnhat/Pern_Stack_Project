import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { SubjectManagementResponseModel } from "api/repositories/subjectManagement/model/SubjectManagementResponseModel";
import { defaultSubjectManagementRepository } from "api/repositories/subjectManagement/SubjectManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { getMessage, paramsChecking } from "utils/helpersInTs/helpersInTs";
import { SubjectManagementConstants } from "../constants/SubjectManagementConstants";

interface SubjectRequestModel {
  name?: string;
  code?: string;
  page?: number;
  limit?: number;
}

const SubjectManagementViewModel = () => {
  const [list, setList] = useState<Array<SubjectManagementResponseModel>>([]);
  const [loading, setLoading] = useState(false);
  const [createSubjectModal, setCreateSubjectModal] = useState(false);
  const [editSubjectModal, setEditSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectManagementResponseModel | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paramsExport, setParamsExport] = useState<SubjectRequestModel>({
    page: 0,
    limit: 10,
  });
  const [filterForm] = Form.useForm();

  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: SubjectRequestModel) => {
    try {
      setLoading(true);
      const response = await defaultSubjectManagementRepository.getList(params);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      getMessage("Failed to fetch subjects", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (values: SubjectRequestModel) => {
    let params = {
      name: paramsChecking(values?.name, "input"),
      code: paramsChecking(values?.code, "input"),
      page: 0,
      limit: pageSize,
    } as typeof values;
    setParamsExport(params);
    await fetchList(params);
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      await defaultSubjectManagementRepository.deleteSubject(id);
      getMessage(localStrings.SubjectManagement.DeleteSubjectSuccess, 4, "success");
      await fetchList(paramsExport);
    } catch (error) {
      getMessage(localStrings.SubjectManagement.DeleteSubjectFailed, 4, "error");
    }
  };

  const handleEditSubject = (subject: SubjectManagementResponseModel) => {
    setSelectedSubject(subject);
    setEditSubjectModal(true);
  };

  const handleCreateSubjectSuccess = async () => {
    await fetchList(paramsExport);
  };

  const handleEditSubjectSuccess = async () => {
    setSelectedSubject(null);
    await fetchList(paramsExport);
  };

  const columns: ColumnsType<SubjectManagementResponseModel> = [
    ...SubjectManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Tooltip title="Edit Subject">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => handleEditSubject(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Subject">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={() => handleDeleteSubject(record.id!)}
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
    createSubjectModal,
    editSubjectModal,
    selectedSubject,
    setCreateSubjectModal,
    setEditSubjectModal,
    setSelectedSubject,
    handleSearch,
    fetchList,
    setPage,
    handleTableChange,
    handleCreateSubjectSuccess,
    handleEditSubjectSuccess,
  };
};

export default SubjectManagementViewModel;
