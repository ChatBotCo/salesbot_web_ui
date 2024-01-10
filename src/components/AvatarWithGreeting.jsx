import {AvatarWindow} from "./avatar/AvatarWindow.jsx";
import {AvatarResponse} from "./chat/AvatarResponse.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {FaTimes} from "react-icons/fa";
import {useStyle} from "../hooks/useStyle.jsx";
import {useState} from "react";

export const AvatarWithGreeting = () => {
  const {
    setShowChat,
  } = useChat()

  const {
    colorBgEm,
    colorTextEm,
  } = useStyle()

  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  const onClickAvatar = () => {
    setShowChat(true)
  }

  return (
    <div className={`
      flex flex-row justify-end
      fixed bottom-0 right-0
      z-[999999]
      sm:max-h-[calc(100vh-104px)]
      pointer-events-auto
      w-96
    `}>
      {showSpeechBubble &&
        <div className={`
          ${colorBgEm} ${colorTextEm} 
          rounded-3xl 
          w-10 h-6 
          text-xs 
          flex items-center justify-center 
          cursor-pointer
          transform translate-x-16
          z-10
        `}
             onClick={()=>setShowSpeechBubble(false)}
        >
          <FaTimes />
        </div>
      }
      {showSpeechBubble && <AvatarResponse showSpeechBubble={true} onClick={onClickAvatar}/>}
      <AvatarWindow showMuteBtn={false} onClick={onClickAvatar}/>
    </div>
  );

};
