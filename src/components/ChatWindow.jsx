import {AvatarWindow} from "./avatar/AvatarWindow.jsx";
import {ChatWindow} from "./chat/ChatWindow.jsx";
import {ToggleAvatarVisibility} from "./avatar/ToggleAvatarVisibility.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {MuteBtn} from "./avatar/MuteBtn.jsx";

export const ChatWindow = () => {
  const {
    showAvatar,
  } = useAvatar()

  return (
    <div className="flex h-full w-full flex-row justify-between items-center">
      {showAvatar && <AvatarWindow/>}
      <ChatWindow />
      <div className='
        fixed bottom-1 right-1
        flex flex-row
      '>
        <MuteBtn/>
        <ToggleAvatarVisibility/>
      </div>
    </div>
  );

};
