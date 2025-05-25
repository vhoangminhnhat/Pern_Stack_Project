import React, { useEffect, useState } from 'react'

const ChatBoxAgentViewmodel = () => {
    const [isOpenChatBot, setIsOpenChatBot] = useState(false);
    const [currentTab, setCurrentTab] = useState<"home" | "messages">("home");
    const [isLoading, setIsLoading] = useState(false);
    const [isAskQuestion, setIsAskQuestion] = useState(false);
    const [chats, setChats] = useState<string[]>([]);
    // const [currentText, setCurrentText] = useState("");
  
    console.log("textMessages::", chats);
  
    const fetchChats = async () => {
    //   const { data } = await axios.get(`${APIEndPoints.backendUrl}/api/chat`);
  
    //   setChats(data);
    };
  
    useEffect(() => {
      fetchChats();
    }, []);
  
    const handleClick = () => {
      setIsOpenChatBot((prev) => !prev);
    };
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [isLoading]);
}

export default ChatBoxAgentViewmodel