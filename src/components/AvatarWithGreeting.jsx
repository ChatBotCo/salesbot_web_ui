import {AvatarWindow} from "./avatar/AvatarWindow.jsx";
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
      fixed bottom-0 right-0
      z-[999999]
      sm:max-h-[calc(100vh-104px)]
      pointer-events-auto
      w-96
      fade-in-out
    `}>

      {chatbotGreeting && (
        <div className={`
          w-60 md:w-full max-w-lg h-full max-h-56 
          italic ${colorText} 
          overflow-y-auto
          translate-y
          bg-white p-2 mb-1
          rounded-lg border-gray-300 border 
          ${avatarView === 'avatar' && 'transform translate-x-16'}
        `}
             onClick={onClickAvatar}
        >
          {chatbotGreeting}
          <div className={`
            ${colorTextEm}
            ${colorBorder} border-2 
            ${colorBgEm} 
            rounded-lg p-1
            text-center
            cursor-pointer
          `}>
            Click here
          </div>
        </div>
      )}

      {avatarView === 'avatar' && <AvatarWindow showMuteBtn={false} onClick={onClickAvatar}/>}
      {avatarView === 'headshot' &&
        <img src={'https://kelichatbot2.blob.core.windows.net/salesbot-assets/headshot-keli.png'}
             onClick={onClickAvatar}
             className={'w-24 h-24 rounded-lg mt-0 ml-2 mb-1'}
        />
      }

      <div className={`
        ${colorBgEm} ${colorTextEm} 
        rounded-3xl 
        w-10 h-6 
        text-xs 
        flex items-center justify-center 
        cursor-pointer
        ${avatarView === 'avatar' ? 'transform -translate-x-6' : 'transform -translate-x-2 -translate-y-4'}
        z-10
      `}
           onClick={()=>setViewMode(viewModes.collapsed)}
      >
        <FaTimes />
      </div>

    </div>
  );

};
