import { Modal } from "antd";
import { IModalConfirmation } from "./model/ModalConfirmationModel";
import { AuthenticationContext } from "context/AuthenticationContext";

const ModalConfirmationComponent = (props: IModalConfirmation) => {
  const {localStrings} = AuthenticationContext();
  const { onOk } = props?.data;
  return Modal.confirm({
    content: localStrings.GlobalMessage.DeleteConfirmation,
    okText: localStrings.GlobalLabels.Confirmed,
    okType: "danger",
    cancelText: localStrings.GlobalLabels.Cancel,
    async onOk() {
      await onOk();
    },
  });
};

export default ModalConfirmationComponent;
