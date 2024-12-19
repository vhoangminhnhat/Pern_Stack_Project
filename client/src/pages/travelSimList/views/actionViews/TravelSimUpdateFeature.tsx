import { LoadingOutlined, QrcodeOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import Upload, { UploadChangeParam } from "antd/es/upload";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { CountrySelect } from "components/generalComponents/countrySelection/CountrySelection";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import moment from "moment";
import { ITravelSimActions } from "pages/travelSimList/interfaces/TravelSimInterfaces";
import { useCallback, useState } from "react";
import { colorFormat } from "utils/format/ColorFormat";
import { createFormRules } from "utils/helpersInTs/helpersInTs";
import { TravelSimConstants } from "../../constants/TravelSimConstants";

const TravelSimUpdateFeature = (props: ITravelSimActions) => {
  const {
    actionForm,
    detail,
    loading,
    open,
    dialCode,
    detailImages,
    setDialCode,
    onAction,
    onCancel,
    handleUploadChange,
    nationList,
    setNationList,
  } = props?.data;
  const { localStrings } = AuthenticationContext();
  const [buttonLoading, setButtonLoading] = useState<
    "ocr" | "confirm" | "update" | ""
  >("");

  const uploadRenderign = useCallback(
    (
      formName: "sim" | "portrait" | "signature" | "front" | "videocall",
      label: string
    ) => {
      return (
        <Col
          span={24}
          lg={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="font-semibold text-base">
            <span className="text-red-600">*</span> {label}:
          </div>
          <Form.Item
            name={formName}
            noStyle
            rules={
              formName !== "signature" && formName !== "sim"
                ? [
                    {
                      required: true,
                      message:
                        localStrings.TravelSimListManagement.Message
                          .InvalidPicture,
                    },
                  ]
                : null
            }
            initialValue={detailImages[formName]}
            valuePropName="file"
            getValueFromEvent={(e: UploadChangeParam) => e.fileList}
          >
            <Upload.Dragger
              showUploadList={false}
              name={formName}
              disabled={
                formName !== "signature" && formName !== "sim" ? false : true
              }
              style={{ width: 400, height: 250 }}
              onChange={handleUploadChange(formName)}
              maxCount={1}
              {...TravelSimConstants(localStrings)?.uploadProps}
              action="/upload.do"
              listType="picture-card"
            >
              <img
                alt={formName}
                src={
                  !detailImages[formName]?.find((item) => item?.url)?.url
                    ? window.URL.createObjectURL(
                        new Blob(
                          [
                            detailImages[formName]?.find(
                              (item) => item?.originFileObj
                            )?.originFileObj,
                          ],
                          { type: "application/zip" }
                        )
                      )
                    : detailImages[formName]?.find((item) => item?.url)?.url
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
      );
    },
    [detailImages]
  );

  return (
    <Modal
      title={localStrings.GlobalLabels.Update}
      open={open}
      centered
      destroyOnClose
      closable={false}
      closeIcon={null}
      width={1200}
      loading={loading}
      footer={
        <Form
          form={actionForm}
          className="flex justify-center items-center gap-2"
          onFinish={async () => {
            setButtonLoading("confirm");
            await onAction(actionForm?.getFieldsValue(true), "confirm").then(
              () => setButtonLoading("")
            );
          }}
        >
          <Form.Item noStyle>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: colorFormat?.Green,
                },
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading === "confirm" ? true : false}
              >
                {buttonLoading === "confirm"
                  ? localStrings.GlobalLabels.PleaseWait
                  : localStrings?.GlobalLabels?.Update}
              </Button>
            </ConfigProvider>
          </Form.Item>
          <Form.Item noStyle>
            <Button type="default" onClick={onCancel}>
              {localStrings?.GlobalLabels?.Cancel}
            </Button>
          </Form.Item>
        </Form>
      }
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 120px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        },
      }}
    >
      <Form form={actionForm} className="p-1">
        <Row gutter={[10, 4]} align={"middle"}>
          <Col span={24} lg={8}>
            <Form.Item
              name={"createdAt"}
              label={localStrings.GlobalLabels.createdAt}
            >
              <span className="font-semibold italic">
                {!!detail?.createdAt
                  ? moment(detail?.createdAt).format("DD/MM/YYYY HH:mm:ss")
                  : moment().format("DD/MM/YYYY HH:mm:ss")}
              </span>
            </Form.Item>
          </Col>
          <ActionsComponent
            data={TravelSimConstants(localStrings).actionComponent}
            info={detail}
          />
          <Col span={24} lg={8}>
            <Form.Item
              name={"issueDate"}
              label={localStrings.TravelSimListManagement.Labels.IssueDate}
              initialValue={!!detail?.issueDate ? detail?.issueDate : dayjs()}
              rules={createFormRules(
                true,
                "date",
                localStrings.GlobalPlaceholder.InvalidValue
              )}
            >
              <DatePicker
                allowClear={false}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                defaultValue={!!detail?.issueDate ? detail?.issueDate : dayjs()}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name={"birthDay"}
              label={localStrings.TravelSimListManagement.Labels.Birthday}
              initialValue={!!detail?.birthDay ? detail?.birthDay : dayjs()}
              rules={createFormRules(
                true,
                "date",
                localStrings.GlobalPlaceholder.InvalidValue
              )}
            >
              <DatePicker
                allowClear={false}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                defaultValue={!!detail?.birthDay ? detail?.birthDay : dayjs()}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name="placeOfOrigin"
              label={localStrings.TravelSimListManagement.Labels.PlaceOfOrigin}
              initialValue={
                detail?.placeOfOrigin && detail?.placeOfOrigin !== "-"
                  ? nationList?.find(
                      (item) =>
                        item?.name?.toLowerCase() ===
                        detail?.placeOfOrigin?.toLowerCase()
                    )?.name
                  : null
              }
              rules={createFormRules(
                true,
                "string",
                localStrings.GlobalPlaceholder.InvalidValue
              )}
            >
              <Select
                options={nationList?.map((item) => {
                  return {
                    label: item?.name,
                    value: item?.name,
                  };
                })}
                showSearch
                filterOption={(inputValue, option) => {
                  if (typeof option?.label === "string") {
                    return option?.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
                  }
                  return false;
                }}
                placeholder={
                  localStrings.TravelSimListManagement.Message.Nation
                }
              />
            </Form.Item>
          </Col>
          {/* <Col span={24} lg={8}>
            <Form.Item
              name="placeOfOrigin"
              label={localStrings.TravelSimListManagement.Labels.PlaceOfOrigin}
              initialValue={
                nationList?.find((item) => item?.name === detail?.placeOfOrigin)
                  ? detail?.placeOfOrigin
                  : null
              }
              rules={createFormRules(
                true,
                "string",
                localStrings.TravelSimListManagement.Message.Nation
              )}
              validateStatus="validating"
              help={
                <span className="text-blue-700 italic text-xs">
                  {
                    localStrings.TravelSimListManagement.Message
                      .AutofillwithNation
                  }
                </span>
              }
            >
              <Input
                placeholder={
                  localStrings.TravelSimListManagement.Message.Nation
                }
                className="pointer-events-none"
              />
            </Form.Item>
          </Col> */}
          <Col span={24} lg={8}>
            <Form.Item
              name="nationality"
              label={localStrings.TravelSimListManagement.Labels.Nationality}
              initialValue={
                detail?.nationality && detail?.nationality !== "-"
                  ? nationList?.find(
                      (item) =>
                        item?.name?.toLowerCase() ===
                        detail?.nationality?.toLowerCase()
                    )?.code
                  : null
              }
              rules={createFormRules(
                true,
                "string",
                localStrings.GlobalPlaceholder.InvalidValue
              )}
            >
              <Select
                options={nationList
                  ?.filter(
                    (item) => item?.name?.toLocaleLowerCase() !== "vietnam"
                  )
                  ?.map((item) => {
                    return {
                      label: item?.name,
                      value: item?.code,
                    };
                  })}
                showSearch
                filterOption={(inputValue, option) => {
                  if (typeof option?.label === "string") {
                    return option?.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
                  }
                  return false;
                }}
                onSelect={(value) => {
                  actionForm.setFieldValue("issuePlace", value);
                }}
                placeholder={
                  localStrings.TravelSimListManagement.Message.Nation
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name="issuePlace"
              label={localStrings.TravelSimListManagement.Labels.IssuePlace}
              initialValue={
                nationList?.find((item) => item?.code === detail?.issuePlace)
                  ? detail?.issuePlace
                  : null
              }
              rules={createFormRules(
                true,
                "string",
                localStrings.TravelSimListManagement.Message.Nation
              )}
              validateStatus="validating"
              help={
                <span className="text-blue-700 italic text-xs">
                  {
                    localStrings.TravelSimListManagement.Message
                      .AutofillwithNation
                  }
                </span>
              }
            >
              <Input
                placeholder={
                  localStrings.TravelSimListManagement.Message.Nation
                }
                className="pointer-events-none"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item
              name="phone"
              valuePropName="value"
              initialValue={detail?.phoneContact}
              label={localStrings.TravelSimListManagement.Labels.PhoneContact}
              rules={[
                {
                  required: true,
                  pattern: /^\d{6,15}$/,
                  min: 6,
                  max: 15,
                  message:
                    localStrings.TravelSimListManagement.Message.InvalidPhone,
                },
              ]}
            >
              <Space.Compact style={{ width: "100%" }}>
                <CountrySelect
                  iso2={dialCode}
                  setIso2={setDialCode}
                  variant="outlined"
                  size="middle"
                />
                <Input
                  defaultValue={detail?.phoneContact}
                  size="middle"
                  style={{ width: "100%" }}
                  variant="outlined"
                  placeholder={localStrings.GlobalPlaceholder.Phone}
                  minLength={6}
                  maxLength={15}
                  type="tel"
                />
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                loading={buttonLoading === "ocr" ? true : false}
                type="primary"
                icon={
                  buttonLoading === "ocr" ? (
                    <LoadingOutlined />
                  ) : (
                    <QrcodeOutlined />
                  )
                }
                onClick={async () => {
                  setButtonLoading("ocr");
                  await onAction(actionForm?.getFieldsValue(true), "ocr").then(
                    () => setButtonLoading("")
                  );
                }}
              >
                {buttonLoading === "ocr"
                  ? localStrings.GlobalLabels.PleaseWait
                  : localStrings.TravelSimListManagement.Labels.OCRNow}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 2]} align={"middle"}>
          {uploadRenderign(
            "portrait",
            localStrings.TravelSimListManagement.ImagePaths.portrait
          )}
          {uploadRenderign(
            "front",
            localStrings.TravelSimListManagement.ImagePaths.front
          )}
          {uploadRenderign(
            "videocall",
            localStrings.TravelSimListManagement.ImagePaths.videocall
          )}
          {uploadRenderign(
            "sim",
            localStrings.TravelSimListManagement.ImagePaths.sim
          )}
          {uploadRenderign(
            "signature",
            localStrings.TravelSimListManagement.ImagePaths.sign
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default TravelSimUpdateFeature;
