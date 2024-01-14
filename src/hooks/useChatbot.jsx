import {createContext, useContext, useEffect, useState} from "react";
import {useUtilities} from "./useUtilities.jsx";
import {useCompany} from "./useCompany.jsx";

const ChatbotContext = createContext();

let initialized = false

export const ChatbotProvider = ({ children }) => {
  const {
    backendUrl,
    setLoading,
  } = useUtilities();

  const {
    companyId,
    setCompanyLoadError,
  } = useCompany();

  const [showAvatar, setShowAvatar] = useState(true)
  const [chatbotGreeting, setChatbotGreeting] = useState('')
  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(companyId) {
        setLoading(true)
        fetch(`${backendUrl}/api/chatbot?companyid=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(_chatbot =>{
            console.log(_chatbot)
            setShowAvatar(_chatbot.show_avatar)
            setChatbotGreeting(_chatbot.greeting)
          })
          .catch(()=>setCompanyLoadError(true))
          .finally(()=>setLoading(false))
      }
    }
  }, [companyId]);

  return (
    <ChatbotContext.Provider
      value={{
        showAvatar,
        chatbotGreeting,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
