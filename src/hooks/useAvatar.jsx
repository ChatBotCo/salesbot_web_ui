import { createContext, useContext, useState } from "react";
import {useChat} from "./useChat.jsx";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const {
    setConversationId,
  } = useChat();

  const [selectedAvatar, _setSelectedAvatar] = useState(
    localStorage.getItem('selectedAvatar')
  );

  const setSelectedAvatar = avatarId => {
    localStorage.setItem('selectedAvatar', avatarId)
    _setSelectedAvatar(avatarId);
  };

  const resetConversation = () => {
    if(window.confirm("Are you sure you want to create a new avatar?  This entire conversation will be permanently lost!")) {
      localStorage.removeItem('conversationId')
      localStorage.removeItem('selectedAvatar')
      setConversationId(null)
      setSelectedAvatar(null)
    }
  }

  const avatars = [
    {   id: 'keli',     name: 'Keli',     gender: 'female',   voice: 'en-US-JennyNeural',   },
    {   id: 'janice',   name: 'Janice',   gender: 'female',   voice: 'en-US-EmmaNeural',    },
    {   id: 'robyn',    name: 'Robyn',    gender: 'female',   voice: 'en-US-AriaNeural',    },
    {   id: 'raymond',  name: 'Raymond',  gender: 'male',     voice: 'en-US-DavisNeural',   },
    {   id: 'allen',    name: 'Allen',    gender: 'male',     voice: 'en-US-JasonNeural',   },
    {   id: 'tonya',    name: 'Tonya',    gender: 'female',   voice: 'en-US-JaneNeural',    },
    {   id: 'david',    name: 'David',    gender: 'male',     voice: 'en-US-GuyNeural',     },
    {   id: 'tina',     name: 'Tina',     gender: 'female',   voice: 'en-US-SaraNeural',    },
  ]

  return (
    <AvatarContext.Provider
      value={{
        avatars,
        selectedAvatar,
        setSelectedAvatar,
        resetConversation,
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
