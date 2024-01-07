import {useAvatar} from "../../hooks/useAvatar.jsx";

export const ToggleAvatarVisibility = () => {
  const {
    showAvatar,
    setShowAvatar,
  } = useAvatar()

  return (
    <div className='
        flex flex-row items-center justify-center
        bg-red-500 rounded-xl p-1
      '>
      <span className='text-white font-bold mr-2'>Avatar:</span>
      <button
        className={`
          text-amber-100 font-extrabold border-yellow-300 border-2 rounded-xl p-2 mx-1
          ${showAvatar ? 'text-amber-100 bg-blue-500': 'text-blue-500 bg-white'}
          `}
        onClick={() => setShowAvatar(true)}
      >
        Show
      </button>
      <button
        className={`
          font-extrabold border-yellow-300 border-2 rounded-xl p-2 mx-1
          ${!showAvatar ? 'text-amber-100 bg-blue-500': 'text-blue-500 bg-white'}
          `}
        onClick={() => setShowAvatar(false)}
      >
        Hide
      </button>
    </div>
  );

};
