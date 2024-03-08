import {useChat} from "../hooks/useChat.jsx";

export const RootChatButton = () => {
  const {
    viewModes, setViewMode,
  } = useChat();

  return (
    <img src={'https://kelichatbot2.blob.core.windows.net/salesbot-assets/chat-bot-limited-white-bg.png'}
         onClick={()=>setViewMode(viewModes.chat)}
         className={`
            fixed bottom-0 right-0
            w-12 h-12
            mr-5 mb-5
            cursor-pointer pointer-events-auto
            z-[999999]
         `}
    />
  );

};
