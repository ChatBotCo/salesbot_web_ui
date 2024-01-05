import { createContext, useContext, useState } from "react";

let backendUrl = "https://keli-chatbot-003.azurewebsites.net";
// let backendUrl = "http://localhost:7071";
if(localStorage.getItem('local_backend') === 'true') {
  backendUrl = "http://localhost:7071"
}

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
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
