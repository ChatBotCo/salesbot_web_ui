import {Loader} from "@react-three/drei";
import {AvatarPickerPage} from "./components/AvatarPickerPage.jsx";
import {AvatarChatPage} from "./components/AvatarChatPage.jsx";

let initialized = false
function App() {
  return (
    <>
      <Loader />
      <AvatarPickerPage/>
      <AvatarChatPage />
    </>
  );
}

export default App;
