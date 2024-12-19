import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Spin } from "antd";
import Upload, { UploadChangeParam } from "antd/es/upload";
import { CountryDetailResponseModel } from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { countryManagementConstants } from "pages/countryManagement/constants/CountryManagementConstants";
import { IUpdateCreate } from "../actionTypeModel/CountryActionType";

const UpdateCreateFeature = (props: IUpdateCreate) => {
  const {
    actionForm,
    detailInfo,
    handleActions,
    importFile,
    modalLoading,
    regionList,
    setDetailInfo,
    setDetailModal,
    handleUploadChange,
  } = props?.data;
  const { localStrings } = AuthenticationContext();
  return (
    <Spin
      spinning={modalLoading}
      indicator={<LoadingOutlined />}
      tip={"Loading..."}
    >
      <Form
        form={actionForm}
        layout="vertical"
        onFinish={async (value) => {
          await handleActions(
            actionForm?.getFieldsValue(true),
            detailInfo?.id,
            isEmpty(detailInfo) ? "create" : "update"
          );
        }}
      >
        <Row gutter={[12, 4]} align={"middle"}>
          <Col span={24} className="text-center break-words mb-5">
            <p className="italic">
              <span className="text-red-600">(*)</span>Vui lòng đặt tên file ảnh
              Cover có tiền tố <strong>Cover</strong> và file ảnh Quốc kỳ có
              tiền tố <strong>Ensign</strong>
            </p>
          </Col>
          <Col span={24}>
            <ActionsComponent
              data={countryManagementConstants(
                localStrings,
                regionList
              ).actionAttributes(detailInfo)}
              info={detailInfo}
            />
            <div className="flex md:flex-row flex-col justify-between">
              <Form.Item
                label={localStrings.CountryManagement.Columns.Ensign}
                name={"ensign"}
                rules={[
                  {
                    required: true,
                    message:
                      localStrings.CountryManagement.Message.EnsignAttributes,
                  },
                ]}
                initialValue={importFile?.ensignFiles}
                valuePropName="fileList"
                getValueFromEvent={(e: UploadChangeParam) => e.fileList}
              >
                <Upload
                  name="ensign"
                  onChange={handleUploadChange("ensignFiles")}
                  maxCount={1}
                  {...countryManagementConstants(localStrings, regionList)
                    .uploadProps}
                  action="/upload.do"
                  listType="picture-card"
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>
                      {isEmpty(detailInfo)
                        ? localStrings.GlobalLabels.Create
                        : localStrings.GlobalLabels.Update}
                    </div>
                  </button>
                </Upload>
              </Form.Item>
              <Form.Item
                label={"Cover"}
                name={"cover"}
                valuePropName="fileList"
                initialValue={importFile?.coverFiles}
                getValueFromEvent={(e: UploadChangeParam) => e.fileList}
              >
                <Upload
                  name="cover"
                  onChange={handleUploadChange("coverFiles")}
                  maxCount={1}
                  {...countryManagementConstants(localStrings, regionList)
                    .uploadProps}
                  action="/upload.do"
                  listType="picture-card"
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>
                      {isEmpty(detailInfo)
                        ? localStrings.GlobalLabels.Create
                        : localStrings.GlobalLabels.Update}
                    </div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <br />
            <div className="flex justify-center items-center gap-3">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-700"
                >
                  {!isEmpty(detailInfo)
                    ? localStrings.GlobalLabels.Update
                    : localStrings.GlobalLabels.Create}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    setDetailInfo({});
                    actionForm.setFieldsValue(new CountryDetailResponseModel());
                    setDetailModal(false);
                  }}
                  type="default"
                >
                  {localStrings.GlobalLabels.Cancel}
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default UpdateCreateFeature;
