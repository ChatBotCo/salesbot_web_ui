import {FaComments} from 'react-icons/fa';
import {useChat} from "../hooks/useChat.jsx";

export const RootChatButton = () => {
  const {
    showChat,
    setShowChat,
  } = useChat();

  console.log(showChat)
  if(showChat) return <></>

  return (
    <button
      onClick={()=>setShowChat(true)}
      className='fixed bottom-1 right-1 text-white bg-blue-500 rounded p-2 ml-2 w-12 h-12 cursor-pointer'
    >
      <FaComments className='w-full h-full'/>
    </button>
  );

};
