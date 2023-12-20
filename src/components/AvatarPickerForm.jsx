import {useState} from "react";
import {AvatarPickerItem} from "./AvatarPickerItem.jsx";

export const AvatarPickerForm = () => {

  const [selectedAvatar, setSelectedAvatar] = useState()

  const avatarIds = [
    'keli', 'allen', 'david', 'janice', 'raymond', 'robyn', 'tonya', 'tina'
  ]

  return (
    <div className="flex flex-row flex-wrap overflow-y-scroll justify-center items-start">
      {avatarIds.map(avatarId =>
        <AvatarPickerItem
          avatarId={avatarId}
          onClick={avatarId=>setSelectedAvatar(avatarId)}
          selected={selectedAvatar===avatarId}
        />
      )}
    </div>
  );

};
