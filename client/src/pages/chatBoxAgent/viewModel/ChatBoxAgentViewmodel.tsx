import { chatRepository } from "api/repositories/chat/ChatRepository";
import { ChatMessageResponseModel } from "api/repositories/chat/models/ChatMessageResponseModel";
import { ConversationResponseModel } from "api/repositories/chat/models/conversation/ConversationResponseModel";
import { useEffect, useState } from "react";

export const ChatBoxAgentViewmodel = () => {
  const [messages, setMessages] = useState<ChatMessageResponseModel[]>([]);
  const [conversations, setConversations] = useState<
    ConversationResponseModel[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await chatRepository.listConversations({
        page: 1,
        limit: 10,
      });
      setConversations(response.data);
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await chatRepository.getMessages(conversationId);
      setMessages(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    setLoading(true);
    try {
      const response = await chatRepository.sendMessage({
        message: currentMessage,
      });
      setMessages((prev) => [
        ...prev,
        response.data.userMessage,
        response.data.aiMessage,
      ]);
      setCurrentMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    conversations,
    currentMessage,
    loading,
    isModalVisible,
    setCurrentMessage,
    setIsModalVisible,
    handleSendMessage,
    handleKeyPress,
    loadMessages,
  };
};

export default ChatBoxAgentViewmodel;
