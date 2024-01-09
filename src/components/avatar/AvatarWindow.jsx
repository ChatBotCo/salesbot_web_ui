import {Canvas} from "@react-three/fiber";
import {Experience} from "./Experience.jsx";

export const AvatarWindow = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 1], fov: 30 }}
      onClick={()=>console.log('clicked the avatar')}
      className='w-44'
    >
      <Experience />
    </Canvas>
  );

};
