import {FaComments} from 'react-icons/fa';
import {useChat} from "../hooks/useChat.jsx";
import {useStyle} from "../hooks/useStyle.jsx";

export const RootChatButton = () => {
  const {
    viewModes, setViewMode,
  } = useChat();

  const {
    colorBgEm,
    colorTextEm,
  } = useStyle()

  return (
    <button
      onClick={()=>setViewMode(viewModes.chat)}
      className={`
        fixed bottom-1 right-1 
        ${colorTextEm} ${colorBgEm} 
        border border-white rounded p-2 ml-2 w-12 h-12 
        cursor-pointer pointer-events-auto
      `}
    >
      <FaComments className='w-full h-full'/>
    </button>
  );

};
