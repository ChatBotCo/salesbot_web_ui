import {useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import {  FaCog } from 'react-icons/fa';
import {SpeechTypeToggle} from "./SpeechTypeToggle.jsx";
import {TextInput} from "./TextInput.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {SpeechInput} from "./SpeechInput.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {ChatTopicHints} from "./ChatTopicHints.jsx";

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

  const onSelectTopic = topicPrompt => {
    input.current.value = topicPrompt
    return sendMessage()
  }

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const body = JSON.stringify({
        user_msg:  text || "Hello",
        mute,
        avatar: selectedAvatar,
      })
      const data = await fetch(`${backendUrl}/api/submit_user_message?convoid=${conversationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log(data)
      const newAvatarResponse = await data.json()

      // Update state
      setLoading(false);
      setAvatarResponse(newAvatarResponse)// ephemeral
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
        <ChatTopicHints onSelectTopic={onSelectTopic} />
      </div>
    </>
  );

};
