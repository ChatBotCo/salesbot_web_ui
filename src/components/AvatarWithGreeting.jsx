import {useChat} from "../hooks/useChat.jsx";
import {FaTimes} from "react-icons/fa";
import {useStyle} from "../hooks/useStyle.jsx";
import {useChatbot} from "../hooks/useChatbot.jsx";

export const AvatarWithGreeting = () => {
  const {
    viewModes, setViewMode,
  } = useChat()

  const {
    colorBgEm,
    colorTextEm,
    colorText,
    colorBorder,
  } = useStyle()

  const {
    avatarView,
    chatbotGreeting,
  } = useChatbot()

  const onClickAvatar = () => {
    setViewMode(viewModes.chat)
  }

  return (
    <div className={`
      flex flex-row justify-end
      fixed bottom-5 right-0 md:right-5
      md:w-96
      ml-1 mr-1
      z-[999999]
      sm:max-h-[calc(100vh-104px)]
      md:shadow-[0_20px_30px_rgba(23,73,77,0.15)]
      pointer-events-auto
      fade-in-out
      rounded-lg border ${colorBorder}
      cursor-pointer
      bg-white
    `}
         onClick={onClickAvatar}
    >
      <img src={'https://greeterbot.blob.core.windows.net/greeterbot-public/greeter-bot-logo.png'}
           className={`
               w-12 h-12 
               mt-0 ml-2 mb-1 mt-1
               pt-1
             `}
      />
      <div className={`
          w-full h-full max-h-56 
          italic ${colorText} 
          overflow-y-auto
          translate-y
          bg-white p-1 mb-1
        `}
      >
        {chatbotGreeting}
      </div>

      <div className={`
        ${colorBgEm} ${colorTextEm} 
        rounded-tr-md
        rounded-br-md 
        w-10
        text-xs 
        flex items-center justify-center 
        cursor-pointer
      `}
           onClick={e=>{
             e.stopPropagation()
             setViewMode(viewModes.collapsed)
           }}
      >
        <FaTimes />
      </div>

    </div>
  );

};
