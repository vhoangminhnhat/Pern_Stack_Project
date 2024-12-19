import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  SafetyOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Spin } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import ChangePasswordViewModel from "../viewModel/ChangePasswordViewModel";

const ChangePasswordFeature = () => {
  const { error, handleOnChange, info, loading, onSubmit } =
    ChangePasswordViewModel();
  const { localStrings } = AuthenticationContext();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <Spin spinning={loading}>
        <Card title={localStrings.ChangePassword.Title}>
          <div className="md:w-2/5 mb-4 mx-auto">
            <Form>
              <div>
                <div>{localStrings.ChangePassword.OldPass}</div>
                <Form.Item
                  name="oldPassword"
                  className="h-18 pb-1"
                  validateStatus={error.oldPassword ? "error" : undefined}
                  help={
                    error.oldPassword
                      ? localStrings.ChangePassword.Message.OldPass
                      : undefined
                  }
                >
                  <Input.Password
                    size="large"
                    name="oldPassword"
                    className="rounded"
                    placeholder={localStrings.ChangePassword.OldPass}
                    prefix={<SafetyOutlined className="pr-1" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </div>
              <div>
                <div>{localStrings.ChangePassword.NewPass}</div>
                <Form.Item
                  name="password"
                  className="h-18 pb-1"
                  validateStatus={error.password ? "error" : undefined}
                  help={
                    error.password
                      ? localStrings.ChangePassword.NewPass
                      : undefined
                  }
                >
                  <Input.Password
                    size="large"
                    name="password"
                    className="rounded"
                    placeholder={localStrings.ChangePassword.NewPass}
                    prefix={<UnlockOutlined className="pr-1" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </div>
              <div>
                <div>{localStrings.ChangePassword.Reconfirmed}</div>
                <Form.Item
                  name="confirmPassword"
                  className="h-18 pb-1"
                  validateStatus={error.confirmPassword ? "error" : undefined}
                  help={
                    error.confirmPassword ? error.confirmPassword : undefined
                  }
                >
                  <Input.Password
                    size="large"
                    name="confirmPassword"
                    className="rounded"
                    placeholder={localStrings.ChangePassword.Reconfirmed}
                    prefix={<LockOutlined className="pr-1" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </div>
              <div className="mt-5 text-right">
                <Button
                  className="rounded h-9 w-24"
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
                >
                  {localStrings.GlobalLabels.Confirmed}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default ChangePasswordFeature;
