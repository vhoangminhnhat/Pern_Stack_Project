import { FileSearchOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "utils/axios";
import { simOrdersForPartnersConstants } from "../constants/SimOrdersForPartnersConstants";
import { ExcelReportsFeature } from "../views/excelViews/ExcelReportsFeature";

const SimOrdersForPartnersViewModel = () => {
  const { user, localStrings } = AuthenticationContext();
  const ExcelJS = require("exceljs");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [simList, setSimList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [exportLoading, setExportLoading] = useState(false);
  const [actionForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [paramsExport, setParamsExport] = useState({
    page: 0,
    limit: 10,
    start: moment().add(-15, "days").format("DD-MM-YYYY"),
    end: moment().format("DD-MM-YYYY"),
  });
  const [info, setInfo] = useState({});

  const getList = async (values) => {
    try {
      setLoading(true);
      await api
        .get("/api/v1/kit/transaction/list", { params: { ...values } })
        .then((res: any) => {
          setList(res?.data);
          setTotal(res?.paging?.total);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      message.error({
        content: `Lỗi lấy danh sách: ${error?.error?.message}`,
        duration: 5,
      });
      setLoading(false);
    }
  };

  const getPartnerList = async () => {
    try {
      await api
        .get("/api/v1/kit/partner/list", {
          params: { limit: 1000 },
        })
        .then((res) => {
          let data = [
            {
              id: localStrings.GlobalLabels.All,
              name: localStrings.GlobalLabels.All,
              code: localStrings.GlobalLabels.All,
            },
            ...res?.data,
          ];
          setPartnerList(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getPacakgeList = async () => {
    try {
      //Calling api here (later on)
      await api.get("/api/v1/kit/package/list").then((res) => {
        let data = [
          {
            name: localStrings.GlobalLabels.All,
            code: localStrings.GlobalLabels.All,
          },
          ...res?.data,
        ];
        setPackageList(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleActions = async (values, action, info) => {
    switch (action) {
      case "edit":
        try {
          setActionLoading(true);
          let body = {
            ...values,
            number:
              values?.number === info?.number ? undefined : values?.number,
          };
          await api.post("/api/v1/kit/update", body).then(async () => {
            message.success({
              content: localStrings.GlobalMessage.UpdateSuccessfully,
              duration: 4,
            });
            setActionLoading(false);
            await getList({
              page: 0,
              limit: 10,
              start: moment().add(-15, "days").format("DD-MM-YYYY"),
              end: moment().format("DD-MM-YYYY"),
            });
            actionForm.resetFields();
            setModal(false);
          });
        } catch (error) {
          console.log(error);
          message.error({
            content: `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
            duration: 5,
          });
          setActionLoading(false);
        }
        break;
      case "create":
        try {
          setActionLoading(true);
          let packageCode = packageList?.filter(
            (item) => item?.name === values?.package
          );
          let body = {
            ...values,
            package: packageCode[0]?.code,
          };
          await api.post("/api/v1/kit/create", body).then(async () => {
            message.success({
              content: localStrings.GlobalMessage.CreateSuccessfully,
              duration: 5,
            });
            setActionLoading(false);
            await getList({
              page: 0,
              limit: 10,
              start: moment().add(-15, "days").format("DD-MM-YYYY"),
              end: moment().format("DD-MM-YYYY"),
            });
            actionForm.resetFields();
            setSimList([]);
            setModal(false);
          });
        } catch (error) {
          console.log(error);
          message.error({
            content: `${localStrings.GlobalMessage.CreateFailed} ${error?.error?.message}`,
            duration: 5,
          });
          setActionLoading(false);
        }
        break;
    }
  };

  const getSimList = debounce(async (value) => {
    try {
      const res = await api.get("/api/v1/transaction/sim/findSim", {
        params: { keyword: value, page: 0, limit: 20 },
      });
      setSimList(res?.data);
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  const CreateFile = async (params) => {
    const workbook = new ExcelJS.Workbook();
    try {
      let res = await api.get("/api/v1/report/kit/list-trans", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { ...params },
      });
      await ExcelReportsFeature(
        workbook,
        "Lich_su_dang_ky_Bo_Kit",
        params,
        res?.data,
        user?.isAdmin
      );
      const buff = await workbook.xlsx.writeBuffer();
      return buff;
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = async (value) => {
    try {
      setExportLoading(true);
      const res = await CreateFile(value);
      if (res) {
        const file = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `Lich_su_dang_ky_Bo_Kit.xlsx`;
        link.click();
        setExportLoading(false);
      }
    } catch (error) {
      console.log(error);
      setExportLoading(false);
      message.error({
        content: `${localStrings.SimOrdersForPartners.Message.ExcelError}: ${error?.error?.message}`,
        duration: 5,
      });
    }
  };

  const handleDetails = async (info) => {
    actionForm.resetFields();
    setInfo(info);
    setModal(true);
  };

  const columnsTable = [
    ...simOrdersForPartnersConstants(localStrings)?.mainColumns,
    {
      title: localStrings.GlobalLabels.Actions,
      key: "action",
      align: "center",
      width: "8%",
      fixed: "right",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleDetails(record)}
            icon={<FileSearchOutlined />}
          >
            {localStrings.GlobalLabels.Update}
          </Button>
        </>
      ),
    },
  ];

  const handleSearch = async (values, action) => {
    switch (action) {
      case "search":
        let params: any = {
          limit: pageSize,
          page: 0,
          package:
            values?.package === "" ||
            values?.package === localStrings.GlobalLabels.All
              ? undefined
              : values?.package,
          partner:
            values?.number === "" ||
            values?.partner === localStrings.GlobalLabels.All
              ? undefined
              : values?.partner,
          number: values?.number === "" ? undefined : values?.number,
          customerPhone:
            values?.customerPhone === "" ? undefined : values?.customerPhone,
          email: values?.email === "" ? undefined : values?.email,
          start: moment(values?.date[0]?.$d).format("DD-MM-YYYY"),
          end: moment(values?.date[1]?.$d).format("DD-MM-YYYY"),
        };
        delete params?.date;
        setPage(0);
        setParamsExport(params);
        await getList(params);
        break;
    }
  };

  useEffect(() => {
    if (user?.isAdmin === true) {
      getPartnerList();
    }
  }, [user]);

  useEffect(() => {
    getPacakgeList();
    getList(paramsExport);
  }, []);

  const handleTableChange = async (pagination) => {
    setPage(pagination?.current - 1);
    setPageSize(pagination?.pageSize);
    let params = {
      ...paramsExport,
      page: pagination?.current - 1,
      limit: pagination?.pageSize,
    };
    setParamsExport(params);
    await getList(params);
  };

  return {
    list,
    loading,
    modal,
    total,
    page,
    pageSize,
    actionForm,
    setInfo,
    actionLoading,
    getSimList,
    simList,
    info,
    user,
    getPartnerList,
    handleExport,
    partnerList,
    packageList,
    getList,
    handleActions,
    exportLoading,
    setModal,
    statusList: simOrdersForPartnersConstants(localStrings)?.statusList,
    handleSearch,
    filterForm,
    columnsTable,
    handleTableChange,
  };
};

export default SimOrdersForPartnersViewModel;
