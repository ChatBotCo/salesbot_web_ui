import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {ChatWindow} from "./components/ChatWindow.jsx";

function App() {
  return (
    <>
      <Loader />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full h-1/3 md:w-1/2 md:h-full border-b-8 border-blue-300 md:border-0">
          <Canvas
            shadows
            camera={{ position: [0, 0, 1], fov: 30 }}
            onClick={()=>console.log('clicked the avatar')}
          >
            <Experience />
          </Canvas>
        </div>
        <div className="w-full h-2/3 md:w-1/2 md:h-full">
          <ChatWindow />
        </div>
      </div>
    </>
  );
}

export default App;
