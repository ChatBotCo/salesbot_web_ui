import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {ChatWindow} from "./components/ChatWindow.jsx";
import {useState} from "react";
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import {useChat} from "./hooks/useChat.jsx";

function App() {

  const {
    mute,
    setMute,
  } = useChat();
  const [showChatWindow, setShowChatwindow] = useState(true)

  const handleClickCloseChatWindow = () => {
    setShowChatwindow(false)
  }
  const handleClickShowChatWindow = () => {
    setShowChatwindow(true)
  }

  const handleToggleMute = () => {
    setMute(!mute)
  }

  const muteBtnColor = mute? 'text-red-400' : 'text-blue-500'

  return (
    <>
      <Loader />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full h-1/3 md:w-1/2 md:h-full border-b-8 border-blue-300 md:border-0">
          <Canvas
            shadows
            camera={{ position: [0, 0, 1], fov: 30 }}
            onClick={handleClickShowChatWindow}
          >
            <Experience />
          </Canvas>
        </div>
        <div className="w-full h-2/3 md:w-1/2 md:h-full md:p-4">
          <ChatWindow />
        </div>
      </div>
      <div className={`absolute right-1 bottom-1 text-2xl bg-blue-100 rounded p-1 bg-blend-luminosity bg-opacity-80 ${muteBtnColor}`}>
        {mute ? <FaVolumeMute onClick={handleToggleMute} /> : <FaVolumeUp onClick={handleToggleMute} />}
      </div>
    </>
  );
}

export default App;
