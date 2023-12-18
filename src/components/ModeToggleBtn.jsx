export const ModeToggleBtn = ({active, icon, text, onClick}) => {

  const formatting = active ? "text-white bg-blue-500 shadow-lg shadow-blue-700" : "text-blue-500 bg-white border-2 border-blue-500"
  return (
    <button
      onClick={onClick}
      className={`${formatting} rounded w-full flex flex-row justify-center items-center pt-2 pb-2 md:pt-4 md:pb-4 m-2 text-xl md:text-2xl`}
    >
      <span className="mr-2">{text}</span>
      {icon}
    </button>
  )
};
