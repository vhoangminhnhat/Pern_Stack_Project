import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { ArticleManagementRequestModel } from "api/repositories/articleManagement/model/ArticleManagementRequestModel";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import React, { useEffect, useState } from "react";
import { ArticleManagementConstants } from "../constants/ArticleManagementConstants";
import { AuthenticationContext } from "context/AuthenticationContext";
import { CopyOutlined } from "@ant-design/icons";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const ArticleManagementViewModel = () => {
  const [list, setLits] = useState<Array<ArticleManagementResponseModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [filterForm] = Form.useForm();
  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: ArticleManagementRequestModel) => {
    try {
      setLoading(true);
      setLits([
        {
          name: "DistB-VNET: Distributed Cluster-based Blockchain Vehicular Ad-Hoc Networks through SDN-NFV for Smart City",
          code: "article_2412.04222",
          createdAt: "08/12/2024",
          source: "https://arxiv.org/abs/2412.04222",
        },
        {
          name: "ChainGuard: A Blockchain-based Authentication and Access Control Scheme for Distributed Networks",
          code: "article_2412.00677",
          createdAt: "08/12/2024",
          source: "https://arxiv.org/abs/2412.00677",
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ArticleManagementResponseModel> = [
    ...ArticleManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings?.GlobalLabels.Actions,
      key: "articleActions",
      align: "center",
      render: (record) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.ArticleManagement.Summarize}>
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<CopyOutlined className="text-yellow-500" />}
              onClick={async () => {
                await window?.navigator?.clipboard?.writeText(record?.source);
                setModal(true);
                getMessage(
                  localStrings.FileManagement.Placeholder.Url,
                  4,
                  "success"
                );
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

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
    columns,
    modal,
    setModal,
    fetchList,
    filterForm,
    setPage,
    handleTableChange,
  };
};

export default ArticleManagementViewModel;
