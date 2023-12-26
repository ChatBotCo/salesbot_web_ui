import {useState} from "react";
import {AvatarPickerItem} from "./AvatarPickerItem.jsx";
import {FaArrowRight} from "react-icons/fa";
import {useAvatar} from "../hooks/useAvatar.jsx";

export const AvatarPickerPage = () => {
  const {
    selectedAvatarId,
    setSelectedAvatarId,
  } = useAvatar()

  const [tempSelectedAvatar, setTempSelectedAvatar] = useState()

  const avatarIds = [
    'keli',
    'janice',
    'robyn',
    'raymond',
    'allen',
    'tonya',
    'david',
    'tina',
  ]

  if(selectedAvatarId)
    return <></>

  return (
    <div className="h-screen overflow-y-scroll flex flex-col justify-start items-center">
      <div className="text-blue-800 font-extrabold text-2xl border-yellow-300 border-2 bg-amber-100 rounded-xl p-2 m-1">Pick your new friend</div>
      <button
        className={`md:fixed top-1 right-1 text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1 ${tempSelectedAvatar ? 'block' : 'hidden'}`}
        onClick={()=>setSelectedAvatarId(tempSelectedAvatar)}
      >
        <div className="flex flex-row items-center">Done <FaArrowRight/></div>
      </button>
      <div className="flex flex-row flex-wrap justify-center items-start">
        {avatarIds.map(avatarId =>
          <AvatarPickerItem
            avatarId={avatarId}
            onClick={avatarId=>setTempSelectedAvatar(avatarId)}
            selected={tempSelectedAvatar===avatarId}
            key={avatarId}
          />
        )}
      </div>
    </div>
  );

};
