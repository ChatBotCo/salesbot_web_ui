import {FaComments} from 'react-icons/fa';
import {useChat} from "../hooks/useChat.jsx";
import {useStyle} from "../hooks/useStyle.jsx";

export const RootChatButton = () => {
  const {
    showChat,
    setShowChat,
  } = useChat();

  const {
    colorBgEm,
    colorTextEm,
  } = useStyle()

  if(showChat) return <></>

  return (
    <button
      onClick={()=>setShowChat(true)}
      className={`fixed bottom-1 right-1 ${colorTextEm} ${colorBgEm} border border-white rounded p-2 ml-2 w-12 h-12 cursor-pointer`}
    >
      <FaComments className='w-full h-full'/>
    </button>
  );

};
