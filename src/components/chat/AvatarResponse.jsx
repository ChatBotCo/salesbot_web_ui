import {useChat} from "../../hooks/useChat.jsx";

export const AvatarResponse = () => {
  const {
    company,
    lastAvatarResponseText,
  } = useChat();

  if(company && lastAvatarResponseText) {
    return (
      <div className='w-full max-w-lg max-h-56 p-4 md:pl-0 md:pr-0 italic text-blue-500 overflow-y-scroll'>
        {lastAvatarResponseText}
      </div>
    );
  } else return <span></span>

};
