import {useState} from "react";
import {AvatarPickerItem} from "./AvatarPickerItem.jsx";
import {FaArrowRight} from "react-icons/fa";

export const AvatarPickerForm = ({onSelectedAvatar}) => {

  const [selectedAvatar, setSelectedAvatar] = useState()

  const avatarIds = [
    'keli', 'allen', 'david', 'janice', 'raymond', 'robyn', 'tonya', 'tina'
  ]

  return (
    <div className="h-screen overflow-y-scroll flex flex-col justify-start items-center">
      <div className="text-blue-800 font-extrabold text-2xl border-yellow-300 border-2 bg-amber-100 rounded-xl p-2 m-1">Pick your new friend</div>
      <button
        className={`md:fixed top-1 right-1 text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1 ${selectedAvatar ? 'block' : 'hidden'}`}
        onClick={()=>onSelectedAvatar(selectedAvatar)}
      >
        <div className="flex flex-row items-center">Done <FaArrowRight/></div>
      </button>
      <div className="flex flex-row flex-wrap justify-center items-start">
        {avatarIds.map(avatarId =>
          <AvatarPickerItem
            avatarId={avatarId}
            onClick={avatarId=>setSelectedAvatar(avatarId)}
            selected={selectedAvatar===avatarId}
            key={avatarId}
          />
        )}
      </div>
    </div>
  );

};
