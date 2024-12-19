import { FileImageOutlined, FileWordOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Modal, Row } from "antd";
import { DownloadFeatureProps } from "./actionFeatureTypes/ActionFeatureTypes";

const DownloadFeature = (props: DownloadFeatureProps) => {
  const { downloadFile, downloadModal, info, setDownloadModal, setInfo } =
    props?.data;
  return (
    <Modal
      open={downloadModal}
      centered
      destroyOnClose
      footer={null}
      closeIcon={false}
      onCancel={() => {
        setDownloadModal(false);
        setInfo({});
      }}
    >
      <Row gutter={[8, 8]}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorIconHover: "#1e40af",
              colorPrimary: "#1e40af",
              colorText: "#1e40af",
            },
          }}
        >
          <Col lg={12} span={24}>
            <Button
              className="w-full flex justify-center items-center text-center border-2 border-blue-800 text-blue-800 font-bold"
              type="default"
              onClick={async () =>
                await downloadFile(info?.image, info?.title, "image")
              }
            >
              <FileImageOutlined />
              <span>Ảnh</span>
            </Button>
          </Col>
        </ConfigProvider>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorIconHover: "#047857",
              colorText: "#047857",
              colorPrimary: "#047857",
            },
          }}
        >
          <Col lg={12} span={24}>
            <Button
              className="w-full flex justify-center items-center text-center border-2 border-green-700 text-green-700 font-bold"
              type="default"
              onClick={() => downloadFile(info?.file, info?.title, "file")}
            >
              <FileWordOutlined />
              <span>File</span>
            </Button>
          </Col>
        </ConfigProvider>
      </Row>
    </Modal>
  );
};

export default DownloadFeature;
