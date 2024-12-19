import {
  CheckCircleOutlined,
  DownloadOutlined,
  RedoOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Form,
  Image,
  InputNumber,
  Row,
  Skeleton,
} from "antd";
import Upload, { UploadChangeParam } from "antd/es/upload";
import UserAvatar from "assets/images/default-avatar.png";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { isEmpty } from "lodash";
import { Fragment, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { colorFormat } from "utils/format/ColorFormat";
import { downloadFile } from "utils/helpersInTs/helpersInTs";
import { VideoGenerationConstants } from "../constants/VideoGenerationConstants";
import VideoGenerationViewModel from "../viewModel/VideoGenerationViewModel";

const VideoGenerationFeature = (props: {
  data: {
    buttonProps: ReactNode | null;
  };
}) => {
  const {
    genForm,
    genResults,
    importFile,
    loading,
    localStrings,
    handleGeneration,
    handleUploadChange,
    sessionLog,
    setSessionLog,
  } = VideoGenerationViewModel();
  const path = useLocation();

  return (
    <CardComponent
      data={{
        title: localStrings?.VideoGeneration?.Labels?.Generate,
        extra: <Fragment key={1}></Fragment>,
        children: (
          <Form
            form={genForm}
            layout="vertical"
            onFinish={async () =>
              await handleGeneration(genForm?.getFieldsValue(true))
            }
          >
            <Row gutter={[5, 5]}>
              <Col span={24} lg={!isEmpty(genResults) ? 12 : 24}>
                <Row gutter={[5, 0]}>
                  <Col span={24} lg={12}>
                    <Form.Item
                      label={localStrings.VideoGeneration.Labels.ImageNumber}
                      name={"imageNumber"}
                      initialValue={1}
                      rules={[
                        {
                          required: true,
                          message:
                            localStrings.VideoGeneration.Placeholder
                              .LesserThree,
                        },
                      ]}
                    >
                      <InputNumber<number>
                        size="middle"
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          value.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                        min={1}
                        max={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={12}>
                    <Form.Item
                      label={localStrings.VideoGeneration.Labels.NumberFielity}
                      name={"numberFielity"}
                      initialValue={0.5}
                      rules={[
                        {
                          required: true,
                          message: localStrings.GlobalMessage.Error,
                        },
                      ]}
                    >
                      <InputNumber<number>
                        size="middle"
                        style={{ width: "100%" }}
                        step={0.1}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          value.replace(/\$\s?|(,*)/g, "") as unknown as number
                        }
                      />
                    </Form.Item>
                  </Col>
                  <ActionsComponent
                    data={VideoGenerationConstants?.filterAttributes(
                      localStrings
                    )}
                    info={{}}
                  />
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Form.Item
                      name={"file"}
                      label={
                        localStrings?.TravelSimListManagement?.ImagePaths
                          ?.portrait
                      }
                      rules={[
                        {
                          required: true,
                          message:
                            localStrings.TravelSimListManagement.Message
                              .InvalidPicture,
                        },
                      ]}
                      initialValue={importFile}
                      valuePropName="file"
                      getValueFromEvent={(e: UploadChangeParam) => e.fileList}
                    >
                      <Upload.Dragger
                        showUploadList={false}
                        name={"file"}
                        onChange={handleUploadChange("videocall")}
                        maxCount={1}
                        {...VideoGenerationConstants?.uploadProps}
                        action="/upload.do"
                        listType="picture-card"
                      >
                        <img
                          alt={"file"}
                          src={
                            !!importFile[0]
                              ? window.URL.createObjectURL(
                                  new Blob(
                                    [
                                      importFile?.find(
                                        (item) => item?.originFileObj
                                      )?.originFileObj,
                                    ],
                                    { type: "application/zip" }
                                  )
                                )
                              : UserAvatar
                          }
                          className="object-contain"
                          style={{
                            width: "100%",
                            height: 250,
                          }}
                        />
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {!isEmpty(genResults) ? (
                      <>
                        <Form.Item noStyle>
                          <Button
                            icon={<RedoOutlined />}
                            type="default"
                            htmlType="submit"
                          >
                            {localStrings?.VideoGeneration?.Labels?.Regenerate}
                          </Button>
                        </Form.Item>
                        <Form.Item noStyle>
                          {props?.data?.buttonProps}
                        </Form.Item>
                      </>
                    ) : (
                      <Form.Item noStyle>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          icon={<VideoCameraOutlined />}
                        >
                          {loading === true
                            ? "Loading..."
                            : localStrings.VideoGeneration.Labels.Generate}
                        </Button>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Col>

              {!isEmpty(genResults) && (
                <Col span={24} lg={12}>
                  <Collapse
                    defaultActiveKey={"result"}
                    style={{ backgroundColor: "white" }}
                    className="lg:flex-1"
                    expandIconPosition="end"
                    bordered={false}
                    items={[
                      {
                        key: "result",
                        label: (
                          <span className="font-semibold italic text-blue-600 text-xl">
                            {localStrings?.VideoGeneration?.Labels?.Results}
                          </span>
                        ),
                        children: (
                          <Skeleton active loading={loading}>
                            <Row
                              gutter={[5, 5]}
                              className="border-2 border-gray-200 rounded-lg p-2"
                            >
                              {!isEmpty(genResults) &&
                                genResults?.image?.map((item, index) => {
                                  return (
                                    <Col
                                      span={24}
                                      lg={8}
                                      className="videocall-ui"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 3,
                                      }}
                                    >
                                      <Image
                                        className="p-1 object-contain"
                                        width={"100%"}
                                        height={"100%"}
                                        src={item}
                                        alt={`${index}`}
                                      />
                                      {path?.pathname?.includes(
                                        "/tools/videocall-generation"
                                      ) ? (
                                        <Button
                                          className="w-full"
                                          onClick={async (e) => {
                                            setSessionLog((prev) => ({
                                              sessionId: [...prev?.sessionId],
                                              portrait: importFile[0],
                                              image: item,
                                            }));
                                            await downloadFile(
                                              item,
                                              `videocall.png`
                                            );
                                          }}
                                          icon={<DownloadOutlined />}
                                          type={"default"}
                                        >
                                          {"Download"}
                                        </Button>
                                      ) : (
                                        <ConfigProvider
                                          theme={{
                                            token: {
                                              colorPrimary:
                                                sessionLog?.image === item
                                                  ? colorFormat?.Green
                                                  : colorFormat?.Blue,
                                            },
                                          }}
                                        >
                                          <Button
                                            className="w-full font-semibold"
                                            onClick={(e) => {
                                              setSessionLog((prev) => ({
                                                sessionId: [...prev?.sessionId],
                                                portrait: importFile[0],
                                                image: item,
                                              }));
                                            }}
                                            icon={
                                              sessionLog?.image === item ? (
                                                <CheckCircleOutlined />
                                              ) : null
                                            }
                                            type={
                                              sessionLog?.image === item
                                                ? "primary"
                                                : "default"
                                            }
                                          >
                                            {sessionLog?.image === item
                                              ? localStrings.VideoGeneration
                                                  .Labels.Chosen
                                              : localStrings.VideoGeneration
                                                  .Labels.ChooseImage}
                                          </Button>
                                        </ConfigProvider>
                                      )}
                                    </Col>
                                  );
                                })}
                            </Row>
                          </Skeleton>
                        ),
                      },
                    ]}
                  />
                </Col>
              )}
            </Row>
          </Form>
        ),
      }}
    />
  );
};

export default VideoGenerationFeature;
