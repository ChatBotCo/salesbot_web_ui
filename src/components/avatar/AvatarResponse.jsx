import {useChat} from "../../hooks/useChat.jsx";
import {useCompany} from "../../hooks/useCompany.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const AvatarResponse = ({onClick}) => {
  const {
    lastAvatarResponseText,
    redirectUrl,
  } = useChat();

  const {
    colorText,
  } = useStyle();

  const {
    company,
  } = useCompany();

  const ensureHttpsUrl = url => {
    const httpsRegex = /^https:\/\//;
    if (httpsRegex.test(url)) {
      return url;
    } else {
      // If the URL doesn't start with "https://", prepend it
      return "https://" + url;
    }
  }

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
        {redirectUrl &&
          <a
             href={ensureHttpsUrl(redirectUrl)}
             style={{color:'blue', textDecoration:'underline'}}>Click HERE</a>
        }
      </div>
    );
  } else return <span></span>

};
