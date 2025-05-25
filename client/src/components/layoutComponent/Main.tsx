import { MessageOutlined } from "@ant-design/icons";
import Header from "components/Header";
import ChatBoxAgentViewmodel from "pages/chatBoxAgent/viewModel/ChatBoxAgentViewmodel";
import { useState } from "react";
import Sidebar from "../Sidebar";
import FloatingButton from "../floatingButton/FloatingButton";
import ChatBoxModal from "../modals/ChatBoxModal";

function Main({ children, history, info }: any) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <section>{children}</section>
        <FloatingButton icon={<MessageOutlined />} onClick={handleClick} />
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
      </div>
    </div>
  );
}

export default Main;
