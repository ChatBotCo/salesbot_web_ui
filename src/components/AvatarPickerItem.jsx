import {useState} from "react";

export const AvatarPickerItem = ({avatarId, onClick, selected}) => {

  return (
    <img
      className={`shrink-0 max-w-[40vw] md:max-w-[30vw] rounded-2xl m-1 ${selected ? 'border-8 border-yellow-300 shadow-lg shadow-yellow-600' : 'border-4 border-blue-400'}`}
      src={`img/${avatarId}.png`}
      alt={avatarId}
      onClick={()=>onClick(avatarId)}
    />
  );

};
