import {useEffect, useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import { FaMicrophone, FaStop, FaPaperPlane, FaCog } from 'react-icons/fa';
import {SpeechTypeToggle} from "./SpeechTypeToggle.jsx";
import {TextInput} from "./TextInput.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {SpeechInput} from "./SpeechInput.jsx";

export const ChatWindow = () => {
  const input = useRef();
  const {
    chatMsgs,
    setChatMsgs,
    loading,
    avatarResponse,
    setAvatarResponse,
    lastAvatarResponseText,
    setLastAvatarResponseText,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
    mute,
  } = useChat();

  const [inputMode, setInputMode] = useState('text')

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const newMsg = {
        role: "user",
        content: text || "Hello",
      }
      const chat = [...chatMsgs, newMsg]
      const body = JSON.stringify({ chat, mute })
      // console.log(body)
      const data = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const newAvatarResponse = await data.json()
      // Example: avatarResponse = {
      //   text: "It appears that you have forgotten to add your API keys.",
      //   audio: await audioFileToBase64("audios/api_0.wav"),
      //   lipsync: await readJsonTranscript("audios/api_0.json"),
      //   facialExpression: "angry",
      //   animation: "Angry",
      // }

      // Update state
      setLoading(false);
      setAvatarResponse(newAvatarResponse)// ephemeral
      setLastAvatarResponseText(newAvatarResponse.text)// persists - so the text remains on the screen
      const newAvatarChatMsgObj = {
        role: "assistant",
        content: newAvatarResponse.text,
      }
      setChatMsgs([...chat, newAvatarChatMsgObj])
      input.current.value = "";

      if(!mute) {
        // Play the audio - this must be inline with the user-initiated event (button press) due to mobile device auto-playback permission issues
        const audio = new Audio("data:audio/mp3;base64," + newAvatarResponse.audio);
        audio.play();
        setAudio(audio);
        audio.onended = onMessagePlayed;
      } else {
        // If muted, then immediately clear the message
        onMessagePlayed()
      }
    }
  };

  useEffect(() => {
    if(avatarResponse && avatarResponse.text) {
      setLastAvatarResponseText(avatarResponse.text)
    }
  }, [avatarResponse]);

  return (
    <>
      <div className="flex-grow flex justify-evenly flex-col h-full">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <FaCog className="animate-spin" style={{ fontSize: '24px' }} />
          </div>
        )}
        <AvatarResponse extraClassNames={'hidden md:flex'} orientation='horizontal' />

        {
          inputMode==='text' ?
            <TextInput inputActive={!(loading || avatarResponse)} sendMessage={sendMessage} inputRef={input} /> :
            <SpeechInput inputActive={!(loading || avatarResponse)} sendMessage={sendMessage} inputRef={input} />
        }
        <SpeechTypeToggle inputMode={inputMode} setMode={setInputMode} />
      </div>
    </>
  );

};
