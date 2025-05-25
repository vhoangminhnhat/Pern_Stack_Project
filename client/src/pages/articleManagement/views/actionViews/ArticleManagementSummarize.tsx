import { Button, Modal } from "antd";
import { IArticleManagementSummarize } from "pages/articleManagement/interfaces/IArticleManagment";

const ArticleManagementSummarize = (props: IArticleManagementSummarize) => {
  const { summary, modal, setModal } = props?.data;

  return (
    <>
      <Modal
        title="Article Summary"
        open={modal}
        onCancel={() => setModal(false)}
        footer={[
          <Button key="close" onClick={() => setModal(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <div className="whitespace-pre-wrap">
          {summary || "No summary available"}
        </div>
      </Modal>
    </>
  );
};

export default ArticleManagementSummarize;
