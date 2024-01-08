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

const getDataCompanyId = debugging => {
  if(debugging) {
    return useQuery().get('company_id')
  } else {
    const scriptTag = document.querySelector('script[src="sales_chatbot.js"]');
    if (scriptTag) {
      const _companyId = scriptTag.getAttribute('data-company-id');
      if(_companyId) {
        // console.log(`data-company-id:${_companyId}`);
        return _companyId
      } else {
        console.error('NOT FOUND: data-company-id - Did you forget to add it to the Sales ChatBot HTML element?')
        return null
      }
    } else {
      console.error('NOT FOUND: script sales_chatbot.js - Did you forget to add the Sales ChatBot HTML script element?')
      return null
    }
  }
}

let initialized = false

export const ChatProvider = ({ children }) => {
  const query = useQuery();
  const [debugging, _] = useState(
    localStorage.getItem('debugging')==='true'
  )
  const [showChat, setShowChat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companyLoadError, setCompanyLoadError] = useState(false)
  const [companyId, setCompanyId] = useState(
    // query.get("company_id")
    getDataCompanyId(debugging)
  )
  const [avatarResponse, setAvatarResponse] = useState()
  const [lastAvatarResponseText, setLastAvatarResponseText] = useState('Hello!')

  const [company, setCompany] = useState()
  const [conversation, _setConversation] = useState(
    JSON.parse(localStorage.getItem('conversation'))
  )
  const setConversation = convo => {
    localStorage.setItem('conversation', JSON.stringify(convo))
    _setConversation(convo)
  }


  const [mute, _setMute] = useState(localStorage.getItem('mute')==='true' )
  const setMute = _mute => {
    localStorage.setItem('mute', _mute)
    _setMute(_mute)
  }



  const resetConvo = () => {
    if(window.confirm("Are you sure you want to reset this conversation?")) {
      setConversation(null)
      localStorage.removeItem('conversation')
      location.reload()
    }
  }

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(companyId && !company) {
        setLoading(true)
        fetch(`${backendUrl}/api/company?companyid=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(setCompany)
          .catch(()=>setCompanyLoadError(true))
          .finally(()=>setLoading(false))
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

  const [audio, setAudio] = useState();

  const onMessagePlayed = () => {
    setAvatarResponse();
  };

  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        backendUrl,
        conversation,
        setConversation,
        resetConvo,
        companyId,
        company,
        companyLoadError,
        createNewConvo,
        avatarResponse,
        setAvatarResponse,
        lastAvatarResponseText, setLastAvatarResponseText,
        mute, setMute,
        onMessagePlayed,
        audio, setAudio,
        showChat, setShowChat,
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
