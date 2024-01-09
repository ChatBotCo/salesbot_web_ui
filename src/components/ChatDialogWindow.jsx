import {ChatPage} from "../pages/ChatPage.jsx";
import {CreateNewConvoPage} from "../pages/CreateNewConvoPage.jsx";
import {useEffect, useState} from "react";
import {useChat} from "../hooks/useChat.jsx";
import {FaCog} from "react-icons/fa";

let initialized = false
export const ChatDialogWindow = () => {
  const {
    companyId,
    conversation,
    companyLoadError,
    loading,
    showChat,
  } = useChat();

  const [showCompanyIdError, setShowCompanyIdError] = useState(false);

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(!companyId) {
        setShowCompanyIdError(true)
      }
    }
  }, []);

  if(!showChat) return <></>

  return (
    <div className='
      flex flex-col justify-end
      fixed
      shadow-[0_20px_30px_rgba(23,73,77,0.15)]
      z-[999999]
      rounded-[10px]
      origin-center-bottom
      border-0
      h-[700px]
      max-h-[calc(100vh-104px)]
      inset-auto right-5 bottom-5
      pointer-events-auto'>
      {showCompanyIdError && (
        <div className="flex h-screen w-full flex-col justify-center items-center">
          <h1>Missing parameter: <em>company_id</em></h1>
        </div>
      )
      }
      {companyLoadError && (
        <div className="flex h-screen w-full flex-col justify-center items-center">
          <h1>Error loading companyId <em>{companyId}</em></h1>
        </div>
      )}
      {loading && (
        <div className="flex h-screen w-full flex-col justify-center items-center bg-white bg-opacity-50 z-99">
          <FaCog className="animate-spin" style={{ fontSize: '24px' }} />
        </div>
      )}

      {conversation ? <ChatPage /> : <CreateNewConvoPage/>}
    </div>
  );

};
