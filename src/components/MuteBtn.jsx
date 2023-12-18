import {FaVolumeMute, FaVolumeUp} from "react-icons/fa";
import {useChat} from "../hooks/useChat.jsx";

export const MuteBtn = () => {

  const {
    mute,
    setMute,
  } = useChat();

  const muteBtnColor = mute? 'text-red-400' : 'text-blue-500'
  const padding = mute ? 'p-1' : 'p-2'

  return (
    <button
      className={`flex-shrink-0 flex flex-row items-center ${padding} bg-blend-luminosity bg-opacity-80 ${muteBtnColor} pointer-events-auto`}
      onClick={()=>setMute(!mute)}
    >
      {mute && <span className="pr-3">Muted</span>}
      {mute ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  )
};
