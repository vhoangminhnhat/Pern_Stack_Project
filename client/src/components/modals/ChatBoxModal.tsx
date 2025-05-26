import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Spin } from "antd";
import { ChatMessageResponseModel } from "api/repositories/chat/models/ChatMessageResponseModel";
import { ConversationResponseModel } from "api/repositories/chat/models/conversation/ConversationResponseModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import moment from "moment";
import React, { useEffect, useRef } from "react";

interface ChatBoxModalProps {
  show: boolean;
  close: () => void;
  messages: ChatMessageResponseModel[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  conversations: ConversationResponseModel[];
  onLoadMessages: (conversationId: string) => void;
}

const ChatBoxModal: React.FC<ChatBoxModalProps> = ({
  show,
  close,
  messages,
  isLoading,
  onSendMessage,
  currentMessage,
  setCurrentMessage,
  onKeyPress,
  conversations,
  onLoadMessages,
}) => {
  const { localStrings } = AuthenticationContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      onSendMessage(currentMessage);
      setCurrentMessage("");
    }
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
        <div className="flex items-center gap-2">
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
