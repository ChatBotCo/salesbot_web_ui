import { createContext, useContext, useEffect, useState } from "react";

// const backendUrl = "http://localhost:3000";
// const backendUrl = "http://localhost:7071/api";
const backendUrl = "https://keli-bot-backend-325d5558f8b6.herokuapp.com";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatMsgs, setChatMsgs] = useState([]);
  const [avatarResponse, setAvatarResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [mute, setMute] = useState(false);
  const [audio, setAudio] = useState();
  const onMessagePlayed = () => {
    setAvatarResponse();
  };

  return (
    <ChatContext.Provider
      value={{
        chatMsgs,
        setChatMsgs,
        avatarResponse,
        setAvatarResponse,
        onMessagePlayed,
        loading,
        setLoading,
        cameraZoomed,
        setCameraZoomed,
        audio,
        setAudio,
        backendUrl,
        mute,
        setMute,
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
