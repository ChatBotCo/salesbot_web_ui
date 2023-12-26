import {useState} from "react";

export const AvatarPickerItem = ({avatar, onClick, selected}) => {
  return (
    <div
      className='shrink-0 flex flex-col justify-center items-center cursor-pointer hover:bg-amber-100 rounded-2xl'
      onClick={()=>onClick(avatar)}
    >
      <img
        className={`max-w-[40vw] md:max-w-[15vw] rounded-2xl m-1 pointer-events-none ${selected ? 'border-8 border-yellow-300 shadow-lg shadow-yellow-600' : 'border-4 border-blue-400'}`}
        src={`img/${avatar.id}.png`}
        alt={avatar.id}
      />
      <div className={`font-bold ${selected ? 'text-yellow-800' : 'text-blue-800'}`}>
        {avatar.name}
      </div>
    </div>
  );

};
