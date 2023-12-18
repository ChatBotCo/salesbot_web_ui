import {useChat} from "../hooks/useChat.jsx";
import {MuteBtn} from "./MuteBtn.jsx";

export const AvatarResponse = () => {
  const {
    lastAvatarResponseText,
  } = useChat();

  return (
    <>
      <div className="flex-grow flex flex-row justify-start">
        <div className="flex-shrink-0 h-full flex flex-col justify-end">
          <img src='/chat_triangle_horizontal.png' className="opacity-80 mb-10" style={{width:'30px'}}/>
        </div>
        <div className="flex-grow flex flex-col justify-start items-start md:text-xl overflow-y-auto bg-white rounded-2xl bg-opacity-80 p-1 md:p-3 m-1 md:m-3 md:ml-0">
          <div className="flex-grow">{lastAvatarResponseText}</div>
          <MuteBtn />
        </div>
      </div>
    </>
  );

};
