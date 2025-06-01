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

  const handleSendMessage = async (message: string, file?: File) => {
    if (!message.trim() && !file) return;

    const messageToSend = message || "Please analyze this document";
    setCurrentMessage(""); // Clear input immediately

    const tempUserMessage: ChatMessageResponseModel = {
      id: Date.now().toString(),
      body: messageToSend,
      isAI: false,
      createdAt: new Date().toISOString(),
    };

    const tempAIMessage: ChatMessageResponseModel = {
      id: (Date.now() + 1).toString(),
      body: "",
      isAI: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMessage, tempAIMessage]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", messageToSend);
      if (file) {
        formData.append("file", file);
      }

      const response = await chatRepository.sendMessage(formData);

      // Replace temporary messages with actual messages
      setMessages((prev) => {
        const filteredMessages = prev.filter(
          (msg) => msg.id !== tempUserMessage.id && msg.id !== tempAIMessage.id
        );
        return [
          ...filteredMessages,
          response.data.userMessage,
          response.data.aiMessage,
        ];
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary AI message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempAIMessage.id));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      await handleSendMessage(currentMessage);
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
    setMessages,
  };
};

export default ChatBoxAgentViewmodel;
