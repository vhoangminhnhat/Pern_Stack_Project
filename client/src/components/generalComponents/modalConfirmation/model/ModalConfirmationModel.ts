import { ModalFuncProps } from "antd";

export interface IModalConfirmation {
  data: {
    onOk: ModalFuncProps["onOk"];
  };
}
