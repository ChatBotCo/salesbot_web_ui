import {useChat} from "../hooks/useChat.jsx";
import {FaArrowDown} from "react-icons/fa";
import {useCompany} from "../hooks/useCompany.jsx";
import {useStyle} from "../hooks/useStyle.jsx";

export const HeaderBar = () => {
  const {
    setShowChat,
  } = useChat();

  const {
    colorBgEm,
    colorTextEm,
  } = useStyle();

  const {
    company,
  } = useCompany();

  return (
    <div className={`
      flex flex-row justify-between items-center w-full
      ${colorBgEm} ${colorTextEm} 
      md:rounded-t-[8px] p-4
    `}>
      <h1>Welcome to <span className='font-extrabold text-xl'>{company?.name}</span></h1>
      <button onClick={() => setShowChat(false)} className={`${colorTextEm} ${colorBgEm} rounded w-4 cursor-pointer`}>
        <FaArrowDown className='w-full h-full'/>
      </button>
    </div>
  );

};
