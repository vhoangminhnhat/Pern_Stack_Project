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

const ArticleManagementViewModel = () => {
  const [list, setLits] = useState<Array<ArticleManagementResponseModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [summaryModal, setSummaryModal] = useState<boolean>(false);
  const [detailInfo, setDetailinfo] = useState<ArticleManagementResponseModel>(
    {}
  );
  const [summary, setSummary] = useState<string>("");
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
      const response = await defaultArticleManagementRepository.getList({
        ...params,
        page: page,
        limit: pageSize,
      });
      if (response?.data) {
        setLits(response.data);
      }
    } catch (error) {
      console.log(error);
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

  const handleSummarize = async (article: ArticleManagementResponseModel) => {
    try {
      setLoading(true);
      const response =
        await defaultArticleManagementRepository.summarizeArticle({
          code: article?.code,
          url: article?.url,
        });

      setSummary(response.data.summary);
      setDetailinfo(article);
      setSummaryModal(true);
    } catch (error) {
      console.error(error);
      getMessage(localStrings.GlobalMessage.SystemError, 4, "error");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ArticleManagementResponseModel> = [
    ...ArticleManagementConstants?.mainColumns(localStrings),
    {
      title: localStrings.GlobalLabels.Actions,
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Summarize">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<IoNewspaper className="text-blue-500" />}
              onClick={async () => await handleSummarize(record)}
              // loading={loading}
            ></Button>
          </Tooltip>
          <Tooltip title="Tóm tắt bài báo">
            <Button
              shape="circle"
              type="default"
              className="flex justify-center items-center"
              icon={<CopyOutlined className="text-yellow-500" />}
              onClick={async () => {
                await window?.navigator?.clipboard?.writeText(record?.url);
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
  };
};

export default ArticleManagementViewModel;
