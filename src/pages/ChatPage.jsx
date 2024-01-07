import {useRef} from "react";
import {useChat} from "../hooks/useChat.jsx";
import {TextInput} from "../components/TextInput.jsx";

export const ChatPage = () => {
  const {
    backendUrl,
    loading,
    setLoading,
    company,
    conversation,
    avatarResponse,
    setAvatarResponse,
  } = useChat();

  const input = useRef();

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const body = JSON.stringify({
        user_msg:  text || "Hello",
      })
      const data = await fetch(`${backendUrl}/api/submit_user_message?convoid=${conversation.id}&companyid=${company.company_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }).finally(()=>setLoading(false))
      console.log(data)
      const newAvatarResponse = await data.json()

      // Update state
      setAvatarResponse(newAvatarResponse)
      input.current.value = "";
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-end items-center">
      <h1>Welcome to {company && company.name} Chat Page</h1>
      <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
    </div>
  );

};
