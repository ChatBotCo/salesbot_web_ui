import {ChatPage} from "../pages/ChatPage.jsx";
import {CreateNewConvoPage} from "../pages/CreateNewConvoPage.jsx";
import {useChat} from "../hooks/useChat.jsx";

export const ChatDialogWindow = () => {
  const {
    conversation,
    showChat,
  } = useChat();

  if(!showChat) return <></>

  return (
    <div className='
      flex flex-col justify-end
      fixed
      shadow-[0_20px_30px_rgba(23,73,77,0.15)]
      z-[999999]
      rounded-[10px]
      origin-center-bottom
      max-h-[calc(100vh-104px)]
      inset-auto right-5 bottom-5
      pointer-events-auto
      border border-blue-500
      '>
      {
          conversation ? <ChatPage /> : <CreateNewConvoPage/>
      }
    </div>
  );

};
