import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {ChatWindow} from "./components/ChatWindow.jsx";
import {AvatarResponse} from "./components/AvatarResponse.jsx";
import {AvatarPickerForm} from "./components/AvatarPickerForm.jsx";
import {useEffect, useState} from "react";

let initialized = false
function App() {
  const [conversationId, setConversationId] = useState()
  const [selectedAvatarId, setSelectedAvatarId] = useState()

  function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(!conversationId) {
        let _conversationId = localStorage.getItem('conversationId')
        if (_conversationId) {
          console.log(`Found _conversationId:${_conversationId}`)
        } else {
          _conversationId = generateUUID()
          console.log(`Creating a new _conversationId:${_conversationId}`)
        }
        setConversationId(_conversationId)
        localStorage.setItem('conversationId', _conversationId)
      }
      if(!selectedAvatarId) {
        setSelectedAvatarId(localStorage.getItem('selectedAvatarId'))
      }
    }
  }, []);

  if(conversationId) {
    console.log(`App setting conversationId:${conversationId}`)
  }

  const onSelectedAvatar = avatarId => {
    localStorage.setItem('selectedAvatarId', avatarId)
    setSelectedAvatarId(avatarId)
  }

  return (
    <>
      <Loader />
      {
        selectedAvatarId ? (
            <div className="flex h-screen flex-col md:flex-row">
              <div className="flex w-full h-1/3 md:w-1/2 md:h-full border-blue-300 md:border-0 md:hidden">
                <AvatarResponse orientation='vertical' />
              </div>
              <div className="w-full h-1/3 md:w-1/2 md:h-full border-b-2 border-blue-700 md:border-0">
                <Canvas
                  shadows
                  camera={{ position: [0, 0, 1], fov: 30 }}
                  onClick={()=>console.log('clicked the avatar')}
                >
                  <Experience />
                </Canvas>
              </div>
              <div className="w-full h-1/3 md:w-1/2 md:h-full">
                <ChatWindow />
              </div>
            </div>
          ) :
          (<AvatarPickerForm onSelectedAvatar={onSelectedAvatar} />)
      }
    </>
  );
}

export default App;
