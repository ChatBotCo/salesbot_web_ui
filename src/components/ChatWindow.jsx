import {useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import {  FaCog } from 'react-icons/fa';
import {SpeechTypeToggle} from "./SpeechTypeToggle.jsx";
import {TextInput} from "./TextInput.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {SpeechInput} from "./SpeechInput.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";

export const ChatWindow = () => {
  const input = useRef();
  const {
    selectedAvatar,
  } = useAvatar()

  const {
    loading,
    avatarResponse,
    setAvatarResponse,
    setLastAvatarResponseText,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
    mute,
    conversationId,
  } = useChat();

  const [inputMode, setInputMode] = useState('text')

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const body = JSON.stringify({
        user_msg:  text || "Hello",
        mute,
        voice: selectedAvatar.voice,
      })
      // console.log(body)
      const data = await fetch(`${backendUrl}/api/submit_user_message?convoid=${conversationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log(data)
      const newAvatarResponse = await data.json()
      console.log(newAvatarResponse)
      // Example: avatarResponse = {
      // {
      //     "assistant_response": {
      //         "role": "assistant",
      //         "content": "{\"text\": \"Hello world!\", \"facialExpression\": \"smile\", \"animation\": \"Talking_0\"}"
      //     },
      //     "usage": {
      //         "completion_tokens": 24,
      //         "prompt_tokens": 241,
      //         "total_tokens": 265
      //     },
      //     "lipsync": {
      //         "mouthCues": [
      //             {
      //                 "start": 0,
      //                 "end": 0.05,
      //                 "target": "viseme_sil",
      //                 "value": 1
      //             },
      //             ...
      //         ]
      //     },
      //     "audio": "..."
      // }

      // Update state
      setLoading(false);
      setAvatarResponse(newAvatarResponse)// ephemeral
      console.log(`content:${newAvatarResponse.assistant_response.content}`)
      setLastAvatarResponseText(newAvatarResponse.assistant_response.content)// persists - so the text remains on the screen
      input.current.value = "";

      if(!mute) {
        // Play the audio - this must be inline with the user-initiated event (button press) due to mobile device auto-playback permission issues
        if(newAvatarResponse.audio.startsWith("AAAAAAAAAAAAAAAA")) {
          console.error(`Bad audio file data:${newAvatarResponse.audio}`)
          onMessagePlayed()
        } else {
          const audio = new Audio("data:audio/mp3;base64," + newAvatarResponse.audio);
          audio.play();
          setAudio(audio);
          audio.onended = onMessagePlayed;
        }
      } else {
        // If muted, then immediately clear the message
        onMessagePlayed()
      }
    }
  };

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
