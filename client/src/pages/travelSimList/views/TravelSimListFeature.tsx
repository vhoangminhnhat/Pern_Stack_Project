import {
  EditOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  InfoCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Modal, Row, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { TravelSimResponseModel } from "api/repositories/travelSim/model/TravelSimResponseModel";
import { defaultTravelSimRepository } from "api/repositories/travelSim/TravelSimRepository";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import popUpComponent from "components/generalComponents/popUpComponent/PopUpComponent";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import TravelSimDetailModal from "components/modals/TravelSimDetailModal";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import React, { Fragment, useEffect } from "react";
import { colorFormat } from "utils/format/ColorFormat";
import { TravelSimConstants } from "../constants/TravelSimConstants";
import { ITravelSimListFeature } from "../interfaces/TravelSimInterfaces";
import { TravelSimListViewModel } from "../viewModel/TravelSimListViewModel";
import TravelSimUpdateFeature from "./actionViews/TravelSimUpdateFeature";
import UpdateProfileStatusFeature from "./updateProfileStatusViews/UpdateProfileStatusFeature";
import CreateProfileFeature from "./actionViews/CreateProfileFeature";
import VideoGenerationViewModel from "pages/videoGeneration/viewModel/VideoGenerationViewModel";

const TravelSimListFeature: React.FC<ITravelSimListFeature> = (
  props: ITravelSimListFeature
) => {
  const {
    loading,
    detailLoading,
    travelSimList,
    travelSimDetail,
    resultObject,
    actionModal,
    actionForm,
    page,
    limit,
    total,
    showModal,
    selectedProfileId,
    dialCode,
    detailImages,
    filterForm,
    nationList,
    updateModal,
    updateForm,
    setUpdateModal,
    updateProfileStatus,
    setNationList,
    fetchNation,
    handleUploadChange,
    setDialCode,
    setTravelSimDetail,
    setShowModal,
    setActionModal,
    getTravelSimDetail,
    handleTableChange,
    setQuery,
    setPage,
    setLimit,
    setSelectedProfileId,
    onAction,
    createModal,
    setCreateModal,
    signature,
    setSignature,
    clearSignature,
    submitLoading,
    uploadInfo,
    createStep,
    confirmInfo,
    confirmLoading,
    userData,
    profileType,
    setProfileType,
    sectionIds,
    userFiles,
    handleGenerateFiles,
    setCreateStep
  } = TravelSimListViewModel(
    props.travelSimRepository || defaultTravelSimRepository
  );
  
  const { localStrings, sessionLog } = AuthenticationContext();

  const actionButtons = (item: TravelSimResponseModel) => {
    if (item?.status === 4) {
      return (
        <>
          <Button
            type="primary"
            ghost
            shape="circle"
            onClick={() => {
              setSelectedProfileId(item?.profileId);
              setShowModal(true);
            }}
            icon={<FileSearchOutlined />}
          />
          <Tooltip
            title={localStrings.TravelSimListManagement.Labels.UpdateStatus}
          >
            <Button
              type="primary"
              ghost
              style={{
                color: colorFormat?.Green,
                borderColor: colorFormat?.Green,
              }}
              shape="circle"
              onClick={async () => {
                setTravelSimDetail(item);
                setSelectedProfileId(item?.profileId);
                setUpdateModal(true);
              }}
              icon={<InfoCircleOutlined />}
            />
          </Tooltip>
        </>
      );
    } else if (item?.status !== 1 && item?.status !== 4 && item?.status !== 2) {
      return (
        <>
          <Tooltip title={localStrings.GlobalLabels.Update}>
            <Button
              type="primary"
              ghost
              style={{
                color: colorFormat?.Red_Dark,
                borderColor: colorFormat?.Red_Dark,
              }}
              shape="circle"
              onClick={async () => {
                setSelectedProfileId(item?.profileId);
                setActionModal(true);
                await getTravelSimDetail(
                  { profileId: item?.profileId },
                  "action"
                );
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Button
            type="primary"
            ghost
            shape="circle"
            onClick={() => {
              setSelectedProfileId(item?.profileId);
              setShowModal(true);
            }}
            icon={<FileSearchOutlined />}
          />
        </>
      );
    } else {
      return (
        <Button
          type="primary"
          ghost
          shape="circle"
          onClick={() => {
            setSelectedProfileId(item?.profileId);
            setShowModal(true);
          }}
          icon={<FileSearchOutlined />}
        />
      );
    }
  };

  useEffect(() => {
    if (!!resultObject?.message) {
      switch (resultObject?.type) {
        case "success":
          popUpComponent.success(resultObject?.message, 5);
          break;
        case "error":
          popUpComponent.error(resultObject?.message, 5);
          break;
        default:
          break;
      }
    }
  }, [resultObject]);

  const columns: ColumnsType = [
    ...TravelSimConstants(localStrings)?.mainColumns,
    {
      title: localStrings.TravelSimListManagement.Labels.Detail,
      key: "detail",
      align: "center",
      width: "6%",
      fixed: "right",
      render: (item) => (
        <>
          <div className="flex justify-center items-center gap-x-3">
            {actionButtons(item)}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <CardComponent
        data={{
          title: localStrings.TravelSimListManagement.Title,
          extra: <Fragment key={1}></Fragment>,
          children: (
            <>
              <Form
                form={filterForm}
                onFinish={(values) =>
                  setQuery({
                    page: 0,
                    limit: 10,
                    name: values?.name ? values?.name : undefined,
                    sim: values?.sim ? values?.sim : undefined,
                    profileId: values?.profileId
                      ? values?.profileId
                      : undefined,
                    serial: values?.serial ? values?.serial : undefined,
                    status: values?.status !== "" ? values?.status : undefined,
                    type: values?.type ? values?.type : undefined,
                    fromDate: values?.date
                      ? dayjs(values?.date[0]).format("YYYY-MM-DD")
                      : dayjs(dayjs().subtract(12, "day")).format("YYYY-MM-DD"),
                    toDate: values?.date
                      ? dayjs(values?.date[1]).format("YYYY-MM-DD")
                      : dayjs().format("YYYY-MM-DD"),
                    emailContact: values?.emailContact
                      ? values?.emailContact
                      : undefined,
                    phoneContact: values?.phoneContact
                      ? values?.phoneContact
                      : undefined,
                    idNumber: values?.idNumber ? values?.idNumber : undefined,
                  })
                }
              >
                <Row gutter={[6, 0]} align={"middle"}>
                  {/* Filters */}
                  {FilterComponent(
                    TravelSimConstants(localStrings)?.filterAttributes
                  )}
                  {/* Buttons */}
                  {FilterButtons({
                    searchLg: 8,
                    htmlType: "submit",
                    redoIcon: <RedoOutlined />,
                    redoLg: 8,
                    searchIcon: <SearchOutlined />,
                    redoName: localStrings.GlobalLabels.Redo,
                    searchName: localStrings.GlobalLabels.Search,
                    type: "primary",
                    onRedoClick: async () => {
                      filterForm.resetFields();
                      setPage(0);
                      setLimit(10);
                      setQuery({
                        page: 0,
                        limit: 10,
                        fromDate: dayjs()
                          .subtract(12, "day")
                          .format("YYYY-MM-DD"),
                        toDate: dayjs().format("YYYY-MM-DD"),
                      });
                    },
                  })}
                  <Col span={24} lg={8}>
                    <Form.Item>
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: colorFormat?.Green,
                          },
                        }}
                      >
                        {" "}
                        <Button
                          type="primary"
                          className="w-full"
                          onClick={() => setCreateModal(true)}
                          icon={<FileAddOutlined />}
                        >
                          {localStrings.TravelSimListManagement.Labels.CreateProfile}
                        </Button>
                      </ConfigProvider>
                    </Form.Item>
                  </Col>
                  {/* Table List */}
                  <TableComponent<TravelSimResponseModel>
                    data={{
                      columns,
                      dataSource: travelSimList,
                      handleTableChange,
                      loading,
                      loadingTitle: "...Loading",
                      page,
                      pageSize: limit,
                      total,
                      totalTitle: localStrings.PathConfigManagement.Total,
                      scroll: { x: 1610, y: 480 },
                    }}
                  />
                </Row>
              </Form>
            </>
          ),
        }}
      />
      <TravelSimDetailModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        profileId={selectedProfileId}
        detail={travelSimDetail}
        getTravelSimDetail={getTravelSimDetail}
        loading={detailLoading}
        onAction={onAction}
      />
      <TravelSimUpdateFeature
        data={{
          actionForm,
          dialCode,
          detailImages,
          detail: travelSimDetail,
          loading: detailLoading,
          open: actionModal,
          onAction,
          handleUploadChange,
          setDialCode,
          onCancel: () => {
            setTravelSimDetail({});
            actionForm?.setFieldsValue(new TravelSimResponseModel());
            setActionModal(false);
          },
          nationList,
          setNationList,
        }}
      />
      <UpdateProfileStatusFeature
        data={{
          detail: travelSimDetail,
          modal: updateModal,
          profileId: selectedProfileId,
          setModal: setUpdateModal,
          updateForm,
          updateProfileStatus,
        }}
      />
      {createModal && (
        <CreateProfileFeature
          open={createModal}
          onCancel={() => {
            Modal.confirm({
              centered: true,
              title: localStrings.TravelSimListManagement.Message.CancelCreateConfirm,
              cancelButtonProps: { type: "primary" },
              cancelText: localStrings.GlobalLabels.No,
              okType: "default",
              okText: localStrings.GlobalLabels.Yes,
              onOk: () => {
                setCreateStep(0);
                setCreateModal(false)
              }
            })
          }}
          step={createStep}
          generateStepProps={{
            handleGenerateFiles,
            sessionLog
          }}
          createStepProps={{
            signature,
            setSignature,
            submitLoading,
            clearSignature,
            uploadInfo,
            setProfileType,
            sectionIds,
            userFiles
          }}
          confirmStepProps={{
            nationList,
            confirmInfo,
            loading: confirmLoading,
            userData,
            profileType
          }}
        />
      )}
    </>
  );
};

export default TravelSimListFeature;
