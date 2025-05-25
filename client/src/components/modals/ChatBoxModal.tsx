import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
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
      title="Chat with AI Assistant"
      open={show}
      footer={null}
      onCancel={close}
      className="p-3"
      centered
      width={400}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 160px)",
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
                message.senderId === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === "ai"
                    ? "bg-gray-100"
                    : "bg-blue-500 text-white"
                }`}
              >
                <p className="text-sm">{message.body}</p>
                <p className="text-xs mt-1 opacity-70">
                  {moment(message.createdAt).format("HH:mm")}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2">
          <Input.TextArea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type your message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatBoxModal;
