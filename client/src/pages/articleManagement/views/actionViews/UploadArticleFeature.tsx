import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Spin, Upload } from "antd";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { IUploadArticleFeature } from "pages/articleManagement/interfaces/IArticleManagment";
import { ArticleManagementConstants } from "../../constants/ArticleManagementConstants";

const UploadArticleFeature = (props: IUploadArticleFeature) => {
  const {
    actionForm,
    detailInfo,
    detailModal,
    handleActions,
    handleUploadChange,
    importFile,
    modalLoading,
    setDetailInfo,
    setDetailModal,
  } = props.data;

  const { localStrings } = AuthenticationContext();

  return (
    <Modal
      open={detailModal}
      centered
      destroyOnHidden
      footer={null}
      title={
        isEmpty(detailInfo)
          ? localStrings.GlobalLabels.Create
          : localStrings.GlobalLabels.Update
      }
      onCancel={() => {
        setDetailInfo({});
        actionForm.resetFields();
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
          layout="vertical"
          onFinish={async (value) => {
            await handleActions(
              actionForm.getFieldsValue(true),
              isEmpty(detailInfo) ? "create" : "update"
            );
          }}
        >
          <Row gutter={[12, 4]} align={"middle"}>
            <Col span={24}>
              <ActionsComponent
                data={ArticleManagementConstants.actionForm(
                  detailInfo,
                  localStrings
                )}
                info={detailInfo}
              />
              <Form.Item
                label={localStrings.ArticleManagement.Labels.name}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: localStrings.ArticleManagement.Labels.name,
                  },
                ]}
                initialValue={detailInfo?.name}
              >
                <input className="ant-input w-full" />
              </Form.Item>
              <Form.Item
                label={localStrings.ArticleManagement.Labels.code}
                name={"code"}
                rules={[
                  {
                    required: true,
                    message: localStrings.ArticleManagement.Labels.code,
                  },
                ]}
                initialValue={detailInfo?.code}
              >
                <input className="ant-input w-full" />
              </Form.Item>
              <Form.Item
                label={localStrings.ArticleManagement.Labels.source}
                name={"url"}
                initialValue={detailInfo?.source}
              >
                <input className="ant-input w-full" />
              </Form.Item>
              <Form.Item
                label={localStrings.ArticleManagement.Labels.file}
                name={"file"}
                rules={[
                  {
                    required: true,
                    message: localStrings.ArticleManagement.Labels.file,
                  },
                ]}
                initialValue={importFile?.file}
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e.fileList}
              >
                <Upload.Dragger
                  name="file"
                  className="w-full"
                  onChange={handleUploadChange("file")}
                  maxCount={1}
                  // Add uploadProps if needed
                  action="/upload.do"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className=" text-blue-800 bold italic">
                    {localStrings.FileManagement.Placeholder.File}
                  </p>
                </Upload.Dragger>
              </Form.Item>
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
                      actionForm.resetFields();
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
    </Modal>
  );
};

export default UploadArticleFeature;
