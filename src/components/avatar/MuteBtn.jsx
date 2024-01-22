import {FaVolumeMute, FaVolumeUp} from "react-icons/fa";
import {useChat} from "../../hooks/useChat.jsx";
import {useAvatar} from "../../hooks/useAvatar.jsx";
import {useStyle} from "../../hooks/useStyle.jsx";
import {useChatbot} from "../../hooks/useChatbot.jsx";

export const MuteBtn = () => {

  const {
    mute,
    setMute,
    audio,
    onMessagePlayed,
  } = useChat();

  const {
    avatarView,
  } = useChatbot()

  const {
    colorText,
  } = useStyle()

  const muteBtnColor = mute? 'text-red-400' : `${colorText}`

  const onClickMute = ()=>{
    if (audio && !audio.paused) {
      audio.pause()
      onMessagePlayed()
    }
    setMute(!mute)
  }

  if(avatarView !== 'avatar') return <></>

  return (
    <div className={`
        flex flex-row items-center justify-center
        rounded-xl mr-3
        ${mute ? 'border-2 border-red-400 ml-0 mt-0' : 'ml-0.5 mt-0.5'}
        bg-white
      `}>
      <button
        className={`flex-shrink-0 flex flex-row items-center p-2 bg-blend-luminosity bg-opacity-80 ${muteBtnColor} pointer-events-auto`}
        onClick={onClickMute}
      >
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  )
};
