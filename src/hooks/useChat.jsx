import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

let backendUrl = "https://keli-chatbot-003.azurewebsites.net";
// let backendUrl = "http://localhost:7071";
if(localStorage.getItem('local_backend') === 'true') {
  backendUrl = "http://localhost:7071"
}

const ChatContext = createContext();

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const ChatProvider = ({ children }) => {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(
    query.get("company_id")
  )
  const [conversationId, _setConversationId] = useState(
    localStorage.getItem('conversationId')
  )

  const setConversationId = convoId => {
    localStorage.setItem('conversationId', convoId)
    _setConversationId(convoId)
  }

  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        backendUrl,
        conversationId,
        setConversationId,
        companyId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
