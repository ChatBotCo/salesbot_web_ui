import {useState} from "react";
import {FaCog} from "react-icons/fa";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {ConfigMenu} from "./ConfigMenu.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {Canvas} from "@react-three/fiber";
import {Experience} from "./Experience.jsx";
import {ChatWindow} from "./ChatWindow.jsx";

export const AvatarChatPage = () => {
  const {
    selectedAvatar,
  } = useAvatar()

  const [showConfigMenu, setShowConfigMenu] = useState(false)

  if(!selectedAvatar)
    return <></>

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <FaCog
        className='md:fixed top-1 left-1 hover:bg-blue-500 text-2xl z-10 rounded cursor-pointer'
        onClick={()=>setShowConfigMenu(!showConfigMenu)}
      />
      <ConfigMenu showMenu={showConfigMenu} onDismiss={()=>setShowConfigMenu(false)} />
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
        <ChatWindow selectedAvatar={selectedAvatar} />
      </div>
    </div>
  );

};
