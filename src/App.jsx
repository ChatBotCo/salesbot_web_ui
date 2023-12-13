import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import {FakeWebPage} from "./components/FakeWebPage.jsx";
import {ChatWindow} from "./components/ChatWindow.jsx";
import {useState} from "react";

function App() {

  const [showChatWindow, setShowChatwindow] = useState(true)

  const handleClickCloseChatWindow = () => {
    setShowChatwindow(false)
  }


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
        {showChatWindow && <ChatWindow handleClickCloseChatWindow={handleClickCloseChatWindow} />}
        <Canvas
          shadows
          camera={{ position: [0, 0, 1], fov: 30 }}
          style={{
            position: 'relative',
            right: '-100px'
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  );
}

export default App;
