import { Button, Divider, Modal, Typography } from "antd";
import { IArticleManagementSummarize } from "pages/articleManagement/interfaces/IArticleManagment";
import { IoNewspaper } from "react-icons/io5";

const { Title, Paragraph } = Typography;

const ArticleManagementSummarize = (props: IArticleManagementSummarize) => {
  const { summary, modal, actionType, setActionType, setModal } = props?.data;

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-2 text-xl font-semibold">
            <IoNewspaper className="text-blue-500" />
            <span>
              {actionType === "relation"
                ? "Related documents"
                : "Article Summary"}
            </span>
          </div>
        }
        open={modal}
        centered
        onCancel={() => {
          setActionType("");
          setModal(false);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setActionType("");
              setModal(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white border-none h-10 px-6 text-sm rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            Close
          </Button>,
        ]}
        width={820}
        className="rounded-xl"
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
            scrollbarWidth: "thin",
            overflowX: "hidden",
          },
          header: {
            padding: "10px 20px",
            borderBottom: "1px solid #f0f0f0",
            background: "#fff",
          },
          footer: {
            padding: "10px 20px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff",
          },
        }}
      >
        <div className="bg-gray-50 rounded-lg p-3">
          {summary ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 shadow-sm whitespace-pre-wrap">
                <Paragraph className="text-gray-700 leading-relaxed text-base">
                  {summary}
                </Paragraph>
              </div>
              <Divider className="my-4" />
              <div className="text-sm text-gray-500 italic">
                Generated using Deepseek
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Title level={4} className="text-gray-500">
                No summary available
              </Title>
              <Paragraph className="text-gray-400">
                Please try again later
              </Paragraph>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ArticleManagementSummarize;
