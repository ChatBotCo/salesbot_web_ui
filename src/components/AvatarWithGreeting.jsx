import {AvatarWindow} from "./avatar/AvatarWindow.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {FaTimes} from "react-icons/fa";
import {useStyle} from "../hooks/useStyle.jsx";
import {useCompany} from "../hooks/useCompany.jsx";

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
    company,
  } = useCompany()

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
    `}>

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
           onClick={()=>setViewMode(viewModes.collapsed)}
      >
        <FaTimes />
      </div>

      {company && (
        <div className={`
          w-full max-w-lg h-full max-h-56 
          italic ${colorText} 
          overflow-y-auto
          bg-white p-2 rounded-lg border-gray-300 transform translate-x-16
        `}
             onClick={onClickAvatar}
        >
          {company.greeting}
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

      <AvatarWindow showMuteBtn={false} onClick={onClickAvatar}/>

    </div>
  );

};
