import { createContext, useContext, useState } from "react";
import {useUtilities} from "./useUtilities.jsx";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const {
    backendUrl,
    setLoading,
  } = useUtilities();

  const [avatarResponse, setAvatarResponse] = useState()
  const [lastAvatarResponseText, setLastAvatarResponseText] = useState('Hello!')

  const [conversation, _setConversation] = useState(
    JSON.parse(localStorage.getItem('conversation'))
  )
  const setConversation = convo => {
    localStorage.setItem('conversation', JSON.stringify(convo))
    _setConversation(convo)
  }
  const [showChat, _setShowChat] = useState(
    localStorage.getItem('showChat')==='true'
  )
  const setShowChat = _showChat => {
    localStorage.setItem('showChat', _showChat)
    _setShowChat(_showChat)
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

  const createNewConvo = () => {
    setLoading(true)
    fetch(`${backendUrl}/api/create_conversation?companyid=${companyId}`, {
      method: "POST",
    })
      .then(data=>data.json())
      .then(setConversation)
      .catch(()=>alert("error creating conversation"))
      .finally(()=>setLoading(false))
  }

  const [audio, setAudio] = useState();

  const onMessagePlayed = () => {
    setAvatarResponse();
  };

  return (
    <ChatContext.Provider
      value={{
        conversation,
        setConversation,
        resetConvo,
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
