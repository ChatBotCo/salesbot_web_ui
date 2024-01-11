import {ChatPage} from "./ChatPage.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {useStyle} from "../hooks/useStyle.jsx";

export const ChatDialogWindow = () => {
  const {
    conversation,
  } = useChat();

  const {
    colorBorder,
  } = useStyle();

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
      {
          conversation && <ChatPage />
      }
    </div>
  );

};
