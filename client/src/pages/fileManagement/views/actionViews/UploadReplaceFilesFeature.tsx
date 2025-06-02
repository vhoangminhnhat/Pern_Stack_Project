import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Spin, Upload } from "antd";
import { FileManagementResponseModel } from "api/repositories/fileManagement/model/FileManagementResponseModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import {
  fileManagementConstants,
  IUploadReplaceFiles,
} from "pages/fileManagement/constants/FileManagementConstants";

const UploadReplaceFilesFeature = (props: IUploadReplaceFiles) => {
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
  } = props?.data;

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
        actionForm.setFieldsValue(new FileManagementResponseModel());
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
              actionForm?.getFieldsValue(true),
              isEmpty(detailInfo) ? "upload" : "replace"
            );
          }}
        >
          <Row gutter={[12, 4]} align={"middle"}>
            <Col span={24}>
              <ActionsComponent
                data={fileManagementConstants(localStrings).actionForm(
                  detailInfo
                )}
                info={detailInfo}
              />
              <Form.Item
                label={localStrings.Sidebar.Files}
                name={"file"}
                rules={[
                  {
                    required: true,
                    message: localStrings.FileManagement.Placeholder.File,
                  },
                ]}
                initialValue={importFile?.file}
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e.fileList}
              >
                <Upload.Dragger
                  name="files"
                  className="w-full"
                  onChange={handleUploadChange("file")}
                  maxCount={1}
                  {...fileManagementConstants(localStrings)?.uploadProps}
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
                      actionForm.setFieldsValue(
                        new FileManagementResponseModel()
                      );
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

export default UploadReplaceFilesFeature;
