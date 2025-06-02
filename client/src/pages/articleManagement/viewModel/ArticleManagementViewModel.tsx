import { CopyOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { defaultArticleManagementRepository } from "api/repositories/articleManagement/ArticleManagementRepository";
import { ArticleManagementRequestModel } from "api/repositories/articleManagement/model/ArticleManagementRequestModel";
import { ArticleManagementResponseModel } from "api/repositories/articleManagement/model/ArticleManagementResponseModel";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { getMessage, paramsChecking } from "utils/helpersInTs/helpersInTs";
import { ArticleManagementConstants } from "../constants/ArticleManagementConstants";

export const ArticleManagementViewModel = () => {
  const [list, setList] = useState<ArticleManagementResponseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [detailInfo, setDetailInfo] =
    useState<ArticleManagementResponseModel | null>(null);
  const [summary, setSummary] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paramsExport, setParamsExport] =
    useState<ArticleManagementRequestModel>({
      page: 0,
      limit: 10,
    });
  const [filterForm] = Form.useForm();
  const { localStrings } = AuthenticationContext();

  const fetchList = async (params: ArticleManagementRequestModel) => {
    try {
      setLoading(true);
      const response = await defaultArticleManagementRepository.getList(params);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      getMessage("Failed to fetch articles", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (values: ArticleManagementRequestModel) => {
    let params = {
      name: paramsChecking(values?.name, "input"),
      code: paramsChecking(values?.code, "input"),
      url: paramsChecking(values?.url, "input"),
      page: 0,
      limit: pageSize,
    } as typeof values;
    setParamsExport(params);
    await fetchList(params);
  };

  const handleSummarize = async (code: string, url: string, type: string) => {
    try {
      setLoading(true);
      const response =
        await defaultArticleManagementRepository.summarizeArticle({
          code,
          url,
          type,
        });
      if (response?.data) {
        setSummary(response.data.summary);
        setDetailInfo(response.data.article);
        setSummaryModal(true);
      }
    } catch (error) {
      getMessage("Failed to summarize article", 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await defaultArticleManagementRepository.createArticle(
        formData
      );
      if (response?.data) {
        getMessage("Article created successfully", 4, "success");
        setModal(false);
        await fetchList({ page: 0, limit: pageSize });
      }
    } catch (error: any) {
      getMessage(
        error.response?.data?.error?.message || "Failed to create article",
        4,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (code: string, formData: FormData) => {
    try {
      setLoading(true);
      const response = await defaultArticleManagementRepository.updateArticle(
        code,
        formData
      );
      if (response?.data) {
        getMessage("Article updated successfully", 4, "success");
        setModal(false);
        await fetchList({ page: 0, limit: pageSize });
      }
    } catch (error: any) {
      getMessage(
        error.response?.data?.error?.message || "Failed to update article",
        4,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (code: string) => {
    try {
      setLoading(true);
      const response = await defaultArticleManagementRepository.deleteArticle(
        code
      );
      if (response?.data) {
        getMessage("Article deleted successfully", 4, "success");
        await fetchList({ page: 0, limit: pageSize });
      }
    } catch (error: any) {
      getMessage(
        error.response?.data?.error?.message || "Failed to delete article",
        4,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleActions = async (
    formData: FormData,
    action: "create" | "update"
  ) => {
    if (action === "create") {
      await createArticle(formData);
    } else if (action === "update" && detailInfo?.code) {
      await updateArticle(detailInfo.code, formData);
    }
  };

  const columns: ColumnsType<ArticleManagementResponseModel> = [
    ...ArticleManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      width: "13%",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center items-center">
          <Tooltip title="Các bài báo liên quan">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<IoNewspaper className="text-blue-500" />}
              onClick={async () =>
                await handleSummarize(record.code, record.url, "relation")
              }
            ></Button>
          </Tooltip>
          <Tooltip title="Summarize">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<IoNewspaper className="text-blue-500" />}
              onClick={async () =>
                await handleSummarize(record.code, record.url, "summary")
              }
            ></Button>
          </Tooltip>
          <Tooltip title="Tóm tắt bài báo">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<CopyOutlined className="text-yellow-500" />}
              onClick={async () => {
                await window?.navigator?.clipboard?.writeText(record.url);
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
    handleActions,
  };
};

export default ArticleManagementViewModel;
