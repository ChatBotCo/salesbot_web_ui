import {useChat} from "../../hooks/useChat.jsx";
import {FaEnvelope, FaTimes} from "react-icons/fa";
import {useStyle} from "../../hooks/useStyle.jsx";
import {useChatbot} from "../../hooks/useChatbot.jsx";

export const HeaderBar = () => {
  const {
      viewModes, setViewMode,
  } = useChat();

  const {
    colorBgEm,
    colorTextEm,
  } = useStyle();

  const {
    contactLink,
  } = useChatbot()

  return (
    <div className={`
      flex flex-row justify-between items-center w-full
      ${colorBgEm} ${colorTextEm} 
      md:rounded-t-[8px] 
      pl-4 pr-4 pt-3 pb-3
      font-extrabold
    `}>
      <a target='_blank' href={contactLink}
         style={{
           textDecoration:'underline',
           display: 'flex',
           flexDirection: 'row',
           alignItems: 'center',
      }}
      >
        <FaEnvelope className={'pr-1'} /> Contact Us
      </a>
      <button onClick={() => setViewMode(viewModes.greeting)} className={`${colorTextEm} ${colorBgEm} rounded w-4 cursor-pointer`}>
        <FaTimes className='w-full h-full'/>
      </button>
    </div>
  );

};
