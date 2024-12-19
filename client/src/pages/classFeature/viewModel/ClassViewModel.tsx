import { Form } from "antd";
import { ClassManagementRequestModel } from "api/repositories/classManagement/model/ClassManagementRequestModel";
import { ClassManagementResponseModel } from "api/repositories/classManagement/model/ClassManagementResponseModel";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import React, { useEffect, useState } from "react";

const ClassViewModel = () => {
  const [list, setLits] = useState<Array<ClassManagementResponseModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterForm] = Form.useForm();

  const fetchList = async (params: ClassManagementRequestModel) => {
    try {
      setLoading(true);
      setLits([
        {
          name: "Thực hành mạng Viễn Thông",
          code: "practice_T01",
          createdAt: "08/12/2024",
          duration: 8,
          schedule: "Thứ 2 (9:00 AM) - Thứ 4 (01:00 PM)",
          type: 0,
        },
        {
          name: "Khởi nghiệp",
          code: "theory_T01",
          createdAt: "08/12/2024",
          duration: 10,
          schedule: "Thứ 5 (7:30 AM) - Thứ 7 (09:00 AM)",
          type: 1,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = async (pagination?: DefaultPagingModel | any) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize);
  };

  useEffect(() => {
    fetchList({ page: 0, limit: 10 });
  });
  return {
    list,
    loading,
    page,
    pageSize,
    fetchList,
    filterForm,
    setPage,
    handleTableChange,
  };
};

export default ClassViewModel;
