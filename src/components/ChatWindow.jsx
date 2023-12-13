import { useRef } from "react";
import { useChat } from "../hooks/useChat";

export const ChatWindow = ({ hidden }) => {
  const input = useRef();
  const {
    loading,
    message,
    setMessages,
    setAudio,
    onMessagePlayed,
    setLoading,
    backendUrl,
  } = useChat();

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
      <div className="flex justify-between p-2 flex-col backdrop-blur-md bg-white bg-opacity-50 rounded-lg max-h-10 scroll-auto">
        <div className=" md:text-xl">Hello I'm Keli!</div>
      </div>
    </>
  );
};
