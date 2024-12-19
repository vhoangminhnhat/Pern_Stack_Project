import { Checkbox, Modal, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { ErrorData } from "api/repositories/packagesManagement/topupManagement/model/listFromB2B/addPackageFromB2B/AddPackageFromB2BResponseModel";
import { ListFromB2BRequestModel } from "api/repositories/packagesManagement/topupManagement/model/listFromB2B/ListFromB2BRequestModel";
import { ListFromB2BResponseModel } from "api/repositories/packagesManagement/topupManagement/model/listFromB2B/ListFromB2BResponseModel";
import { defaultTopupManagementRepository } from "api/repositories/packagesManagement/topupManagement/TopupManagementRepository";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { IB2BDataModal } from "../actionViews/actionTypes/topUpActionType";

const ImportFromB2BFeature = (props: IB2BDataModal) => {
  const { getListData, onCancel, visible } = props?.data;
  const [data, setData] = useState([]);
  const { localStrings } = AuthenticationContext();

  useEffect(() => {
    if (visible) {
      getB2BData({ page: 0, limit: 10 });
    } else {
      setSelectedRecord([]);
    }
  }, [visible]);

  const [selectedRecord, setSelectedRecord] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [b2bPage, setB2bPage] = useState<number>(0);
  const [b2bPageSize, setB2bPageSize] = useState<number>(10);
  const [b2bTotal, setB2bTotal] = useState<number>(0);
  const [errorData, setErrorData] = useState<ErrorData[]>([]);

  const getB2BData = async (params: ListFromB2BRequestModel) => {
    try {
      setLoading(true);
      const res = await defaultTopupManagementRepository?.getListFromB2B(
        params
      );
      if (res) {
        setData(res?.data);
        setB2bTotal(res?.paging?.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ListFromB2BResponseModel> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      title: localStrings.TopupManagement.Columns.Name,
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: localStrings.TopupManagement.Columns.Code,
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: localStrings.TopupManagement.Columns.DurationDay,
      dataIndex: "durationDay",
      key: "durationDay",
      align: "center",
      render: (text) => (
        <span className="font-medium">
          {text} {localStrings.GlobalLabels.Date}
        </span>
      ),
    },
    {
      title: localStrings.TopupManagement.Columns.Price,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => (
        <span className="text-green-500 font-medium">
          {new Intl.NumberFormat().format(parseInt(text as string))}
        </span>
      ),
    },
    {
      title: "Discount rate",
      dataIndex: "discountRate",
      key: "discountRate",
      align: "center",
    },
    {
      title: localStrings.GlobalLabels.Description,
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip
          placement="bottomLeft"
          title={<span style={{ color: "#0f0f0f" }}>{text}</span>}
          color="#f5f7fa"
        >
          {text}
        </Tooltip>
      ),
    },
    {
      title: localStrings.GlobalLabels.Actions,
      key: "action",
      align: "center",
      fixed: "right",
      width: "8%",
      render: (text, record) => (
        <span>
          <Checkbox
            value={selectedRecord.indexOf(record) !== -1}
            onChange={(e) => onCheckRecord(e, record)}
          />
        </span>
      ),
    },
  ];

  const onCheckRecord = (e, record) => {
    const { checked } = e.target;
    if (checked) {
      selectedRecord.push(record);
    } else {
      const newSelectedRecord = [...selectedRecord];
      const selectedIndex = newSelectedRecord.indexOf(record);
      if (selectedIndex > -1) newSelectedRecord.splice(selectedIndex, 1);
      setSelectedRecord(newSelectedRecord);
    }
  };

  const onAddRecord = async () => {
    try {
      const res = await defaultTopupManagementRepository?.importListFromB2B(
        selectedRecord
      );
      if (res) {
        if (!isEmpty(res?.errData) && isEmpty(res?.passedData)) {
          setErrorData(res?.errData);
          getMessage(localStrings.GlobalMessage.UpdateFailed, 5, "error");
          await getListData({ page: 0, limit: 10, pagination: 1 });
        } else if (!isEmpty(res?.errData) && !isEmpty(res?.passedData)) {
          setErrorData(res?.errData);
          getMessage(
            localStrings.GlobalMessage.UpdateSuccessfully,
            5,
            "warning"
          );
          setConfirmVisible(false);
          await getListData({ page: 0, limit: 10, pagination: 1 });
        } else if (isEmpty(res?.errData) && !isEmpty(res?.passedData)) {
          setErrorData(res?.errData);
          getMessage(
            localStrings.GlobalMessage.UpdateSuccessfully,
            5,
            "warning"
          );
          setConfirmVisible(false);
          await getListData({ page: 0, limit: 10, pagination: 1 });
          onCancel();
        }
      }
    } catch (error: any) {
      getMessage(
        `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
        5,
        "error"
      );
    }
  };

  const onOk = () => {
    if (selectedRecord.length === 0) {
      getMessage(
        localStrings.TopupManagement.SyncFromB2B.InvalidPackages,
        5,
        "warning"
      );
    } else {
      setConfirmVisible(true);
    }
  };

  const renderConfirmContent = () => {
    return (
      selectedRecord.length > 0 && (
        <div>
          <p>{localStrings.TopupManagement.SyncFromB2B.Confirm}: </p>
          {selectedRecord.map((item) => {
            return (
              <div className="flex flex-row gap-2">
                <p>{`${item?.name} - ${item?.code}`} </p>
                {!isEmpty(errorData) && (
                  <p className="text-red-600 italic font-medium">
                    -{" "}
                    {errorData
                      ?.filter((sub) => sub?.code === item?.code)
                      ?.map((children) => children?.descriptionError)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )
    );
  };

  const handleTableChange = async (paginations?: DefaultPagingModel) => {
    setB2bPage(paginations?.current! - 1);
    setB2bPageSize(paginations?.pageSize!);
    let params = {
      page: paginations?.current! - 1,
      limit: paginations?.pageSize!,
    };
    await getB2BData(params);
  };

  return (
    <Modal
      width={1700}
      centered
      destroyOnClose
      okText={localStrings.GlobalLabels.Create}
      onOk={onOk}
      cancelText={localStrings.GlobalLabels.Cancel}
      onCancel={() => {
        setSelectedRecord([]);
        setData([]);
        setErrorData([]);
        onCancel();
      }}
      title={localStrings.TopupManagement.SyncFromB2B.Title}
      open={visible}
    >
      <TableComponent<ListFromB2BResponseModel>
        data={{
          columns,
          dataSource: data,
          handleTableChange,
          loading,
          loadingTitle: "Loading...",
          page: b2bPage,
          pageSize: b2bPageSize,
          total: b2bTotal,
          totalTitle: localStrings.TopupManagement.Total,
          scroll: { x: 1200, y: 900 },
        }}
      />
      <Modal
        title={localStrings.GlobalLabels.Confirmed}
        onCancel={() => {
          setConfirmVisible(false);
          setErrorData([]);
        }}
        okText={localStrings.GlobalLabels.Confirmed}
        cancelText={localStrings.GlobalLabels.Cancel}
        onOk={async () => await onAddRecord()}
        open={confirmVisible}
      >
        {renderConfirmContent()}
      </Modal>
    </Modal>
  );
};

export default ImportFromB2BFeature;
