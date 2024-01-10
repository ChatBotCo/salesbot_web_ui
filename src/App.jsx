import {RootChatButton} from "./components/RootChatButton.jsx";
import {ChatDialogWindow} from "./components/ChatDialogWindow.jsx";
import {useChat} from "./hooks/useChat.jsx";
import {useCompany} from "./hooks/useCompany.jsx";
import {AvatarWithGreeting} from "./components/AvatarWithGreeting.jsx";


function App() {

  const {
    showChat,
  } = useChat();

  const {
    company
  } = useCompany();

  return (
    <div className='pointer-events-auto'>
      {company && (
        showChat ?
          <ChatDialogWindow /> :
          <AvatarWithGreeting />
      )}

    </div>
  );
}

export default App;
