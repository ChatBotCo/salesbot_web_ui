import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import {FakeWebPage} from "./components/FakeWebPage.jsx";
import {ChatWindow} from "./components/ChatWindow.jsx";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI hidden/>
      <FakeWebPage />
      <div
        className="max-w-full md:max-w-xs flex flex-col items-end"
        style={{
          position: 'fixed',
          right: '10px',
          bottom: '0px',
        }}
      >
        <ChatWindow />
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
