import {useChat} from "../hooks/useChat.jsx";

export const CreateNewConvoPage = () => {
  const {
    companyId,
    company,
    companyLoadError,
    createNewConvo,
  } = useChat();

  return (
    <div className="flex h-screen w-full flex-col justify-center items-center">
      {companyLoadError && (
        <h1>Error loading companyId <em>{companyId}</em></h1>
      )}
      {!companyLoadError && (
        <>
          <h1>Welcome to {company && company.name}</h1>
          <button
            className='text-amber-100 font-extrabold text-2xl border-yellow-300 border-2 bg-blue-500 rounded-xl p-2 m-1'
            onClick={createNewConvo}
          >
            Start chatting
          </button>
        </>
      )}
    </div>

  );

};
