import {createContext, useContext, useEffect, useState} from "react";
import {useUtilities} from "./useUtilities.jsx";
import {useCompany} from "./useCompany.jsx";

const ChatbotContext = createContext();

let initialized = false

export const ChatbotProvider = ({ children }) => {
  const {
    backendUrlAdmin,
    setLoading,
  } = useUtilities();

  const {
    companyId,
    setCompanyLoadError,
  } = useCompany();

  const [avatarView, setAvatarView] = useState('')
  const [chatbotGreeting, setChatbotGreeting] = useState('')
  const [showCallToAction, setShowCallToAction] = useState(false)
  const [contactLink, setContactLink] = useState('')
  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(companyId) {
        setLoading(true)
        fetch(`${backendUrlAdmin}/api/chatbots/client?company_id=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(_chatbot =>{
            // console.log(_chatbot)
            setAvatarView(_chatbot.avatar_view)
            setChatbotGreeting(_chatbot.greeting)
            setContactLink(_chatbot.contact_link)
            setShowCallToAction(_chatbot.show_call_to_action)
          })
          .catch(()=>setCompanyLoadError(true))
          .finally(()=>setLoading(false))
      }
    }
  }, [companyId]);

  return (
    <ChatbotContext.Provider
      value={{
        avatarView,
        chatbotGreeting,
        showCallToAction,
        contactLink,
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
