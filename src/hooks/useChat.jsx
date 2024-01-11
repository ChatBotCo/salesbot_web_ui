import {createContext, useContext, useEffect, useState} from "react";
import {useUtilities} from "./useUtilities.jsx";
import {useCompany} from "./useCompany.jsx";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const {
    backendUrl,
    setLoading,
  } = useUtilities();

  const {
    companyId,
    company,
  } = useCompany();

  const [avatarResponse, setAvatarResponse] = useState()
  const [lastAvatarResponseText, _setLastAvatarResponseText] = useState()
  const setLastAvatarResponseText = _text => {
    _setLastAvatarResponseText(_text)
    setFeedbackSent(false)//Reset 'thank you' for user submitting feedback
  }

  const [conversation, _setConversation] = useState(
    JSON.parse(localStorage.getItem('conversation'))
  )
  const setConversation = convo => {
    localStorage.setItem('conversation', JSON.stringify(convo))
    _setConversation(convo)
  }

  useEffect(() => {
    if(company && !lastAvatarResponseText) {
      setLastAvatarResponseText(company.greeting)
    }
  }, [company]);


  const viewModes = {
    collapsed:'collapsed',
    greeting:'greeting',
    chat:'chat',
  }
  const [viewMode, setViewMode] = useState(viewModes.greeting)

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


  const [feedbackSent, setFeedbackSent] = useState(false);
  const submitUserFeedback = userFeedback => {
    setFeedbackSent(true)
    fetch(`${backendUrl}/api/submit_user_feedback?convoid=${conversation.id}&companyid=${company.company_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFeedback),
    })
      .catch(()=>alert("error submitting user feedback"))
  }

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
        viewModes, viewMode, setViewMode,
        submitUserFeedback, feedbackSent,
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
