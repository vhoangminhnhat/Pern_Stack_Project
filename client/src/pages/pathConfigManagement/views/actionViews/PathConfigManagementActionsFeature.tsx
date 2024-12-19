import { LoadingOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Modal, Spin } from "antd";
import { PathConfigDetailResponseModel } from "api/repositories/pathConfig/model/detail/PathConfigDetailResponseModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import ServiceEditorComponent from "components/generalComponents/serviceEditorComponent/ServiceEditorComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { PathConfigActionsType } from "pages/pathConfigManagement/viewModel/pathConfigMangementTypes/PathConfigManagementTypes";
import { useCallback } from "react";
import { autoCorrectJSON } from "utils/helpersInTs/helpersInTs";
import { TextContent } from "vanilla-jsoneditor";
import { PathConfigConstants } from "../pathConfigConstants/PathConfigConstants";

const PathConfigManagementActionsFeature = (props: PathConfigActionsType) => {
  const {
    detail,
    handleActions,
    modal,
    setModal,
    loading,
    setDetail,
    actionForm,
  } = props?.data;
  const { localStrings } = AuthenticationContext();

  const handler = useCallback(
    (content: TextContent) => {
      try {
        const correctedText = autoCorrectJSON(content.text);
        const parsedJSON = JSON.parse(correctedText);
        const formattedJSON = JSON.stringify(parsedJSON, null, 2);

        actionForm?.setFieldValue("config", formattedJSON);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
    },
    [actionForm]
  );

  return (
    <Modal
      open={modal}
      width={1000}
      title={
        isEmpty(detail)
          ? localStrings.GlobalLabels.Create
          : localStrings.GlobalLabels.Update
      }
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 160px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        },
      }}
      centered
      destroyOnClose
      footer={null}
      onCancel={() => {
        setDetail({});
        actionForm.setFieldsValue(new PathConfigDetailResponseModel());
        setModal(false);
      }}
    >
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined />}
        tip={"Loading..."}
      >
        <Form
          form={actionForm}
          layout="vertical"
          onFinish={async () => {
            await handleActions(
              actionForm?.getFieldsValue(true),
              detail?.code,
              isEmpty(detail) ? "create" : "update"
            );
          }}
        >
          <ActionsComponent
            data={PathConfigConstants(localStrings)?.actionAttributes()}
            info={detail}
          />
          <Collapse
            items={[
              {
                key: "editor",
                label: "Service config",
                children: (
                  <ServiceEditorComponent
                    content={
                      !!detail?.config
                        ? { json: JSON.parse(detail?.config as string) }
                        : { json: new Object() }
                    }
                    onChange={handler}
                    mainMenuBar={false}
                  />
                ),
              },
            ]}
            className="font-bold w-full overflow-auto bg-white"
            expandIconPosition="end"
            defaultActiveKey={"editor"}
          />
          <br />
          <div className="flex justify-center items-center gap-3">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {!isEmpty(detail)
                  ? localStrings.GlobalLabels.Update
                  : localStrings.GlobalLabels.Create}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setDetail({});
                  actionForm.setFieldsValue(
                    new PathConfigDetailResponseModel()
                  );
                  setModal(false);
                }}
                type="default"
              >
                {localStrings.GlobalLabels.Cancel}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default PathConfigManagementActionsFeature;
