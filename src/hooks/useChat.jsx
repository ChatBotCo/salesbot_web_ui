import {createContext, useContext, useEffect, useState} from "react";
import {useUtilities} from "./useUtilities.jsx";
import {useCompany} from "./useCompany.jsx";
import {useChatbot} from "./useChatbot.jsx";

const ChatContext = createContext();

let initializedConvo = false
export const ChatProvider = ({ children }) => {
  const {
    backendUrl,
    backendUrlAdmin,
    setLoading,
  } = useUtilities();

  const {
    companyId,
    company,
  } = useCompany();

  const {
    chatbotGreeting,
  } = useChatbot();

  const [avatarResponse, setAvatarResponse] = useState()
  const [lastAvatarResponseText, _setLastAvatarResponseText] = useState()
  const setLastAvatarResponseText = _text => {
    _setLastAvatarResponseText(_text)
    setFeedbackSent(false)//Reset 'thank you' for user submitting feedback
  }
  const [redirectUrl, setRedirectUrl] = useState('')

  const [conversation, _setConversation] = useState(localStorage.getItem('conversation'))
  const setConversation = convo => {
    localStorage.setItem('conversation', JSON.stringify(convo))
    _setConversation(convo)
  }

  useEffect(() => {
    if(!initializedConvo) {
      initializedConvo = true
      // Verify that the saved conversation object exists, if NOT then reset the app storage
      const _convo = JSON.parse(localStorage.getItem('conversation'))
      if(_convo && _convo.id) {
        fetch(`${backendUrlAdmin}/api/conversations/verify?convo_id=${_convo.id}`, {
          method: "GET",
        })
          .then(data=>{
            if(data.status !== 204) {
              console.log('convo invalid, recreating')
              localStorage.removeItem('conversation')
              createNewConvo()
            } else {
              setConversation(_convo)
            }
          })
          .catch(console.error)
      }
    }
  }, []);

  useEffect(() => {
    if(chatbotGreeting && !lastAvatarResponseText) {
      setLastAvatarResponseText(chatbotGreeting)
      setViewMode(viewModes.greeting)
    }
  }, [chatbotGreeting]);


  const viewModes = {
    none:'none',//This is for "hiding" the chatbot until loading is complete
    collapsed:'collapsed',
    greeting:'greeting',
    chat:'chat',
  }
  const [viewMode, setViewMode] = useState(viewModes.none)

  const [mute, _setMute] = useState(localStorage.getItem('mute')==='true' )
  const setMute = _mute => {
    localStorage.setItem('mute', _mute)
    _setMute(_mute)
  }

  const resetConvo = () => {
    setConversation(null)
    localStorage.removeItem('conversation')
    location.reload()
  }

  const createNewConvo = () => {
    setLoading(true)
    return fetch(`${backendUrlAdmin}/api/conversations/create?companyid=${companyId}`, {
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
        createNewConvo,
        avatarResponse,
        setAvatarResponse,
        lastAvatarResponseText, setLastAvatarResponseText,
        mute, setMute,
        onMessagePlayed,
        audio, setAudio,
        viewModes, viewMode, setViewMode,
        submitUserFeedback, feedbackSent,
        redirectUrl, setRedirectUrl,
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
