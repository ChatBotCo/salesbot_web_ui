import {Loader} from "@react-three/drei";
import {AvatarPickerPage} from "./components/AvatarPickerPage.jsx";
import {AvatarChatPage} from "./components/AvatarChatPage.jsx";
import {useState} from "react";
import {useChat} from "./hooks/useChat.jsx";

function App() {

  const {
    conversationId,
  } = useChat();

  const [debugging, setDebugging] = useState(
    localStorage.getItem('debugging')
  )

  return (
    <>
      <Loader />
      <AvatarPickerPage/>
      <AvatarChatPage />
      {
        debugging && <div className='fixed bottom-1 left-1 z-10 text-red-100 bg-red-700'>
          convo: {conversationId || '[not set]'}
        </div>
      }
    </>
  );
}

export default App;
