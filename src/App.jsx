import {RootChatButton} from "./components/RootChatButton.jsx";
import {ChatDialogWindow} from "./components/ChatDialogWindow.jsx";


function App() {

  return (
    <div className='pointer-events-auto'>
      <ChatDialogWindow />
      <RootChatButton/>
    </div>
  );
}

export default App;
