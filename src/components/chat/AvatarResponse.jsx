import {useChat} from "../../hooks/useChat.jsx";
import {useCompany} from "../../hooks/useCompany.jsx";

export const AvatarResponse = () => {
  const {
    lastAvatarResponseText,
  } = useChat();

  const {
    company,
  } = useCompany();

  if(company && lastAvatarResponseText) {
    return (
      <div className='w-full max-w-lg h-full max-h-56 p-4 md:pl-0 md:pr-0 italic text-blue-500 overflow-y-scroll'>
        From <span className='font-semibold ml-1'>{company.name}</span>:<br/>
        {lastAvatarResponseText}
      </div>
    );
  } else return <span></span>

};
