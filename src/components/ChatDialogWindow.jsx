import {useEffect, useState} from "react";
import {ChatPage} from "./chat/ChatPage.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {useStyle} from "../hooks/useStyle.jsx";
import {FaCog} from "react-icons/fa";

let initialized = false
export const ChatDialogWindow = () => {
  const {
    conversation,
    createNewConvo,
  } = useChat();

  const {
    colorBorder,
  } = useStyle();

  const [isCreatingConvo, setIsCreatingConvo] = useState(false);

  useEffect(() => {
    if(!initialized && !conversation) {
      initialized = true
      setIsCreatingConvo(true)
      createNewConvo().then(() => {
        setIsCreatingConvo(false);
      });
    }
  }, []);

  return (
    <div className={`
      flex flex-col justify-end
      fixed
      shadow-[0_20px_30px_rgba(23,73,77,0.15)]
      z-[999999]
      sm:rounded-[10px]
      origin-center-bottom
      sm:max-h-[calc(100vh-104px)]
      inset-0 sm:inset-auto sm:right-5 sm:bottom-5
      pointer-events-auto
      border ${colorBorder}
      w-full h-full sm:w-auto sm:h-auto
      bg-white
      slide-up-animation fade-in-out
    `}>
      {isCreatingConvo ? (
        <div className="flex justify-center items-center h-full">
          <FaCog className='h-full animate-spin'/>
        </div>
      ) : (
        conversation && <ChatPage />
      )}
    </div>
  );

};
