import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ChatBoxModal from "components/modals/ChatBoxModal";
import ChatBoxAgentViewmodel from "../viewModel/ChatBoxAgentViewmodel";

const ChatBoxAgentFeature = () => {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    handleSendMessage,
    conversations,
    handleKeyPress,
    isModalVisible,
    loadMessages,
    loading,
    setIsModalVisible,
  } = ChatBoxAgentViewmodel();

  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        onClick={handleClick}
        className="fixed bottom-8 right-8 w-12 h-12 text-lg"
      />
      <ChatBoxModal
        show={isModalVisible}
        close={() => setIsModalVisible(false)}
        messages={messages}
        isLoading={loading}
        onSendMessage={handleSendMessage}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        onKeyPress={handleKeyPress}
        conversations={conversations}
        onLoadMessages={loadMessages}
      />
    </>
  );
};

export default ChatBoxAgentFeature;
