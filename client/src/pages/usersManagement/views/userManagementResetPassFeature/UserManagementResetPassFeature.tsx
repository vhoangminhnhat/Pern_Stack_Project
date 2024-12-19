import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin } from "antd";
import { ResetPasswordRequest } from "api/repositories/userManagement/model/resetPassword/ResetPasswordRequest";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { IUserManagementResetPass } from "./resetPassInterfaces/IUserManagementResetPass";
import { UserManagementResetPassAttributes } from "./userManagementResetPassAttributes/UserManagementResetPassAttributes";

const UserManagementResetPassFeature = (props: IUserManagementResetPass) => {
  const {
    detailInfo,
    formDetail,
    handleDetailAction,
    modalLoading,
    resetModal,
    setResetModal,
    setDetailInfo,
  } = props?.data;
  const { localStrings } = AuthenticationContext();

  return (
    <Modal
      open={resetModal}
      centered
      destroyOnClose={true}
      closable={false}
      maskClosable={false}
      footer={null}
      title={localStrings.UserManagement.Columns.NewPass}
      closeIcon={null}
    >
      <Spin
        spinning={modalLoading}
        indicator={<LoadingOutlined />}
        tip="Loading..."
      >
        <Form
          form={formDetail}
          onFinish={async (values) =>
            await handleDetailAction(
              values as ResetPasswordRequest,
              "reset-pass"
            )
          }
          layout="vertical"
        >
          <div className="p-2">
            <ActionsComponent
              data={UserManagementResetPassAttributes(detailInfo, localStrings)}
              info={detailInfo}
            />
            <Form.Item
              name="confirm"
              label={localStrings.GlobalLabels.PasswordConfirmed}
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: localStrings.GlobalPlaceholder.PasswordConfirmed,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        localStrings.GlobalPlaceholder.PasswordConfirmed
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={localStrings.GlobalPlaceholder.Password}
              />
            </Form.Item>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {localStrings.GlobalLabels.Confirmed}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  formDetail.setFieldsValue(new UserManagementResponseModel());
                  setDetailInfo({});
                  setResetModal(false);
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

export default UserManagementResetPassFeature;
