import {
  BarcodeOutlined,
  CodeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Form, Input, Modal, Spin } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";

const ActionFeature = (props) => {
  const {
    getSimList,
    simList,
    setModal,
    modal,
    actionLoading,
    actionForm,
    handleActions,
    info,
    setInfo,
  } = props;
  const { localStrings } = AuthenticationContext();

  const filterSim = (value) => {
    let sim = simList?.filter((item) => item?.sim === value);
    if (sim) {
      actionForm.setFieldValue("package", sim[0]?.dataPackage);
    }
  };

  return (
    <Modal
      title={
        !isEmpty(info)
          ? localStrings.GlobalLabels.Detail
          : localStrings.GlobalLabels.Create
      }
      open={modal}
      centered
      destroyOnClose
      footer={null}
      closable={false}
    >
      <Spin
        spinning={actionLoading}
        indicator={<LoadingOutlined className="text-blue-600 font-semibold" />}
        tip={<span className="font-semibold">...Loading</span>}
      >
        <Form
          form={actionForm}
          onFinish={(values) =>
            handleActions(values, !isEmpty(info) ? "edit" : "create", info)
          }
        >
          <Form.Item
            name={"number"}
            label={localStrings.SimOrdersForPartners.Columns.Sim}
            initialValue={!isEmpty(info) ? info?.number : null}
            rules={[
              {
                required: true,
                type: "string",
                message: localStrings.SimOrdersForPartners.Message.InvalidSim,
              },
            ]}
          >
            <AutoComplete
              options={simList.map((item) => ({ value: item.sim }))}
              onSelect={(value) => filterSim(value)}
              onSearch={(value) => getSimList(value)}
              children={
                <Input
                  placeholder={localStrings.SimOrdersForPartners.Columns.Sim}
                  suffix={<BarcodeOutlined className="pl-1" />}
                />
              }
            />
          </Form.Item>
          {isEmpty(info) && (
            <Form.Item
              name={"package"}
              label={localStrings.SimOrdersForPartners.Columns.PackageType}
              rules={[
                {
                  required: true,
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder={
                  localStrings.SimOrdersForPartners.Message.InvalidPackages
                }
                className="pointer-events-none"
                suffix={<SnippetsOutlined className="pl-1" />}
              />
            </Form.Item>
          )}
          {!isEmpty(info) && (
            <Form.Item
              name={"orderCode"}
              label={localStrings.SimOrdersForPartners.Columns.OrderCode}
              initialValue={!isEmpty(info) ? info?.orderCode : null}
              rules={[
                {
                  required: false,
                  type: "string",
                  message:
                    localStrings.SimOrdersForPartners.Message.InvalidOrderCode,
                },
              ]}
            >
              <Input
                suffix={<CodeOutlined className="pl-1" />}
                className="pointer-events-none"
              />
            </Form.Item>
          )}

          <Form.Item
            name={"customerName"}
            label={localStrings.SimOrdersForPartners.Columns.CustomerName}
            initialValue={!isEmpty(info) ? info?.customerName : null}
            rules={[
              {
                required: true,
                type: "string",
                message: localStrings.GlobalPlaceholder.Name,
              },
            ]}
          >
            <Input
              placeholder={localStrings.GlobalPlaceholder.Name}
              suffix={<UserOutlined className="pl-1" />}
            />
          </Form.Item>
          <Form.Item
            name={"customerPhone"}
            label={localStrings.SimOrdersForPartners.Columns.CustomerPhone}
            initialValue={!isEmpty(info) ? info?.customerPhone : null}
            rules={[
              {
                required: true,
                type: "string",
                max: 10,
                message: localStrings.SimOrdersForPartners.Message.InvalidPhone,
              },
            ]}
          >
            <Input
              placeholder={localStrings.GlobalPlaceholder.Phone}
              maxLength={10}
              suffix={<PhoneOutlined className="pl-1" />}
            />
          </Form.Item>
          <Form.Item
            name={"address"}
            label={localStrings.SimOrdersForPartners.Columns.Address}
            initialValue={!isEmpty(info) ? info?.address : null}
            rules={[
              {
                required: true,
                type: "string",
                message: localStrings.SimOrdersForPartners.Message.Address,
              },
            ]}
          >
            <Input.TextArea
              placeholder={localStrings.SimOrdersForPartners.Message.Address}
              minLength={1}
              className="overflow-hidden"
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            label={localStrings.SimOrdersForPartners.Columns.Email}
            initialValue={!isEmpty(info) ? info?.email : null}
            rules={[
              {
                required: true,
                type: "email",
                message: localStrings.GlobalPlaceholder.Email,
              },
            ]}
          >
            <Input
              placeholder={localStrings.GlobalPlaceholder.Email}
              suffix={<MailOutlined className="pl-1" />}
            />
          </Form.Item>
          {!isEmpty(info) && (
            <p className="text-blue-700">
              <i className="text-red-700 underline">Lưu ý:</i> Thông tin có dấu{" "}
              <b className="text-red-700">*</b> là thông tin có thể chỉnh sửa
            </p>
          )}
          <br />
          <Form.Item className="flex justify-center items-center">
            <Button type="primary" htmlType="submit">
              {isEmpty(info)
                ? localStrings.GlobalLabels.Create
                : localStrings.GlobalLabels.Update}
            </Button>
            <Button
              onClick={() => {
                actionForm.resetFields();
                setInfo({});
                setModal(false);
              }}
              className="ml-2"
            >
              {localStrings.GlobalLabels.Cancel}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ActionFeature;
