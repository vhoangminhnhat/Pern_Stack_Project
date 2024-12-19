import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button, Modal } from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import { PreviewFeatureProps } from "./actionFeatureTypes/ActionFeatureTypes";

const PreviewFeature = (props: PreviewFeatureProps) => {
  const { docs, modal, setModal } = props?.data;
  const { localStrings } = AuthenticationContext();
  return (
    <Modal
      centered
      width={1300}
      open={modal}
      onCancel={() => setModal(false)}
      title={localStrings.ContentManagement.Columns.Preview}
      closable={false}
      destroyOnClose
      footer={[
        <Button type="default" onClick={() => setModal(false)}>
          {localStrings.GlobalLabels.Cancel}
        </Button>,
      ]}
    >
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ width: "100%", height: 850 }}
      />
    </Modal>
  );
};

export default PreviewFeature;
