import {
  LoadingOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Spin, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { ChatMessageResponseModel } from "api/repositories/chat/models/ChatMessageResponseModel";
import { ConversationResponseModel } from "api/repositories/chat/models/conversation/ConversationResponseModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import moment from "moment";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

interface IChatBoxModal {
  show: boolean;
  close: () => void;
  messages: ChatMessageResponseModel[];
  setMessages?: Dispatch<SetStateAction<ChatMessageResponseModel[]>>;
  isLoading: boolean;
  onSendMessage: (message: string, file?: File, filename?: string) => void;
  currentMessage: string;
  setCurrentMessage: Dispatch<SetStateAction<string>>;
  onKeyPress: (e: React.KeyboardEvent) => void;
  conversations: ConversationResponseModel[];
  onLoadMessages: (conversationId: string) => void;
}

const ChatBoxModal: React.FC<IChatBoxModal> = ({
  show,
  close,
  messages,
  setMessages,
  onSendMessage,
  currentMessage,
  setCurrentMessage,
  onKeyPress,
}) => {
  const { localStrings } = AuthenticationContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    setFileName("");
    if (currentMessage.trim() || fileList.length > 0) {
      const file = fileList[0]?.originFileObj;
      if (file && !beforeUpload(file)) {
        return;
      }
      onSendMessage(currentMessage, file);
      setCurrentMessage("");
      setFileList([]);
    }
  };

  const beforeUpload = (file: File) => {
    const isPDF = file.type === "application/pdf";
    const isExcel =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isPDF && !isExcel) {
      getMessage("You can only upload PDF or Excel files!", 5, "error");
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 20;
    if (!isLt10M) {
      getMessage("File must be smaller than 20MB!", 5, "error");
      return false;
    }

    // Check if file is empty
    if (file.size === 0) {
      getMessage("Cannot upload empty file!", 5, "error");
      return false;
    }

    return true;
  };

  const handleFileChange = ({
    fileList: newFileList,
    file,
  }: {
    fileList: UploadFile[];
    file: UploadFile;
  }) => {
    const fileObj = file.originFileObj;
    if (!fileObj) return;

    if (!beforeUpload(fileObj)) {
      setFileList([]);
      return;
    }
    onSendMessage("", fileObj, file.name as string);
    setFileList([]);
  };

  return (
    <Modal
      title={localStrings.ChatBox.Title}
      open={show}
      footer={null}
      onCancel={close}
      className="p-3"
      centered
      width={600}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 140px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        },
      }}
    >
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isAI ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isAI
                    ? "bg-white border border-gray-200 shadow-sm"
                    : "bg-blue-500 text-white shadow-md"
                }`}
              >
                {message.isAI && !message.body ? (
                  <div className="flex items-center gap-2">
                    <Spin size="small" indicator={<LoadingOutlined />} />
                    <span className="text-gray-500">AI is typing...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.body}
                    </p>

                    {message.isAI == false && !isEmpty(message.fileName) ? (
                      <div className="mt-2 bg-white text-black p-2 rounded shadow-sm">
                        📄{" "}
                        <span className="font-medium text-black">
                          {message.fileName}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <p
                      className={`text-xs mt-1 ${
                        message.isAI ? "text-gray-500" : "text-blue-100"
                      }`}
                    >
                      {moment(message.createdAt).format("HH:mm")}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-end gap-2">
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onChange={handleFileChange}
            maxCount={1}
            showUploadList={false}
            accept=".pdf,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess?.("ok");
              }, 0);
            }}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
          <Input.TextArea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Type your message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatBoxModal;
