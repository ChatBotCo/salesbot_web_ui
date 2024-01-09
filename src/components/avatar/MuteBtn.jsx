import {FaVolumeMute, FaVolumeUp} from "react-icons/fa";
import {useChat} from "../../hooks/useChat.jsx";
import {useAvatar} from "../../hooks/useAvatar.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";

export const MuteBtn = () => {

  const {
    mute,
    setMute,
  } = useChat();

  const {
    showAvatar,
  } = useAvatar()

  const {
    colorBg,
    colorBorder,
  } = useStyle()

  const muteBtnColor = mute? 'text-red-400' : `text-[${colorBg}]`
  const padding = mute ? 'p-1' : 'p-2'

  if(!showAvatar) return <></>

  console.log(colorBg)
  return (
    <div className={`
        flex flex-row items-center justify-center
        rounded-xl mr-3
        border-2 ${mute ? 'border-red-400' : `border-[${colorBg}]`}
        bg-white
      `}>
      <button
        className={`flex-shrink-0 flex flex-row items-center p-2 bg-blend-luminosity bg-opacity-80 ${muteBtnColor} pointer-events-auto`}
        onClick={()=>setMute(!mute)}
      >
        {/*<span className="pr-3">{mute ? 'Muted' : 'Unmuted'}</span>*/}
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  )
};
