import {Canvas} from "@react-three/fiber";
import {Experience} from "./Experience.jsx";
import {MuteBtn} from "./MuteBtn.jsx";

export const AvatarWindow = () => {
  return (
    <div className='relative w-44'>
      <Canvas
        shadows
        camera={{ position: [0, 0, 1], fov: 30 }}
        onClick={()=>console.log('clicked the avatar')}
        className='w-44'
      >
        <Experience />
      </Canvas>
      <div className="absolute bottom-0 right-0 p-2">
        <MuteBtn/>
      </div>
    </div>
  );

};
