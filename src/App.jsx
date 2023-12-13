import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import {FakeWebPage} from "./components/FakeWebPage.jsx";
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
      <Leva hidden />
      <FakeWebPage />
      <div
        className="max-w-full md:max-w-xs flex flex-col items-end"
        style={{
          position: 'fixed',
          right: '10px',
          bottom: '0px',
        }}
      >
        <ChatWindow handleClickCloseChatWindow={handleClickCloseChatWindow} showChatWindow={showChatWindow} />
        <Canvas
          shadows
          camera={{ position: [0, 0, 1], fov: 30 }}
          style={{
            position: 'relative',
            right: '-100px'
          }}
          onClick={handleClickShowChatWindow}
        >
          <Experience />
        </Canvas>
      </div>

      {showChatWindow && (
        <div className={`fixed right-1 bottom-1 text-2xl bg-blue-100 rounded p-1 bg-blend-luminosity bg-opacity-80 ${muteBtnColor}`}>
          {mute ? <FaVolumeMute onClick={handleToggleMute} /> : <FaVolumeUp onClick={handleToggleMute} />}

        </div>
      )}
    </>
  );
}

export default App;
