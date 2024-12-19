import { Modal } from "antd";
import ReactJson from "react-json-view";

const DataViewModal = ({ record, setOpen, open }) => {
  return (
    <Modal
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      open={open}
    >
      <ReactJson src={record} />
    </Modal>
  );
};

export default DataViewModal;
