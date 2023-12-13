import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://localhost:3000";
// const backendUrl = "https://keli-bot-backend-325d5558f8b6.herokuapp.com";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [audio, setAudio] = useState();
  const onMessagePlayed = () => {
    setMessage();
  };

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        onMessagePlayed,
        loading,
        setLoading,
        cameraZoomed,
        setCameraZoomed,
        audio,
        setAudio,
        backendUrl,
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
