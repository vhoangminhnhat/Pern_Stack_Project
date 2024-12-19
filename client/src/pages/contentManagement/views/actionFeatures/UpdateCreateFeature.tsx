import { InboxOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Modal, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { ContentManagementResponseModel } from "api/repositories/contentManagement/model/ContentManagementResponseModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { contentManagementConstants } from "pages/contentManagement/viewModel/constants/ContentManagementConstants";
import { UpdateCreateFeatureProps } from "./actionFeatureTypes/ActionFeatureTypes";

const UpdateCreateFeature = (props: UpdateCreateFeatureProps) => {
  const {
    actionForm,
    handleAction,
    importFile,
    info,
    modal,
    setImportFile,
    setInfo,
    setModal,
  } = props?.data;
  const { localStrings } = AuthenticationContext();

  const handleUploadChange =
    (type: "doc" | "image") => (info: UploadChangeParam) => {
      setImportFile((prevState) => ({
        ...prevState,
        [type]: info?.fileList as RcFile[],
      }));
    };

  const handleActionChange = async (values) => {
    if (!info?.id) {
      await handleAction(values, "create");
    } else {
      await handleAction(values, "replace");
    }
  };
  return (
    <Modal
      open={modal}
      destroyOnClose
      centered
      footer={null}
      width={600}
      closable={false}
      title={
        info?.id
          ? localStrings.GlobalLabels.Update
          : localStrings.GlobalLabels.Create
      }
    >
      <Form
        form={actionForm}
        layout="vertical"
        onFinish={(values) => handleActionChange(values)}
        // {...contentManagementConstants.formItemLayout}
      >
        <ActionsComponent
          data={contentManagementConstants(localStrings).updateCreateAttributes(
            info
          )}
          info={info as ContentManagementResponseModel}
        />
        <Form.Item
          name="doc"
          valuePropName="fileList"
          label={localStrings.ContentManagement.Columns.File}
          getValueFromEvent={(e: any) => e?.fileList}
          initialValue={importFile?.doc}
          rules={[
            {
              required: true,
              message: localStrings.ContentManagement.Message.Files,
            },
          ]}
        >
          <Upload.Dragger
            name="doc"
            maxCount={1}
            action="/upload.do"
            onChange={handleUploadChange("doc")}
            {...contentManagementConstants(localStrings).docProps}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className=" text-blue-800 bold italic">
              {localStrings.ContentManagement.Message.AddAttribute}
            </p>
            <p className="text-red-600 bold italic">
              {localStrings.ContentManagement.Message.OnlyDocx}
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          name="image"
          valuePropName="fileList"
          label={localStrings.ContentManagement.Columns.Image}
          getValueFromEvent={(e: any) => e?.fileList}
          initialValue={importFile?.image}
        >
          <Upload.Dragger
            name="image"
            maxCount={1}
            action="/upload.do"
            onChange={handleUploadChange("image")}
            {...contentManagementConstants(localStrings).imageProps}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className=" text-blue-800 bold italic">
              {localStrings.ContentManagement.Message.AddAttribute}
            </p>
            <p className="text-red-600 bold italic">
              {localStrings.ContentManagement.Message.OnlyImages}
            </p>
          </Upload.Dragger>
        </Form.Item>
        <br />
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="flex justify-center items-center">
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "#218017",
                },
              }}
            >
              {" "}
              <Button type="primary" htmlType="submit">
                {info?.id
                  ? localStrings.GlobalLabels.Update
                  : localStrings.GlobalLabels.Create}
              </Button>
            </ConfigProvider>
            <Button
              className="ml-3"
              type="default"
              onClick={() => {
                setModal(false);
                setInfo({});
                actionForm.setFieldsValue({});
                setImportFile({
                  doc: [],
                  image: [],
                });
              }}
            >
              {localStrings.GlobalLabels.Cancel}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCreateFeature;
