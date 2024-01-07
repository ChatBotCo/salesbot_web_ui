import {useRef} from "react";
import {useChat} from "../hooks/useChat.jsx";
import {TextInput} from "../components/TextInput.jsx";
import {AvatarResponse} from "../components/AvatarResponse.jsx";

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
    if (!loading) {
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
      setAvatarResponse(newAvatarResponse.assistant_response.content)
      input.current.value = "";
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-center items-center pb-2">
      <h1>Welcome to <span className='font-extrabold text-xl'>{company && company.name}</span></h1>
      <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
      <AvatarResponse />
    </div>
  );

};
