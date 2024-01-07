import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let backendUrl = "https://salesbot-001.azurewebsites.net";
// let backendUrl = "http://localhost:7071";
if(localStorage.getItem('local_backend') === 'true') {
  backendUrl = "http://localhost:7071"
}

const ChatContext = createContext();

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

let initialized = false

export const ChatProvider = ({ children }) => {
  const query = useQuery();
  const [loading, setLoading] = useState(false)
  const [companyLoadError, setCompanyLoadError] = useState(false)
  const [companyId, setCompanyId] = useState(
    query.get("company_id")
  )
  const [company, setCompany] = useState()
  const [conversation, _setConversation] = useState(
    JSON.parse(localStorage.getItem('conversation'))
  )
  const [avatarResponse, setAvatarResponse] = useState()

  const setConversation = convo => {
    localStorage.setItem('conversation', JSON.stringify(convo))
    _setConversation(convo)
  }

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(companyId && !company) {
        fetch(`${backendUrl}/api/company?companyid=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(setCompany)
          .catch(()=>setCompanyLoadError(true))
      }
    }
  }, []);

  const createNewConvo = () => {
    fetch(`${backendUrl}/api/create_conversation?companyid=${companyId}`, {
      method: "POST",
    })
      .then(data=>data.json())
      .then(setConversation)
      .catch(()=>alert("error creating conversation"))
  }

  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        backendUrl,
        conversation,
        setConversation,
        companyId,
        company,
        companyLoadError,
        createNewConvo,
        avatarResponse,
        setAvatarResponse,
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
