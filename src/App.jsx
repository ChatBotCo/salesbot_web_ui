import {Loader} from "@react-three/drei";
import {useEffect, useState} from "react";
import {useChat} from "./hooks/useChat.jsx";
import {ChatPage} from "./pages/ChatPage.jsx";
import {CreateNewConvoPage} from "./pages/CreateNewConvoPage.jsx";
import { FaCog } from 'react-icons/fa';

let initialized = false
function App() {

  const {
    companyId,
    conversation,
    companyLoadError,
    loading,
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

  const [debugging, _] = useState(
    localStorage.getItem('debugging')
  )

  return (
    <>
      <Loader />
      {showCompanyIdError && (
        <div className="flex h-screen w-full flex-col justify-center items-center">
          <h1>Missing parameter: <em>company_id</em></h1>
        </div>
      )}
      {companyLoadError && (
        <div className="flex h-screen w-full flex-col justify-center items-center">
          <h1>Error loading companyId <em>{companyId}</em></h1>
        </div>
      )}
      {conversation ? <ChatPage /> : <CreateNewConvoPage/>}
      {
        debugging && <div className='fixed bottom-1 left-1 z-10 text-gray-500 bg-opacity-80 bg-white p-1 rounded'>
          convo: {conversation || '[not set]'}
        </div>
      }
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-99">
          <FaCog className="animate-spin" style={{ fontSize: '24px' }} />
        </div>
      )}
    </>
  );
}

export default App;
