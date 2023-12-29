import { createContext, useContext, useState } from "react";
import {useChat} from "./useChat.jsx";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const {
    setConversationId,
  } = useChat();

  const [selectedAvatar, _setSelectedAvatar] = useState(
    JSON.parse(localStorage.getItem('selectedAvatar'))
  );

  const setSelectedAvatar = avatar => {
    localStorage.setItem('selectedAvatar', JSON.stringify(avatar))
    _setSelectedAvatar(avatar);
  };

  const resetAvatar = () => {
    setConversationId(null)
    setSelectedAvatar(null)
    localStorage.removeItem('conversationId')
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
