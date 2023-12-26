import {useState} from "react";
import {AvatarPickerItem} from "./AvatarPickerItem.jsx";
import {FaArrowRight} from "react-icons/fa";
import {useAvatar} from "../hooks/useAvatar.jsx";

export const AvatarPickerPage = () => {
  const {
    avatars,
    selectedAvatar,
    setSelectedAvatar,
  } = useAvatar()

  const [tempSelectedAvatar, setTempSelectedAvatar] = useState()

  if(selectedAvatar)
    return <></>

  return (
    <div className="h-screen overflow-y-scroll flex flex-col justify-start items-center">
      <div className="text-blue-800 font-extrabold text-2xl border-yellow-300 border-2 bg-amber-100 rounded-xl p-2 m-1">Pick your new friend</div>
      <button
        className={`md:fixed top-1 right-1 text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1 ${tempSelectedAvatar ? 'block' : 'hidden'}`}
        onClick={()=>setSelectedAvatar(tempSelectedAvatar)}
      >
        <div className="flex flex-row items-center">Done <FaArrowRight/></div>
      </button>
      <div className="flex flex-row flex-wrap justify-center items-start">
        {avatars.map(avatar =>
          <AvatarPickerItem
            avatar={avatar}
            onClick={()=>setTempSelectedAvatar(avatar)}
            selected={tempSelectedAvatar && tempSelectedAvatar.id===avatar.id}
            key={avatar.id}
          />
        )}
      </div>
    </div>
  );

};
