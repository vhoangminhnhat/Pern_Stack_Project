import { CreateRoamingRequestModel } from "api/repositories/packagesManagement/roamingManagement/model/createActions/CreateRoamingRequestModel";
import { isEmpty } from "lodash";
import { useState } from "react";
import { IRoamingActionType } from "./actionTypeModel/RoamingActionTypeModel";

import {
  FileAddOutlined,
  FileOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { RoamingDetailResponseModel } from "api/repositories/packagesManagement/roamingManagement/model/detail/RoamingDetailResponseModel";
import MoreModal from "components/generalComponents/actionsComponent/More";
import TableCountry from "components/generalComponents/actionsComponent/TableCountry";
import { AuthenticationContext } from "context/AuthenticationContext";
import RoamingManagementConstants from "pages/roamingManagement/constants/RoamingManagementConstants";
import RoamingConstantsViewModel from "pages/roamingManagement/viewmodel/RoamingConstantsViewModel";
import { colorFormat } from "utils/format/ColorFormat";
import {
  createFormRules,
  getFormInitialVals,
} from "utils/helpersInTs/helpersInTs";
const RoamingUpdateCreateFeature = (props: IRoamingActionType) => {
  const {
    actionForm,
    handleActions,
    modalLoading,
    detailInfo,
    detailModal,
    setDetailInfo,
    setDetailModal,
    onDataChange,
  } = props?.data;
  const [dataSource, setDataSource] = useState<
    CreateRoamingRequestModel[] | []
  >([]);
  const { localStrings } = AuthenticationContext();
  const { categoryOps } = RoamingManagementConstants(localStrings);
  const { countryList, partnerList } = RoamingConstantsViewModel();
  const [isTopupModalVisible, setIsTopupModalVisible] = useState(false);
  const [hasItemInModal, setHasItemInModal] = useState(false);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorFormat?.Blue,
          colorError: colorFormat?.Red_Dark,
        },
      }}
    >
      <Modal
        open={detailModal}
        width={1300}
        centered
        destroyOnClose
        footer={null}
        title={
          isEmpty(detailInfo)
            ? localStrings.GlobalLabels.Create
            : localStrings.GlobalLabels.Update
        }
        onCancel={() => {
          setDetailInfo({});
          actionForm.setFieldsValue(new RoamingDetailResponseModel());
          setDetailModal(false);
        }}
      >
        <Spin
          spinning={modalLoading}
          indicator={<LoadingOutlined />}
          tip={"Loading..."}
        >
          <Form
            form={actionForm}
            onFinish={async (value) => {
              const formData = {
                ...actionForm.getFieldsValue(true),
                country: dataSource,
              };
              await handleActions(
                formData,
                isEmpty(detailInfo) ? "create" : "update"
              );
              setDataSource([]);
            }}
          >
            <Row gutter={[12, 4]} align={"middle"}>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Name}</div>
                <Form.Item
                  name={"name"}
                  initialValue={getFormInitialVals(detailInfo?.package, "name")}
                  rules={createFormRules(
                    true,
                    "string",
                    localStrings.GlobalPlaceholder.Name
                  )}
                >
                  <Input
                    placeholder={localStrings.GlobalPlaceholder.Name}
                    prefix={<FileOutlined className="pr-1" />}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Code}</div>
                <Form.Item
                  name={"code"}
                  initialValue={getFormInitialVals(detailInfo?.package, "code")}
                  rules={createFormRules(
                    true,
                    "string",
                    localStrings.GlobalPlaceholder.Code
                  )}
                >
                  <Input
                    placeholder={localStrings.GlobalPlaceholder.Code}
                    prefix={<FileOutlined className="pr-1" />}
                    readOnly={isEmpty(detailInfo?.package) ? false : true}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.DurationDay}</div>
                <Form.Item
                  name={"durationDay"}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.durationDay
                      : 1
                  }
                  rules={createFormRules(
                    true,
                    "number",
                    localStrings.TopupManagement.Placeholder.DurationDay
                  )}
                >
                  <InputNumber<number>
                    min={1}
                    placeholder={
                      localStrings.TopupManagement.Placeholder.DurationDay
                    }
                    className="w-full"
                    suffix={<span className="font-medium">Ngày</span>}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Price}</div>
                <Form.Item
                  name={"price"}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? parseInt(detailInfo?.package?.price)
                      : 1000
                  }
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 1000,
                      message: localStrings.TopupManagement.Placeholder.Price,
                    },
                  ]}
                >
                  <InputNumber<number>
                    min={1000}
                    className="w-full"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                    placeholder={localStrings.TopupManagement.Placeholder.Price}
                    suffix={<span className="font-medium">VND</span>}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Storage}</div>
                <Form.Item
                  name={"storage"}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.storage
                      : 0
                  }
                  rules={[
                    {
                      required: false,
                      type: "number",
                      min: 0,
                    },
                  ]}
                >
                  <InputNumber<number>
                    min={0}
                    className="w-full"
                    placeholder={
                      localStrings.TopupManagement.Placeholder.Storage
                    }
                    suffix={<span className="font-medium">GB</span>}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Category}</div>
                <Form.Item
                  name={"categories"}
                  rules={[
                    {
                      required: true,
                      message:
                        localStrings.TopupManagement.Placeholder.Category,
                    },
                  ]}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.categories?.map(
                          (item: { code: string; name: string }) => item?.code
                        )
                      : undefined
                  }
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder={
                      localStrings.TopupManagement.Placeholder.Category
                    }
                    options={categoryOps}
                    optionRender={(option) => (
                      <Space className="flex justify-start items-center">
                        <span>{option.data.emoji}</span>
                        {option?.data?.label as string}
                      </Space>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.GlobalLabels.Description}</div>
                <Form.Item
                  name={"description"}
                  initialValue={getFormInitialVals(
                    detailInfo?.package,
                    "description"
                  )}
                  rules={createFormRules(
                    true,
                    "string",
                    localStrings.GlobalPlaceholder.Description
                  )}
                >
                  <Input.TextArea
                    placeholder={localStrings.GlobalPlaceholder.Description}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <div>{localStrings.GlobalLabels.Cover}</div>
                <Form.Item
                  name={"cover"}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.cover?.trim()
                      : null
                  }
                  rules={createFormRules(
                    true,
                    "url",
                    localStrings.TopupManagement.Placeholder.Cover
                  )}
                >
                  <Input.TextArea
                    placeholder={localStrings.TopupManagement.Placeholder.Cover}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List
                  name="more"
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.more
                      : []
                  }
                >
                  {(fields, { add, remove }) => (
                    <>
                      <Row justify="start" align="middle">
                        <Typography.Title
                          style={{ marginRight: "5px" }}
                          level={5}
                        >
                          Danh sách chi tiết gói cước
                        </Typography.Title>
                        <ConfigProvider
                          theme={{
                            token: {
                              colorPrimary: colorFormat?.Green,
                            },
                          }}
                        >
                          <Button
                            type="primary"
                            shape="round"
                            icon={<FileAddOutlined />}
                            onClick={() => {
                              setIsTopupModalVisible(true);
                              if (!hasItemInModal) {
                                setIsTopupModalVisible(true);
                                add();
                                setHasItemInModal(true);
                              }
                            }}
                          >
                            {localStrings.TopupManagement.AddMore}
                          </Button>
                        </ConfigProvider>
                      </Row>

                      <MoreModal
                        visible={isTopupModalVisible}
                        onClose={() => setIsTopupModalVisible(false)}
                        form={actionForm}
                        add={add}
                        fields={fields}
                        remove={remove}
                      />
                    </>
                  )}
                </Form.List>
                <Collapse
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  items={[
                    {
                      label: "Raw JSON",
                      key: "json",
                      children: (
                        <Form.Item noStyle shouldUpdate>
                          {() => (
                            <Typography>
                              <pre>
                                {JSON.stringify(
                                  actionForm.getFieldsValue(),
                                  null,
                                  2
                                )}
                              </pre>
                            </Typography>
                          )}
                        </Form.Item>
                      ),
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <TableCountry
                  countries={countryList}
                  roamingPartners={partnerList}
                  dataSources={dataSource}
                  onDataChange={(data: any[]) => setDataSource(data)}
                />
                {/* Table Country */}
              </Col>
              <Col
                span={24}
                className="flex justify-center items-center gap-4 mt-3"
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {!isEmpty(detailInfo)
                      ? localStrings.GlobalLabels.Update
                      : localStrings.GlobalLabels.Create}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="default"
                    onClick={() => {
                      setDetailInfo({});
                      actionForm.setFieldsValue(
                        new RoamingDetailResponseModel()
                      );
                      setDetailModal(false);
                    }}
                  >
                    {localStrings.GlobalLabels.Cancel}
                  </Button>
                </Form.Item>
              </Col>
              <br />
              <br />
              <Col span={24}>
                <Collapse
                  items={[
                    {
                      label: "Raw JSON",
                      key: "json",
                      children: (
                        <Form.Item noStyle shouldUpdate>
                          {() => (
                            <Typography>
                              <pre>
                                {JSON.stringify(
                                  actionForm.getFieldsValue(),
                                  null,
                                  2
                                )}
                              </pre>
                            </Typography>
                          )}
                        </Form.Item>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </ConfigProvider>
  );
};

export default RoamingUpdateCreateFeature;
