import {Loader} from "@react-three/drei";
import {AvatarPickerPage} from "./components/AvatarPickerPage.jsx";
import {AvatarChatPage} from "./components/AvatarChatPage.jsx";
import {useEffect, useState} from "react";
import {useChat} from "./hooks/useChat.jsx";
import {UserDataEntryFormPage} from "./components/UserDataEntryFormPage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";

let initialized = false
function App() {

  const {
    conversationId,
  } = useChat();

  const navigate = useNavigate();

  const [debugging, _] = useState(
    localStorage.getItem('debugging')
  )

  useEffect(() => {
    if (
      !initialized &&
      localStorage.getItem('selectedAvatar') &&
      localStorage.getItem('conversationId')
    ) {
      initialized = true
      navigate('/chat');
    } else initialized = true
  }, []);

  return (
    <>
      <Loader />
      <Routes>
        <Route path="/" element={<AvatarPickerPage />} />
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
