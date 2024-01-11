import {useChat} from "../../hooks/useChat.jsx";
import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const AvatarResponse = ({onClick}) => {
  const {
    lastAvatarResponseText,
  } = useChat();

  const {
    colorText,
  } = useStyle();

  const {
    company,
  } = useCompany();

  if(company && lastAvatarResponseText) {
    return (
      <div className={`
        w-full max-w-lg h-full max-h-56 
        italic ${colorText} 
        overflow-y-auto
        p-4 md:pl-0 md:pr-0
        pb-7
      `}
           onClick={()=>{onClick && onClick()}}
      >
        {lastAvatarResponseText}
      </div>
    );
  } else return <span></span>

};
