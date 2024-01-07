import {AvatarWindow} from "../components/avatar/AvatarWindow.jsx";
import {ChatWindow} from "../components/ChatWindow.jsx";

export const ChatPage = () => {
  return (
    <div className="flex h-full w-full flex-row justify-between ">
      <AvatarWindow/>
      <ChatWindow />
    </div>
  );

};
