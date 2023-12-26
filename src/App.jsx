import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {ChatWindow} from "./components/ChatWindow.jsx";
import {AvatarResponse} from "./components/AvatarResponse.jsx";
import {AvatarPickerPage} from "./components/AvatarPickerPage.jsx";
import {useEffect, useState} from "react";
import {FaCog} from "react-icons/fa";
import {ConfigMenu} from "./components/ConfigMenu.jsx";
import {useChat} from "./hooks/useChat.jsx";
import {useAvatar} from "./hooks/useAvatar.jsx";
import {AvatarChatPage} from "./components/AvatarChatPage.jsx";

let initialized = false
function App() {

  // useEffect(() => {
  //   if(!initialized) {
  //     initialized = true
  //     if(!conversationId) {
  //       let _conversationId = localStorage.getItem('conversationId')
  //       if (_conversationId) {
  //         console.log(`Found _conversationId:${_conversationId}`)
  //         setConversationId(_conversationId)
  //         localStorage.setItem('conversationId', _conversationId)
  //       } else {
  //         // _conversationId = generateUUID()
  //         // console.log(`Creating a new _conversationId:${_conversationId}`)
  //         fetch(`${backendUrl}/api/create_conversation`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }).then(r1 => r1.json())
  //           .then(r2 => {
  //             _conversationId = r2.id
  //             setConversationId(_conversationId)
  //             localStorage.setItem('conversationId', _conversationId)
  //           })
  //       }
  //     }
  //     if(!selectedAvatarId) {
  //       setSelectedAvatarId(localStorage.getItem('selectedAvatarId'))
  //     }
  //   }
  // }, []);

  // if(conversationId) {
  //   console.log(`App setting conversationId:${conversationId}`)
  // }

  // const onSelectedAvatar = avatarId => {
  //   localStorage.setItem('selectedAvatarId', avatarId)
  //   setSelectedAvatarId(avatarId)
  // }

  return (
    <>
      <Loader />
      <AvatarPickerPage/>
      <AvatarChatPage />
    </>
  );
}

export default App;
