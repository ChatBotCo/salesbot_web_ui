import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {ChatWindow} from "./components/ChatWindow.jsx";
import {AvatarResponse} from "./components/AvatarResponse.jsx";
import {useEffect, useState} from "react";
import {FaCog} from "react-icons/fa";
import {ConfigMenu} from "./components/ConfigMenu.jsx";
import {useChat} from "./hooks/useChat.jsx";

let initialized = false
function App() {
  const [showConfigMenu, setShowConfigMenu] = useState(false)

  const {
    backendUrl,
    conversationId,
    setConversationId,
  } = useChat();

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(!conversationId) {
        let _conversationId = localStorage.getItem('conversationId')
        if (_conversationId) {
          console.log(`Found _conversationId:${_conversationId}`)
          setConversationId(_conversationId)
          localStorage.setItem('conversationId', _conversationId)
        } else {
          // _conversationId = generateUUID()
          // console.log(`Creating a new _conversationId:${_conversationId}`)
          fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(r1 => r1.json())
            .then(r2 => {
              _conversationId = r2.id
              setConversationId(_conversationId)
              localStorage.setItem('conversationId', _conversationId)
            })
        }
      }
    }
  }, []);

  // if(conversationId) {
  //   console.log(`App setting conversationId:${conversationId}`)
  // }

  return (
    <>
      <Loader />
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
    </>
  );
}

export default App;
