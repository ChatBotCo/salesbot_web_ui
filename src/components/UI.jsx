import {useEffect, useRef} from "react";
import { useChat } from "../hooks/useChat";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const {
    chat,
    loading,
    cameraZoomed,
    setCameraZoomed,
    message,
    setMessages,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
  } = useChat();

  // useEffect(() => {
  //   if (!message) {
  //     return;
  //   }
  //   const audio = new Audio("data:audio/mp3;base64," + message.audio);
  //   audio.play();
  //   setAudio(audio);
  //   audio.onended = onMessagePlayed;
  // }, [message]);

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !message) {
      // chat(text)
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
      const resp = (await data.json()).messages;
      setMessages([...resp]);
      setLoading(false);

      const newMsg = resp[0]
      const audio = new Audio("data:audio/mp3;base64," + newMsg.audio);
      audio.play();
      setAudio(audio);
      audio.onended = onMessagePlayed;

      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Welcome to Keli.AI</h1>
          <p>How can I help you today?</p>
        </div>

        <div className="w-full flex flex-col items-end justify-center gap-4">
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
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
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
