import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Upload,
  message,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
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

  const beforeUpload = (file: File) => {
    const isPDF = file.type === "application/pdf";
    const isExcel =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isPDF && !isExcel) {
      message.error("You can only upload PDF or Excel files!", 4);
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB!", 4);
      return false;
    }

    // Return false to prevent automatic upload - we handle upload via FormData on form submit
    return false;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    handleUploadChange("file")({ fileList });
  };

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
          onFinish={async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("code", values.code);
            if (values.url) formData.append("url", values.url);
            if (values.file?.[0]?.originFileObj) {
              formData.append("file", values.file[0].originFileObj);
            }
            await handleActions(
              formData,
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
                label={localStrings.ArticleManagement.Labels.url}
                name={"url"}
                initialValue={detailInfo?.url}
              >
                <Input
                  placeholder={localStrings.ArticleManagement.Labels.url?.concat(
                    "..."
                  )}
                />
              </Form.Item>
              <Form.Item
                label={localStrings.ArticleManagement.Labels.file}
                name={"file"}
                rules={[
                  {
                    required: isEmpty(detailInfo),
                    message: localStrings.ArticleManagement.Labels.file,
                  },
                ]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload.Dragger
                  name="file"
                  className="w-full"
                  onChange={handleFileChange}
                  beforeUpload={beforeUpload}
                  accept=".pdf"
                  maxCount={1}
                  fileList={importFile?.fileList}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="text-blue-800 bold italic">
                    {localStrings.FileManagement.Placeholder.File}
                  </p>
                  <p className="text-gray-500">
                    Only PDF and Excel files are allowed (max 10MB)
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
