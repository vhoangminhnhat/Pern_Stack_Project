import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";

const ArticleManagementSummarize = (props: {
  data: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  return (
    <Modal
      open={props?.data?.modal}
      centered
      destroyOnClose
      width={1300}
      footer={null}
      onCancel={() => props?.data?.setModal(false)}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 10px)",
          scrollbarWidth: "none",
          overflowX: "hidden",
        },
      }}
    >
      <div className="w-full min-wh-full flex justify-center items-center p-3">
        <iframe
          src="https://solidpoint.ai/arxiv-summarizer"
          style={{ width: "100%", height: "90vh" }}
        />
      </div>
    </Modal>
  );
};

export default ArticleManagementSummarize;
