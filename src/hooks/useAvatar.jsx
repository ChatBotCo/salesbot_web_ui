import { createContext, useContext, useState } from "react";
import {useChat} from "./useChat.jsx";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const {
    setConversationId,
  } = useChat();

  const [selectedAvatarId, _setSelectedAvatarId] = useState(
    localStorage.getItem('selectedAvatarId')
  );

  const setSelectedAvatarId = avatarId => {
    localStorage.setItem('selectedAvatarId', avatarId)
    _setSelectedAvatarId(avatarId);
  };

  const resetConversation = () => {
    if(window.confirm("Are you sure you want to create a new avatar?  This entire conversation will be permanently lost!")) {
      localStorage.removeItem('conversationId')
      localStorage.removeItem('selectedAvatarId')
      setConversationId(null)
      setSelectedAvatarId(null)
    }
  }

  return (
    <AvatarContext.Provider
      value={{
        selectedAvatarId,
        setSelectedAvatarId,
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
