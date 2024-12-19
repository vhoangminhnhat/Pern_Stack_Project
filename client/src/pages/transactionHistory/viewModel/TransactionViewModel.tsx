import { FileSearchOutlined } from "@ant-design/icons";
import { Button, message, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import popUpComponent from "components/generalComponents/popUpComponent/PopUpComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { default as dayjs, default as moment } from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import api from "utils/axios";
import { colorFormat } from "utils/format/ColorFormat";
import { formatCurrency, getStatus } from "utils/helpersInTs/helpersInTs";

const { Text } = Typography;
const defaultDate: any = [
  dayjs(moment().subtract(15, "days")),
  dayjs(moment()),
];
const DATE_FORMAT = "YYYY-MM-DD 00:00:00";

const TransactionViewModel = () => {
  const { user, getPartnerInfo, localStrings } = AuthenticationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [transId, setTransId] = useState("");
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [paramsExport, setParamsExport] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState("");
  const [transRef, setTransRef] = useState("");
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partnerList, setPartnerList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [method, setMethod] = useState(localStrings.GlobalLabels.All);
  const [partner, setPartner] = useState(localStrings.GlobalLabels.All);
  const [selectedDate, setSelectedDate] = useState({
    from: moment().subtract(15, "days").format(DATE_FORMAT),
    to: moment().add(1, "day").format(DATE_FORMAT),
  });
  const [modal, setModal] = useState<boolean>(false);

  const columnsTable: ColumnsType<any> = [
    {
      title: "STT",
      width: "4%",
      render: (item, record, index) => (
        <span style={{ fontWeight: "bold" }}>
          {(page - 1) * pageSize + index + 1}
        </span>
      ),
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.ID,
      dataIndex: "id",
      key: "id",
      width: "11%",
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.Code,
      dataIndex: "privateCode",
      key: "code",
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.TransRef,
      dataIndex: "transRef",
      key: "transRef",
      align: "center",
      render: (text) =>
        isEmpty(text) ? localStrings.TransactionHistory.NoTransRef : text,
    },
    {
      title: localStrings.TransactionHistory.Columns.PackageName,
      key: "id",
      align: "center",
      width: "7%",
      render: (value, record) => (
        <span className="text-center">{record.mobileData.name}</span>
      ),
    },
    {
      title: localStrings.TransactionHistory.Columns.Phone,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: localStrings.TransactionHistory.Columns.Partner,
      dataIndex: "partner",
      key: "partner",
      align: "center",
      render: (text) => {
        if (isEmpty(text)) {
          return <span>{localStrings.TransactionHistory.Customer}</span>;
        } else if (!isEmpty(text) && user?.isAdmin === false) {
          getPartnerInfo(text);
          return <span>{text[0]?.toUpperCase() + text?.slice(1)}</span>;
        } else if (!isEmpty(text) && user?.isAdmin === true) {
          return <span>{text[0]?.toUpperCase() + text?.slice(1)}</span>;
        }
      },
    },
    {
      title: localStrings.GlobalLabels.Status,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (value) => (
        <span className="capitalize text-center">
          {getStatus(value, localStrings)}
        </span>
      ),
    },
    {
      title: localStrings.TransactionHistory.Columns.Method,
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      render: (value) =>
        isEmpty(value) ? localStrings.GlobalLabels.NoInfo : value,
    },
    {
      title: localStrings.GlobalLabels.createdAt,
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (value) => (
        <span className="text-center">
          {moment(value).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: localStrings.TransactionHistory.Columns.TotalAmount,
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      render: (value) => (
        <span className="text-center font-bold text-green-700">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: localStrings.GlobalLabels.Actions,
      key: "action",
      align: "center",
      width: "6%",
      fixed: "right",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-3">
          <Tooltip title={localStrings.GlobalLabels.Detail}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              icon={<FileSearchOutlined className="text-blue-700" />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleTotal = (total) => (
    <Text className="left-0 absolute font-medium">
      {localStrings.TransactionHistory.Total}:
      <Text style={{ color: colorFormat?.Blue }} className="text-base ml-2">
        {total}
      </Text>{" "}
    </Text>
  );

  const handleOnChange = (e) => {
    setError({});
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const getLottery = async (args?: any) => {
    try {
      setLoading(true);
      const params = {
        query: JSON.stringify({
          createdAt: { ">=": selectedDate?.from, "<": selectedDate?.to },
        }),
        page: page - 1,
        transRef:
          transRef === "" ||
          transRef === localStrings.TransactionHistory.NoTransRef
            ? undefined
            : transRef,
        paymentMethod:
          method === "" || method === localStrings.GlobalLabels.All
            ? undefined
            : method,
        limit: pageSize,
        view: true,
      };
      let response: any = await api.get("/api/v1/mobile/data/transactions", {
        params: args || params,
      });

      setData(response.data);
      setTotal(response.pagination.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      popUpComponent.error(err && err?.message, 4);
    }
  };

  const getPaymentMethod = async () => {
    try {
      await api.get("/api/v1/payment/methods/getAll").then((res) => {
        let data = [
          {
            code: localStrings.GlobalLabels.All,
            name: localStrings.GlobalLabels.All,
          },
          ...res?.data,
        ];
        setPaymentMethod(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPartnerList = async () => {
    try {
      const res = await api.get("/api/v1/partner/list", {
        params: { limit: 1000 },
      });
      if (res) {
        let data = [
          {
            id: localStrings.GlobalLabels.All,
            name: localStrings.GlobalLabels.All,
          },
          {
            id: null,
            name: localStrings.TransactionHistory.Customer,
          },
          ...res?.data,
        ];
        setPartnerList(data);
      }
    } catch (error) {
      popUpComponent.error(
        localStrings.TransactionHistory.Message.PartnerListError,
        4
      );
      console.log(error);
    }
  };

  const handleViewDetails = async (payload) => {
    const { data } = await api.get(
      `/api/v1/mobile/data/transaction/detail/${payload.id}`
    );
    setInfo({
      ...data,
      created: payload?.createdAt,
      method: payload?.paymentMethod,
    });
    setShowModal(true);
  };

  const handleOnChangeValue = (name, value) => {
    setInfo({ ...info, [name]: value });
  };

  const getTransaction = async (page, limit, transRef, method, args) => {
    for (const [key, value] of Object.entries(args)) {
      if (typeof value === "string" && !value) {
        delete args[key];
      }
    }
    await getLottery({
      page,
      limit,
      transRef,
      paymentMethod: method,
      query: JSON.stringify(args),
    });
  };

  const handleSearch = async () => {
    setPage(1);
    await getTransaction(
      0,
      pageSize,
      transRef === "" || transRef === localStrings.TransactionHistory.NoTransRef
        ? undefined
        : transRef,
      method === "" || method === localStrings.GlobalLabels.All
        ? undefined
        : method,
      {
        ...paramsExport,
        createdAt: { ">=": selectedDate?.from, "<": selectedDate?.to },
      }
    );
  };

  const handleFilter = (value) => {
    setFilter(value);
    setParamsExport({
      ...paramsExport,
      status:
        value === "" || value === localStrings.GlobalLabels.All
          ? undefined
          : value,
    });
  };

  const handleCode = ({ target }) => {
    setCode(target.value);
    setParamsExport({
      ...paramsExport,
      code: target.value === "" ? undefined : target.value,
    });
  };

  const handleTransRef = ({ target }) => {
    setTransRef(target.value);
  };

  const handleMethod = (value) => {
    setMethod(value);
  };

  const handlePhoneNumber = ({ target }) => {
    setPhoneNumber(target.value);
    setParamsExport({
      ...paramsExport,
      phoneNumber: target.value === "" ? undefined : target.value,
    });
  };

  const handleTransId = ({ target }) => {
    setTransId(target?.value);
    setParamsExport({
      ...paramsExport,
      id: target?.value === "" ? undefined : target?.value,
    });
  };

  const handlePartners = (value) => {
    setPartner(value);
    setParamsExport({
      ...paramsExport,
      partner:
        value === "" || value === localStrings.GlobalLabels.All
          ? undefined
          : value,
    });
  };

  const handleDate = (value) => {
    const fromDate = value[0].format(DATE_FORMAT);
    const toDate = value[1].add(1, "days").format(DATE_FORMAT);
    setSelectedDate({
      from: fromDate,
      to: toDate,
    });
    setParamsExport({
      ...paramsExport,
      createdAt: { ">=": fromDate, "<": toDate },
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setReadOnly(false);
    setEdit(false);
    setInfo({});
    setError({});
  };

  const handleTableChange = async (pagination) => {
    setPageSize(pagination?.pageSize);
    setPage(pagination?.current);
    await getTransaction(
      pagination?.current - 1,
      pagination?.pageSize,
      transRef === "" || transRef === localStrings.TransactionHistory.NoTransRef
        ? undefined
        : transRef,
      method === "" || method === localStrings.GlobalLabels.All
        ? undefined
        : method,
      {
        ...paramsExport,
        createdAt: { ">=": selectedDate?.from, "<": selectedDate?.to },
      }
    );
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      let params = {
        status: filter === "" ? undefined : filter,
        phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
        code: code === "" ? undefined : code,
        transRef:
          transRef === "" ||
          transRef === localStrings.TransactionHistory.NoTransRef
            ? undefined
            : transRef,
        partner:
          partner === "" || partner === localStrings.GlobalLabels.All
            ? undefined
            : partner,
        paymentMethod:
          method === "" || method === localStrings.GlobalLabels.All
            ? undefined
            : method,
        startDate: selectedDate?.from,
        endDate: selectedDate?.to,
      };
      const res = await api.get(
        "/api/v1/mobile/data/transactions/exportTransaction",
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
          params: { ...params },
        }
      );
      if (res) {
        const file = new Blob([res as any], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `Lich_su_giao_dich_${moment(
          selectedDate?.from,
          "YYYY-MM-DD"
        ).format("DD-MM-YYYY")}_${moment(selectedDate?.to, "YYYY-MM-DD")
          .subtract(1, "day")
          .format("DD-MM-YYYY")}.xlsx`;
        link.click();
        setExportLoading(false);
      }
    } catch (error) {
      console.log(error);
      setExportLoading(false);
      message.error({
        content: "Có lỗi hệ thống xuất Báo cáo !",
        duration: 4,
      });
    }
  };

  useEffect(() => {
    if (user?.isAdmin === true) {
      getPartnerList();
    }
  }, [user]);

  useEffect(() => {
    getLottery();
    getPaymentMethod();
  }, []);
  return {
    loading,
    error,
    transId,
    info,
    data,
    total,
    page,
    pageSize,
    showModal,
    exportLoading,
    paramsExport,
    readOnly,
    edit,
    filter,
    transRef,
    code,
    phoneNumber,
    partnerList,
    paymentMethod,
    method,
    partner,
    selectedDate,
    user,
    modal,
    setModal,
    getPartnerInfo,
    columnsTable,
    defaultDate,
    handleTotal,
    handleOnChange,
    handleOnChangeValue,
    handleSearch,
    handleFilter,
    handleTransRef,
    handleClose,
    handleCode,
    handleDate,
    handleExport,
    handlePartners,
    handlePhoneNumber,
    handleTableChange,
    handleMethod,
    handleTransId,
  };
};

export default TransactionViewModel;
