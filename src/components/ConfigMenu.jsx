export const ConfigMenu = ({showMenu, onCreateNewAvatar, onDismiss}) => {

  if(showMenu) {
    return (
      <div
        className='fixed top-0 left-0 h-full w-full flex justify-center md:justify-start items-start bg-white bg-opacity-80 z-10 pt-8 pl-1 md:pl-8'
        onClick={onDismiss}
      >
        <div className='bg-amber-100 border-2 border-blue-500 rounded-2xl p-4'>
          <button
            className='text-blue-200 font-extrabold text-2xl border-yellow-300 border-2 bg-red-500 rounded-xl p-2 m-1'
            onClick={onCreateNewAvatar}
          >
            Create a new avatar
          </button>
        </div>
      </div>

    )
  } else {
    return <></>
  }
};
