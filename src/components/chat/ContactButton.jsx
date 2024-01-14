import {useStyle} from "../../hooks/useStyle.jsx";
import {useChatbot} from "../../hooks/useChatbot.jsx";

export const ContactButton = ({label}) => {
  const {
    contactLink,
  } = useChatbot();

  const {
    colorBgEm,
    colorTextEm,
    colorBorder,
  } = useStyle();

  return (
    <div className={`
      ${colorTextEm} font-extrabold 
      ${colorBorder} border-2 ${colorBgEm} rounded-xl 
      p-2 ml-10 mr-10 mb-1
      text-center
    `}>
      <a target='_blank' href={contactLink}><h1 className={`${colorTextEm}`}>{label}</h1></a>
    </div>
  )

};
