import {useStyle} from "../../hooks/useStyle.jsx";
import {useChat} from "../../hooks/useChat.jsx";

export const RedirectPromptButton = () => {
  const {
    redirectUrl,
  } = useChat();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  console.log(redirectUrl)

  if(!redirectUrl) return <></>

  return (
    <a href={redirectUrl}><h1 className={`${colorTextEm}`}>Redirect URL</h1></a>
  )
};
