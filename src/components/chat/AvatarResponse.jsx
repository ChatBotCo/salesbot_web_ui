import {useChat} from "../../hooks/useChat.jsx";
import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const AvatarResponse = ({showSpeechBubble, onClick}) => {
  const {
    lastAvatarResponseText,
  } = useChat();

  const {
    colorText,
  } = useStyle();

  const {
    company,
  } = useCompany();

  const speechBubbleFormatting = showSpeechBubble ?
    'bg-white p-2 rounded-lg border-gray-300 transform translate-x-16' :
    'p-4 md:pl-0 md:pr-0'
  if(company && lastAvatarResponseText) {
    return (
      <div className={`
        w-full max-w-lg h-full max-h-56 
        italic ${colorText} 
        overflow-y-auto
        ${speechBubbleFormatting}
      `}
           onClick={()=>{onClick && onClick()}}
      >
        {lastAvatarResponseText}
      </div>
    );
  } else return <span></span>

};
