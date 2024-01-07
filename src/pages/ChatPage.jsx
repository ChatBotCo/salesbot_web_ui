import {AvatarWindow} from "../components/avatar/AvatarWindow.jsx";
import {ChatWindow} from "../components/ChatWindow.jsx";
import {ToggleAvatarVisibility} from "../components/avatar/ToggleAvatarVisibility.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";

export const ChatPage = () => {
  const {
    showAvatar,
  } = useAvatar()

  return (
    <div className="flex h-full w-full flex-row justify-between items-center">
      {showAvatar && <AvatarWindow/>}
      <ChatWindow />
      <ToggleAvatarVisibility/>
    </div>
  );

};
