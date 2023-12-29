import {Loader} from "@react-three/drei";
import {AvatarPickerPage} from "./components/AvatarPickerPage.jsx";
import {AvatarChatPage} from "./components/AvatarChatPage.jsx";
import {useEffect, useState} from "react";
import {useChat} from "./hooks/useChat.jsx";
import {UserDataEntryFormPage} from "./components/UserDataEntryFormPage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import {useAvatar} from "./hooks/useAvatar.jsx";

let initialized = false
function App() {

  const {
    conversationId,
  } = useChat();

  const {
    resetConversation,
  } = useAvatar();

  const navigate = useNavigate();

  const [debugging, _] = useState(
    localStorage.getItem('debugging')
  )

  useEffect(() => {
    if(!initialized) {
      initialized = true
      const selectedAvatar = localStorage.getItem('selectedAvatar')
      const convoId = localStorage.getItem('conversationId')
      if (!selectedAvatar && !convoId) {
        navigate('/avatars')
      } else if (selectedAvatar && !convoId) {
        navigate('/intake')
      } else if (!selectedAvatar && convoId) {
        resetConversation()
        navigate('/avatars')
      } else {
        navigate('/chat')
      }
    }
  }, []);

  return (
    <>
      <Loader />
      <Routes>
        <Route path="/avatars" element={<AvatarPickerPage />} />
        <Route path="/intake" element={<UserDataEntryFormPage />} />
        <Route path="/chat" element={<AvatarChatPage />} />
      </Routes>
      {
        debugging && <div className='fixed bottom-1 left-1 z-10 text-gray-500 bg-opacity-80 bg-white p-1 rounded'>
          convo: {conversationId || '[not set]'}
        </div>
      }
    </>
  );
}

export default App;
