import {useEffect, useRef, useState} from "react";
import { useChat } from "../hooks/useChat";
import { FaVolumeUp, FaVolumeMute, FaTimes, FaPaperPlane } from 'react-icons/fa';

export const ChatWindow = ({ showChatWindow, handleClickCloseChatWindow }) => {
  const input = useRef();
  const {
    chatMsgs,
    setChatMsgs,
    loading,
    avatarResponse,
    setAvatarResponse,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
  } = useChat();
  const [lastAvatarResponseText, setLastAvatarResponseText] = useState('Hello, I\'m Keli!')

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const newMsg = {
        role: "user",
        content: text || "Hello",
      }
      const chat = [...chatMsgs, newMsg]
      const body = JSON.stringify({ chat })
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

      // Play the audio - this must be inline with the user-initiated event (button press) due to mobile device auto-playback permission issues
      const audio = new Audio("data:audio/mp3;base64," + newAvatarResponse.audio);
      audio.play();
      setAudio(audio);
      audio.onended = onMessagePlayed;
    }
  };

  useEffect(() => {
    if(avatarResponse && avatarResponse.text) {
      setLastAvatarResponseText(avatarResponse.text)
    }
  }, [avatarResponse]);

  if(showChatWindow) {
    return (
      <>
        <div className="flex justify-between p-2 ml-3 flex-col bg-white rounded-lg">
          <div className="flex flex-row items-start">
            <div className="flex-grow md:text-xl overflow-y-auto max-h-56">{lastAvatarResponseText}</div>
            <div className="flex-shrink-0">
              <FaTimes onClick={handleClickCloseChatWindow} />
            </div>
          </div>

          <div className="flex flex-row items-end">

            <input
              className="flex-grow w-full placeholder:text-gray-500 placeholder:italic italic focus:outline-none"
              placeholder="Type a message..."
              ref={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              disabled={loading || avatarResponse}
              onClick={sendMessage}
              className={`flex-shrink-0 text-pink-500 ${
                loading || avatarResponse ? "cursor-not-allowed opacity-30" : ""
              }`}
            >
              <FaPaperPlane/>
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (<></>)
  }

};
