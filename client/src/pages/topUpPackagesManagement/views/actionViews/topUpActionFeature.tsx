import {
  CloseCircleOutlined,
  CloseOutlined,
  FileAddOutlined,
  FileOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
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
import { TopupDetailResponseModel } from "api/repositories/packagesManagement/topupManagement/model/detail/TopupDetailReponseModel";
import { isEmpty } from "lodash";
import { topupManagementConstants } from "pages/topUpPackagesManagement/constants/TopupManagementConstants";
import { colorFormat } from "utils/format/ColorFormat";
import {
  createFormRules,
  getFormInitialVals,
} from "utils/helpersInTs/helpersInTs";
import { ITopUpAction } from "./actionTypes/topUpActionType";
import { AuthenticationContext } from "context/AuthenticationContext";

const TopUpActionFeature = (props: ITopUpAction) => {
  const {
    actionForm,
    detailInfo,
    detailModal,
    handleActions,
    modalLoading,
    setDetailInfo,
    setDetailModal,
    capacityUnit,
    durationUnit,
    orderSorted,
    setOrderSorted,
    setCapacityUnit,
    setDurationUnit,
  } = props?.data;
  const { localStrings, language } = AuthenticationContext();

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
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 160px)",
            scrollbarWidth: "thin",
            overflowX: "hidden",
          },
        }}
        title={
          isEmpty(detailInfo)
            ? localStrings.GlobalLabels.Create
            : localStrings.GlobalLabels.Update
        }
        onCancel={() => {
          setDetailInfo({});
          actionForm.setFieldsValue(new TopupDetailResponseModel());
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
              await handleActions(
                actionForm?.getFieldsValue(true),
                isEmpty(detailInfo) ? "create" : "update"
              );
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
                <Form.Item>
                  <Space.Compact block>
                    <Form.Item
                      name={"durationUnit"}
                      noStyle
                      initialValue={
                        !isEmpty(detailInfo?.package) &&
                        detailInfo?.package?.durationDay < 1
                          ? "hour"
                          : durationUnit?.value
                      }
                    >
                      <Select
                        defaultValue={
                          !isEmpty(detailInfo?.package) &&
                          detailInfo?.package?.durationDay < 1
                            ? "hour"
                            : "day"
                        }
                        onChange={(value) =>
                          setDurationUnit({
                            label:
                              value === "day"
                                ? localStrings.GlobalLabels.Date
                                : localStrings.GlobalLabels.Hour,
                            value: value,
                          })
                        }
                        options={[
                          {
                            label: localStrings.GlobalLabels.Date,
                            value: "day",
                          },
                          {
                            label: localStrings.GlobalLabels.Hour,
                            value: "hour",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name={"durationDay"}
                      noStyle
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
                        placeholder={
                          localStrings.TopupManagement.Placeholder.DurationDay
                        }
                        formatter={(value) =>
                          `${
                            value < 1 ? Math.round(value * 24) : value
                          }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        style={{
                          fontWeight: 600,
                        }}
                        className="w-full"
                      />
                    </Form.Item>
                  </Space.Compact>
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
                <Form.Item>
                  <Space.Compact block>
                    <Form.Item
                      name={"capacityUnit"}
                      noStyle
                      initialValue={
                        !isEmpty(detailInfo?.package) &&
                        detailInfo?.package?.storage < 1
                          ? "mb"
                          : "gb"
                      }
                    >
                      <Select
                        defaultValue={
                          !isEmpty(detailInfo?.package) &&
                          detailInfo?.package?.storage < 1
                            ? "mb"
                            : "gb"
                        }
                        onChange={(value) => setCapacityUnit(value)}
                        options={[
                          {
                            label: "GB",
                            value: "gb",
                          },
                          {
                            label: "MB",
                            value: "mb",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name={"storage"}
                      noStyle
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
                        style={{
                          fontWeight: 600,
                        }}
                        className="w-full"
                        formatter={(value) =>
                          `${
                            value < 1 ? Math.round(value * 1024) : value
                          }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        placeholder={
                          localStrings.TopupManagement.Placeholder.Storage
                        }
                      />
                    </Form.Item>
                  </Space.Compact>
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
                    options={
                      topupManagementConstants(
                        setOrderSorted,
                        orderSorted,
                        localStrings,
                        language
                      ).categoryOps
                    }
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
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.description?.trim()
                      : null
                  }
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
              <Col span={24} lg={6}>
                <div>{localStrings.TopupManagement.Columns.Order}</div>
                <Form.Item
                  name={"order"}
                  initialValue={
                    !isEmpty(detailInfo?.package)
                      ? detailInfo?.package?.order
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
                    style={{
                      fontWeight: 500,
                    }}
                    className="w-full"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div>{localStrings.TopupManagement.ShortDescription}</div>
                <Form.Item>
                  <Form.List
                    name={"shortDescription"}
                    initialValue={
                      !isEmpty(detailInfo?.package)
                        ? detailInfo?.package?.shortDescription
                        : []
                    }
                  >
                    {(subFields, subOpt) => (
                      <>
                        <div className="grid grid-rows-1 lg:grid-cols-4 grid-cols-1 w-full gap-2">
                          {subFields.map((subField) => (
                            <>
                              <div className="flex gap-1 cursor-pointer items-center justify-center">
                                <Form.Item
                                  name={[subField?.name]}
                                  className="w-full"
                                >
                                  <Input.TextArea
                                    placeholder="Nhập mô tả ngắn"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </Form.Item>
                                <CloseCircleOutlined
                                  className="text-base"
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </div>
                            </>
                          ))}
                        </div>
                        <Button
                          type="primary"
                          shape="round"
                          icon={<PlusCircleOutlined />}
                          onClick={() => subOpt.add()}
                        >
                          {localStrings.TopupManagement.AddShort}
                        </Button>
                      </>
                    )}
                  </Form.List>
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
                          onClick={() => add()}
                        >
                          {localStrings.TopupManagement.AddMore}
                        </Button>
                      </ConfigProvider>
                      <div className="grid lg:grid-cols-2 grid-cols-1 grid-flow-row gap-2 mt-3">
                        {fields.map((field) => (
                          <Card
                            size="small"
                            title={localStrings.TopupManagement.More}
                            key={field.key}
                            className="w-full"
                            extra={
                              <CloseOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            }
                          >
                            <Form.Item
                              label={localStrings.TopupManagement.MoreInfoName}
                              name={[field.name, "name"]}
                            >
                              <Input
                                placeholder="Nhập tên thông tin"
                                prefix={<FileOutlined className="pr-1" />}
                              />
                            </Form.Item>

                            {/* Nest Form.List */}
                            <Form.Item
                              label={localStrings.TopupManagement.MoreInfoItems}
                            >
                              <Form.List name={[field.name, "items"]}>
                                {(subFields, subOpt) => (
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 10,
                                      }}
                                    >
                                      {subFields.map((subField) => (
                                        <>
                                          <div className="flex gap-2 cursor-pointer items-center">
                                            <Form.Item
                                              name={[subField?.name]}
                                              className="w-full h-full"
                                            >
                                              <Input.TextArea
                                                placeholder="Nhập thông tin chi tiết"
                                                style={{ width: "100%" }}
                                              />
                                            </Form.Item>
                                            <CloseCircleOutlined
                                              className="text-base"
                                              onClick={() => {
                                                subOpt.remove(subField.name);
                                              }}
                                            />
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                    <Button
                                      type="primary"
                                      shape="round"
                                      icon={<PlusCircleOutlined />}
                                      onClick={() => subOpt.add()}
                                    >
                                      {localStrings.TopupManagement.Add}
                                    </Button>
                                  </>
                                )}
                              </Form.List>
                            </Form.Item>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </Form.List>
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
                      actionForm.setFieldsValue(new TopupDetailResponseModel());
                      setDetailModal(false);
                    }}
                  >
                    {localStrings.GlobalLabels.Cancel}
                  </Button>
                </Form.Item>
              </Col>
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

export default TopUpActionFeature;
