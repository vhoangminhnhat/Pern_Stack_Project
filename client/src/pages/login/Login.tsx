import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import { defaultAuthenticationsRepository } from "api/repositories/authentications/AuthenticationsRepository";
import { LoginRequestModel } from "api/repositories/authentications/model/LoginRequestModel";
import SidebarLogo from "assets/images/hcmus.png";
import LanguageSwitchingComponent from "components/languageSwitchingComponent/LanguageSwitchingComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { MdOutlineLockClock } from "react-icons/md";
import { colorFormat } from "utils/format/ColorFormat";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const Login = ({ history }) => {
  const [body, setBody] = React.useState({});
  const [error, setError] = React.useState<Record<string, unknown>>({});
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const { getRoles, language, setLanguage, localStrings } =
    AuthenticationContext();

  const onChange = (e) => {
    setError({});
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const onSubmit = async (value: LoginRequestModel) => {
    try {
      console.log(value);
      setLoading(true);
      let bodies = {
        username: value?.username,
        password: value?.password,
      };
      const { data } = await defaultAuthenticationsRepository?.login(bodies);
      localStorage.setItem("thesis-cms-token", data.id);
      delete data.id;
      await getRoles().then(() => {
        history.push("/personal/generals");
      });
    } catch (err) {
      console.log(err);
      getMessage(localStrings.GlobalMessage.InvalidAccount, 4, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full xl:w-1/4 lg:w-2/3 md:w-2/3 sm:w-2/3 rounded-lg p-6 mx-4 shadow-xl login-ui bg-gradient-to-br from-slate-100 from-65% to-blue-800">
        <div className="w-full text-center flex justify-center items-center p-1">
          <img
            alt="main-label"
            className="w-full h-28 object-contain"
            src={SidebarLogo}
          />
        </div>
        <br />
        <div className="mx-auto flex justify-center items-center w-full">
          <LanguageSwitchingComponent
            data={{
              language: language!,
              setLanguage: setLanguage!,
              color: "#1b82ec",
            }}
          />
        </div>
        <br />
        <div className="max-w-lg m-auto px-6 ">
          <Form form={form} onFinish={async (value) => await onSubmit(value)}>
            <div className="w-full">
              <Form.Item
                name="username"
                className="h-18 pb-1 hover:scale-105 transition-all"
                validateStatus={error.name ? "error" : undefined}
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="rounded"
                  prefix={<FaRegUser className="pr-1 text-xl" />}
                  placeholder={localStrings.GlobalPlaceholder.UserName}
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                name="password"
                className="h-18 pb-1 hover:scale-105 transition-all"
                validateStatus={error.password ? "error" : undefined}
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "",
                  },
                ]}
                help={
                  error.password
                    ? localStrings.GlobalPlaceholder.Password
                    : undefined
                }
              >
                <>
                  <Input.Password
                    size="large"
                    className="rounded"
                    placeholder={localStrings.GlobalPlaceholder.Password}
                    prefix={<MdOutlineLockClock className="pr-1 text-2xl" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </>
              </Form.Item>
            </div>
            <Form.Item className="text-center">
              <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: colorFormat?.Dark_Blue,
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="font-semibold hover:scale-105 transition-all"
                  icon={<IoLogIn className="text-xl" />}
                  style={{ pointerEvents: loading === true ? "none" : "all" }}
                  loading={loading}
                  htmlType="submit"
                >
                  {loading === true
                    ? localStrings.GlobalLabels.PleaseWait
                    : localStrings.GlobalLabels.Login}
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
