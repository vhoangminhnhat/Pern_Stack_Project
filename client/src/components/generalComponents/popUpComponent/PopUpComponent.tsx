import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";

message.config({
  top: 20,
  duration: 3,
  maxCount: 3,
  rtl: false,
});

function success(content, duration) {
  return message.success(content, duration);
}

function error(content = "Lỗi hệ thống, vui lòng thử lại !", duration) {
  return message.error(content, duration);
}

function info(content, duration) {
  return message.info(content, duration);
}

function warning(content, duration) {
  return message.warning(content, duration);
}

function loading(content, duration) {
  return message.loading(content, duration);
}

function confirm({ title, content, ok }) {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    onOk() {
      ok();
    },
    onCancel() {},
  });
}

const popUpComponent = { confirm, success, error, info, warning, loading };

export default popUpComponent;
