import {useRef} from "react";
import {useChat} from "../hooks/useChat.jsx";
import {TextInput} from "./TextInput.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {InstallDemoApp} from "./InstallDemoApp.jsx";
import {ContactSales} from "./ContactSales.jsx";

export const ChatWindow = () => {
  const {
    backendUrl,
    loading,
    setLoading,
    company,
    conversation,
    setAvatarResponse,
    resetConvo,
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
      const newAvatarResponse = await data.json()
      console.log(newAvatarResponse)

      // Update state
      setAvatarResponse(newAvatarResponse)
      input.current.value = "";
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-start md:justify-center items-center pb-2 pt-5">
      <h1>Welcome to <span className='font-extrabold text-xl'>{company && company.name}</span></h1>
      <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
      <AvatarResponse />
      <InstallDemoApp />
      <ContactSales />
      <a
        className='text-blue-500 underline cursor-pointer'
        onClick={resetConvo}
      >Reset conversation</a>
    </div>
  );

};
