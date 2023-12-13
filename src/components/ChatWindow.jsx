import {useEffect, useRef, useState} from "react";
import { useChat } from "../hooks/useChat";

export const ChatWindow = ({ hidden }) => {
  const input = useRef();
  const {
    loading,
    message,
    setMessage,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
  } = useChat();
  const [lastMessage, setLastMessage] = useState('Hello, I\'m Keli!')

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !message) {
      setLoading(true);
      const body = JSON.stringify({ message: text })
      // console.log(body)
      const data = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const message = await data.json()
      setMessage(message);
      setLoading(false);

      const audio = new Audio("data:audio/mp3;base64," + message.audio);
      audio.play();
      setAudio(audio);
      audio.onended = onMessagePlayed;

      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  useEffect(() => {
    if(message && message.text) {
      setLastMessage(message.text)
    }
  }, [message]);

  return (
    <>
      <div className="flex justify-between p-2 ml-3 flex-col bg-white rounded-lg">
        <div className=" md:text-xl">{lastMessage}</div>

        <input
          className="w-full placeholder:text-gray-500 placeholder:italic bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Type a message..."
          ref={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          disabled={loading || message}
          onClick={sendMessage}
          className={`bg-pink-500 hover:bg-pink-600 text-white font-semibold uppercase rounded-md ${
            loading || message ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          Send
        </button>
      </div>
    </>
  );
};
