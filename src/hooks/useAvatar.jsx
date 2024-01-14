import {createContext, useContext, useEffect, useState} from "react";
import {useChat} from "./useChat.jsx";
import {useUtilities} from "./useUtilities.jsx";
import {useCompany} from "./useCompany.jsx";

const AvatarContext = createContext();

let initialized = false

export const AvatarProvider = ({ children }) => {
  const {
    setConversation,
  } = useChat();

  const {
    backendUrl,
    setLoading,
  } = useUtilities();

  const {
    companyId,
    setCompanyLoadError,
  } = useCompany();

  const [showAvatar, setShowAvatar] = useState(true)
  useEffect(() => {
    if(!initialized) {
      initialized = true
      console.log(companyId)
      if(companyId) {
        setLoading(true)
        fetch(`${backendUrl}/api/chatbot?companyid=${companyId}`, {
          method: "GET",
        })
          .then(data=>data.json())
          .then(_chatbot =>{
            console.log(_chatbot)
            setShowAvatar(_chatbot.show_avatar)
            // setCompany(_company)
          })
          .catch(()=>setCompanyLoadError(true))
          .finally(()=>setLoading(false))
      }
    }
  }, [companyId]);

  const [selectedAvatar, _setSelectedAvatar] = useState(
    {
      id:'keli',name:'Keli',gender:'female'
    }
  );

  const setSelectedAvatar = avatar => {
    localStorage.setItem('selectedAvatar', JSON.stringify(avatar))
    _setSelectedAvatar(avatar);
  };

  const resetAvatar = () => {
    setConversation(null)
    setSelectedAvatar(null)
    localStorage.removeItem('conversation')
    localStorage.removeItem('selectedAvatar')
  }

  const resetConversation = () => {
    if(window.confirm("Are you sure you want to create a new avatar?  This entire conversation will be permanently lost!")) {
      resetAvatar()
    }
  }

  const avatars = [
    {   id: 'keli',     name: 'Keli',     gender: 'female',   voice: 'en-US-JennyNeural',   },
    {   id: 'janice',   name: 'Janice',   gender: 'female',   voice: 'en-US-EmmaNeural',    },
    {   id: 'robyn',    name: 'Robyn',    gender: 'female',   voice: 'en-US-AriaNeural',    },
    {   id: 'raymond',  name: 'Raymond',  gender: 'male',     voice: 'en-US-BrandonNeural',   },
    {   id: 'allen',    name: 'Allen',    gender: 'male',     voice: 'en-US-SteffanNeural',   },
    {   id: 'tonya',    name: 'Tonya',    gender: 'female',   voice: 'en-US-JaneNeural',    },
    {   id: 'david',    name: 'David',    gender: 'male',     voice: 'en-US-JacobNeural',     },
    {   id: 'tina',     name: 'Tina',     gender: 'female',   voice: 'en-US-SaraNeural',    },
  ]

  return (
    <AvatarContext.Provider
      value={{
        avatars,
        selectedAvatar,
        setSelectedAvatar,
        resetConversation,
        resetAvatar,
        showAvatar,
        setShowAvatar,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within a AvatarProvider");
  }
  return context;
};
