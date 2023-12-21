import {useChat} from "../hooks/useChat.jsx";
import {MuteBtn} from "./MuteBtn.jsx";

export const AvatarResponse = ({extraClassNames='', orientation}) => {
  const {
    lastAvatarResponseText,
  } = useChat();

  if(orientation==='horizontal') {
    // horizontal - DESKTOP
    return (
      <>
        <div className={`h-1/2 flex flex-row justify-start ${extraClassNames}`}>
          <div className="flex-shrink-0 h-full flex flex-col justify-end">
            <img src='/chat_triangle_horizontal.png' className="opacity-80 mb-10" style={{width:'30px'}}/>
          </div>
          <div className="flex-grow flex flex-col justify-start items-start text-xl overflow-y-auto bg-white rounded-2xl bg-opacity-80 p-3 m-3 ml-0">
            <div className="flex-grow">{lastAvatarResponseText || `Hello!  It's nice to meet you!`}</div>
            <MuteBtn />
          </div>
        </div>
      </>
    );
  } else {
    // vertical - MOBILE
    return (
      <>
        <div className={`flex-grow flex flex-col justify-start ${extraClassNames}`}>
          <div className="flex-grow flex flex-col justify-start items-start overflow-y-auto bg-white rounded-2xl bg-opacity-80 p-1 m-1 mb-0">
            <div className="flex-grow">{lastAvatarResponseText || `Hello!  It's nice to meet you!`}</div>
            <MuteBtn />
          </div>
          <div className="flex-shrink-0 w-full flex flex-row justify-end">
            <img src='/chat_triangle_vertical.png' className="opacity-80 mr-10" style={{height:'30px'}}/>
          </div>
        </div>
      </>
    );
  }

};
