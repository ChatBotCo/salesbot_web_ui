import { createContext, useContext, useState } from "react";

let backendUrl = "https://keli-chatbot-003.azurewebsites.net";
// let backendUrl = "http://localhost:7071";
if(localStorage.getItem('local_backend')) {
  backendUrl = "http://localhost:7071"
}

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [avatarResponse, setAvatarResponse] = useState();
  const [lastAvatarResponseText, setLastAvatarResponseText] = useState()
  // const [lastAvatarResponseText, setLastAvatarResponseText] = useState('Of course, Shawn! Once upon a time, in a land far, far away, there was a small village called Keli. The people of Keli were known for their creativity and innovation. They were always looking for new ways to improve their lives and make the world a better place. One day, a young inventor named Alex came to the village. Alex had a brilliant idea for a new kind of technology that could change the way people interacted with machines. The people of Keli were intrigued and excited by Alex\'s idea. With the support and encouragement of the village, Alex started working on turning the idea into reality. Day and night, Alex toiled away, building and refining the technology. It wasn\'t easy, but Alex never gave up. After months of hard work, Alex finally created the first prototype of the technology. It was a chatbot that could understand and respond to human conversations in a natural and intelligent way. The people of Keli were amazed by the chatbot\'s capabilities and saw its potential to revolutionize the way businesses interacted with their customers. Word of the incredible chatbot spread, and soon businesses from all over the world were coming to Keli to get their own custom chatbot solutions. Keli became known as the hub of chatbot innovation, and Alex\'s invention became the foundation of a successful tech startup called Keli.AI. And that, Shawn, is the story of how Keli.AI and its amazing chatbot solutions came to be. We\'re here to help businesses like yours enhance their sales strategies and provide exceptional customer experiences. Is there anything specific you\'d like to know about our chatbot services?')
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [mute, setMute] = useState(false);
  const [audio, setAudio] = useState();
  const [conversationId, setConversationId] = useState()

  const onMessagePlayed = () => {
    setAvatarResponse();
  };

  return (
    <ChatContext.Provider
      value={{
        avatarResponse,
        setAvatarResponse,
        lastAvatarResponseText,
        setLastAvatarResponseText,
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
        conversationId,
        setConversationId,
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
