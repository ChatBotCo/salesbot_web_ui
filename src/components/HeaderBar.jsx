import {useChat} from "../hooks/useChat.jsx";
import {FaArrowDown} from "react-icons/fa";
import {useCompany} from "../hooks/useCompany.jsx";

export const HeaderBar = () => {
  const {
    setShowChat,
  } = useChat();

  const {
    company,
  } = useCompany();

  return (
    <div className='
      flex flex-row justify-between items-center
      w-full bg-blue-500
      text-white md:rounded-t-[8px] p-4
    '>
      <h1>Welcome to <span className='font-extrabold text-xl'>{company && company.name}</span></h1>
      <button
        onClick={()=>setShowChat(false)}
        className='text-white bg-blue-500 rounded w-4 cursor-pointer'
      >
        <FaArrowDown className='w-full h-full'/>
      </button>
    </div>
  );

};
