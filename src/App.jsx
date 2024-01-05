import {Loader} from "@react-three/drei";
import {useState} from "react";
import {useChat} from "./hooks/useChat.jsx";
import {ChatPage} from "./pages/ChatPage.jsx";
import {CreateNewConvoPage} from "./pages/CreateNewConvoPage.jsx";

function App() {

  const {
    conversationId,
  } = useChat();

  const [debugging, _] = useState(
    localStorage.getItem('debugging')
  )

  return (
    <>
      <Loader />
      {conversationId ? <ChatPage /> : <CreateNewConvoPage/>}
      {
        debugging && <div className='fixed bottom-1 left-1 z-10 text-gray-500 bg-opacity-80 bg-white p-1 rounded'>
          convo: {conversationId || '[not set]'}
        </div>
      }
    </>
  );
}

export default App;
