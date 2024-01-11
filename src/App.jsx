import {RootChatButton} from "./components/RootChatButton.jsx";
import {ChatDialogWindow} from "./components/ChatDialogWindow.jsx";
import {useChat} from "./hooks/useChat.jsx";
import {useCompany} from "./hooks/useCompany.jsx";
import {AvatarWithGreeting} from "./components/AvatarWithGreeting.jsx";


function App() {
  const {
    viewModes, viewMode
  } = useChat()

  const {
    company
  } = useCompany();

  let element
  switch(viewMode) {
    case viewModes.collapsed:
      console.log('set collapsed')
      element = <RootChatButton/>
      break
    case viewModes.greeting:
      console.log('set greeting')
      element = <AvatarWithGreeting />
      break
    case viewModes.chat:
    default:
      console.log('set chat')
      element = <ChatDialogWindow />
      break
  }

  return (
    <div>
      {company && element}
    </div>
  );
}

export default App;
